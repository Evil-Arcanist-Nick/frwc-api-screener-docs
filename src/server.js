const CDP = require('chrome-remote-interface');
const fs = require('fs').promises;
const path = require('path');
const config = require('./config/default');

let client = null;
const requestBodies = new Map();

function parseQueryParams(url) {
    try {
        const parsedUrl = new URL(url);
        const params = {};
        parsedUrl.searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    } catch (err) {
        return {};
    }
}

async function saveLog(log) {
    try {
        const date = new Date();
        const fileName = `${date.toISOString().split('T')[0]}.json`;
        const filePath = path.join(config.storage.path, fileName);
        
        // Ensure directory exists
        await fs.mkdir(config.storage.path, { recursive: true });
        
        // Read existing logs or create new array
        let logs = [];
        try {
            const content = await fs.readFile(filePath, 'utf8');
            logs = JSON.parse(content);
        } catch (err) {
            // File doesn't exist yet, that's fine
        }
        
        // Parse query parameters from URL
        const queryParams = parseQueryParams(log.url);
        
        // Parse request body
        let requestPayload = {};
        if (log.requestBody) {
            try {
                requestPayload = typeof log.requestBody === 'string' && log.requestBody.trim() !== '' ? 
                    JSON.parse(log.requestBody) : log.requestBody;
            } catch (err) {
                // If not JSON, store as-is
                requestPayload = log.requestBody;
            }
        }

        // Parse response body, ensuring it's proper JSON
        let responseData;
        try {
            if (typeof log.responseBody === 'string' && log.responseBody.trim() !== '') {
                responseData = JSON.parse(log.responseBody);
            } else if (typeof log.responseBody === 'object') {
                responseData = log.responseBody;
            } else {
                responseData = {};
            }
        } catch (err) {
            console.error('Error parsing response body:', err);
            responseData = { error: 'Failed to parse response body' };
        }

        // Create log entry in exact format requested
        const logEntry = {
            timestamp: date.toISOString(),
            endpoint: log.url,
            request: {
                method: log.method,
                payload: requestPayload,
                queryParams: queryParams
            },
            response: {
                data: responseData
            }
        };

        // Ensure the log directory exists
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        
        logs.push(logEntry);
        
        // Save updated logs with proper formatting
        await fs.writeFile(filePath, JSON.stringify(logs, null, 2));
        console.log(`Logged ${log.method} request to ${log.url}`);
    } catch (err) {
        console.error('Error saving log:', err);
    }
}

async function setupCDP() {
    try {
        console.log('Connecting to Chrome...');
        
        // Get list of targets
        const targets = await CDP.List({
            host: 'localhost',
            port: config.chrome.port
        });
        console.log('Available targets:', targets);
        
        // Just connect to Chrome and let it handle target selection
        console.log('Connecting to Chrome DevTools...');
        client = await CDP({
            port: config.chrome.port
        });
        console.log('Connected successfully');
        
        const { Network, Page } = client;

        // Enable network tracking with more detailed options
        await Network.enable({
            maxPostDataSize: 65536 * 10, // Increase post data size limit
            maxResourceBufferSize: 65536 * 10,
            maxTotalBufferSize: 65536 * 50
        });
        await Page.enable();

        console.log('Setting up network event handlers...');
        
        // Track all requests first
        Network.requestWillBeSent((params) => {
            const { request, requestId } = params;
            console.log(`[DEBUG] Intercepted ${request.method} request to: ${request.url}`);
            
            if (request.url.includes(config.targetDomain)) {
                console.log('\n=== REQUEST DETAILS ===');
                console.log('URL:', request.url);
                console.log('Method:', request.method);
                console.log('Request ID:', requestId);
                if (request.postData) {
                    console.log('Request payload:', request.postData);
                }
                
                // Store request data
                requestBodies.set(requestId, {
                    postData: request.postData,
                    method: request.method,
                    url: request.url
                });
                console.log('Request data stored for later processing');
                console.log('=====================\n');
            }
        });

        // Handle failed requests
        Network.loadingFailed((params) => {
            const { requestId, errorText, canceled } = params;
            console.log(`[DEBUG] Request failed for ID: ${requestId}`);
            
            const requestData = requestBodies.get(requestId);
            if (requestData && requestData.url.includes(config.targetDomain)) {
                console.log('\n=== FAILED REQUEST ===');
                console.log('URL:', requestData.url);
                console.log('Method:', requestData.method);
                console.log('Error:', errorText);
                console.log('Canceled:', canceled);
                
                // Save failed request
                saveLog({
                    url: requestData.url,
                    method: requestData.method,
                    requestBody: requestData.postData,
                    responseBody: { error: errorText, canceled }
                }).catch(err => console.error('Failed to save error log:', err));
                
                console.log('=====================\n');
            }
            requestBodies.delete(requestId);
        });

        // Track responses with more detailed logging
        Network.responseReceived(async (params) => {
            const { response, requestId } = params;
            console.log(`[DEBUG] Response received for: ${response.url}`);
            
            if (response.url.includes(config.targetDomain)) {
                console.log('\n=== RESPONSE DETAILS ===');
                console.log('URL:', response.url);
                console.log('Status:', response.status);
                console.log('Request ID:', requestId);
                
                try {
                    // Get response body with error handling
                    let responseBody;
                    try {
                        const { body, base64Encoded } = await Network.getResponseBody({ requestId });
                        responseBody = base64Encoded ? Buffer.from(body, 'base64').toString() : body;
                        console.log('Response body retrieved successfully');
                    } catch (bodyError) {
                        console.error('Failed to get response body:', bodyError.message);
                        responseBody = null;
                    }
                    
                    // Get stored request data
                    const requestData = requestBodies.get(requestId);
                    if (requestData) {
                        console.log('Found matching request data');
                    } else {
                        console.log('No matching request data found');
                    }
                    requestBodies.delete(requestId);
                    
                    if (responseBody !== null) {
                        console.log('Saving complete request/response data...');
                        await saveLog({
                            url: requestData?.url || response.url,
                            method: requestData?.method || response.requestMethod,
                            requestBody: requestData?.postData,
                            responseBody: responseBody
                        });
                        console.log('Data saved successfully');
                    }
                    console.log('=====================\n');
                } catch (err) {
                    console.error('Error processing response:', err);
                }
            }
        });

        console.log('Network tracking enabled');
        console.log(`Monitoring requests to ${config.targetDomain}`);
        console.log(`Logs will be saved to ${config.storage.path}`);
    } catch (err) {
        console.error('Failed to connect to Chrome:', err);
        process.exit(1);
    }
}

// Handle shutdown
process.on('SIGINT', async () => {
    if (client) {
        await client.close();
        console.log('Chrome connection closed');
    }
    process.exit();
});

// Start the monitoring
setupCDP().catch(err => {
    console.error('Setup failed:', err);
    process.exit(1);
});
