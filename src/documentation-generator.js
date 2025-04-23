const fs = require('fs');
const path = require('path');

// Store items by name and a map of ID to image URLs
const itemsByName = new Map();
const idToImageUrl = new Map();

// Helper to process GetMaterialItemsDescriptorsImages data
function processImageData(data) {
    try {
        const responseData = data.response.data;
        if (Array.isArray(responseData)) {
            responseData.forEach(item => {
                if (item.id && item.img_url) {
                    idToImageUrl.set(item.id, item.img_url);
                }
            });
        }
    } catch (error) {
        console.error('Error in processImageData:', error.message);
        console.error('Data:', JSON.stringify(data, null, 2));
    }
}

// Helper to process ItemDescriptor data
function processItemDescriptor(data) {
    try {
        const responseData = data.response.data;
        console.log('Processing ItemDescriptor response:', JSON.stringify(responseData, null, 2));

        // Process each item in the response
        if (responseData) {
            // Handle both array and single item responses
            const items = Array.isArray(responseData) ? responseData : [responseData];
            
            items.forEach(item => {
                if (item.name || item.Name) {  // Check both name formats
                    const name = item.name || item.Name;
                    console.log('Found item:', name);
                    
                    if (!itemsByName.has(name)) {
                        itemsByName.set(name, {
                            name: name,
                            itemDescriptor: {
                                id: item._id || item.id,
                                rarity: item.rarity || item.Rarity,
                                type: item.type || item.Type,
                                iconId: item.iconId || item.IconId
                            }
                        });
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error in processItemDescriptor:', error.message);
        console.error('Data:', JSON.stringify(data, null, 2));
    }
}

// Helper to process AnimOrInanimAssetData
function processAssetData(data) {
    try {
        const responseData = data.response.data;
        console.log('Processing AssetData response:', JSON.stringify(responseData, null, 2));

        // Only process if response has required fields
        if (responseData) {
            const name = responseData.name || responseData.Name;
            if (name) {
                console.log('Found asset:', name);
                
                const existingEntry = itemsByName.get(name) || { name: name };
                const imageUrl = responseData.image || responseData.Image;
                
                console.log(`Processing asset for ${name} with image URL:`, imageUrl);
                
                existingEntry.assetData = {
                    image: imageUrl,
                    type: responseData.type || responseData.Type,
                    id: responseData._id || responseData.id || responseData.Id
                };

                console.log(`Updated asset data for ${name}:`, existingEntry.assetData);
                itemsByName.set(name, existingEntry);
            }
        }
    } catch (error) {
        console.error('Error in processAssetData:', error.message);
        console.error('Data:', JSON.stringify(data, null, 2));
    }
}

// Process a single log entry
function processLogEntry(entry) {
    try {
        const parsedEntry = typeof entry === 'string' ? JSON.parse(entry) : entry;
        
        if (parsedEntry.endpoint) {
            // Log the endpoint we're processing
            console.log('Processing endpoint:', parsedEntry.endpoint);
            
            if (parsedEntry.endpoint.includes('GetItemDescriptors')) {
                processItemDescriptor(parsedEntry);
            } else if (parsedEntry.endpoint.includes('GetAnimOrInanimAssetData')) {
                processAssetData(parsedEntry);
            } else if (parsedEntry.endpoint.includes('GetMaterialItemsDescriptorsImages')) {
                processImageData(parsedEntry);
            }
        }
    } catch (error) {
        console.error('Error processing entry:', error.message);
        if (typeof entry === 'string') {
            console.error('Entry (first 200 chars):', entry.substring(0, 200));
        } else {
            console.error('Entry:', JSON.stringify(entry, null, 2));
        }
    }
}

// Generate markdown documentation
function generateMarkdown() {
    let markdown = '# Item Documentation\n\n';
    
    // Convert map to array and sort by name
    const sortedItems = Array.from(itemsByName.values())
        .sort((a, b) => a.name.localeCompare(b.name));

    sortedItems.forEach(item => {
        markdown += `## ${item.name}\n\n`;

        // Display asset image if available from either source
        let imageUrl = item.assetData?.image;
        if (!imageUrl && item.itemDescriptor?.id) {
            imageUrl = idToImageUrl.get(item.itemDescriptor.id);
        }
        
        if (imageUrl) {
            console.log(`Generating markdown for ${item.name} with image:`, imageUrl);
            markdown += `![${item.name}](${imageUrl})\n\n`;
        } else {
            console.log(`No image data available for ${item.name}`);
        }

        if (item.itemDescriptor) {
            markdown += '### Item Type\n';
            markdown += `**${item.itemDescriptor.type || 'Unknown'}**\n\n`;
            
            markdown += '### Item Descriptor\n';
            markdown += '```json\n';
            markdown += JSON.stringify(item.itemDescriptor, null, 2);
            markdown += '\n```\n\n';
        }

        if (item.assetData) {
            markdown += '### Asset Type\n';
            markdown += `**${item.assetData.type || 'Unknown'}**\n\n`;
            
            markdown += '### Asset Data\n';
            markdown += '```json\n';
            markdown += JSON.stringify(item.assetData, null, 2);
            markdown += '\n```\n\n';
        }

        markdown += '---\n\n';
    });

    return markdown;
}

async function processFile(filePath) {
    return new Promise((resolve, reject) => {
        let buffer = '';
        let isInObject = false;
        let bracketCount = 0;
        let count = 0;
        
        const processBuffer = () => {
            try {
                if (buffer.trim()) {
                    // Remove trailing comma if present
                    let cleanBuffer = buffer.trim();
                    if (cleanBuffer.endsWith(',')) {
                        cleanBuffer = cleanBuffer.slice(0, -1);
                    }
                    const entry = JSON.parse(cleanBuffer);
                    processLogEntry(entry);
                    count++;
                    if (count % 1000 === 0) {
                        console.log(`Processed ${count} entries...`);
                    }
                }
            } catch (error) {
                console.error('Error parsing entry:', error.message);
                // console.error('Problematic entry:', buffer); // Uncomment for debugging
            }
            buffer = '';
        };

        const stream = fs.createReadStream(filePath, { 
            encoding: 'utf8',
            highWaterMark: 1024 * 1024 // 1MB chunks
        });

        stream.on('data', chunk => {
            // Skip the opening/closing brackets of the array
            if (!isInObject && chunk.includes('[')) {
                chunk = chunk.slice(chunk.indexOf('[') + 1);
            }
            
            for (let i = 0; i < chunk.length; i++) {
                const char = chunk[i];
                
                if (char === '{') {
                    if (bracketCount === 0) {
                        isInObject = true;
                    }
                    bracketCount++;
                }
                
                if (isInObject) {
                    buffer += char;
                }
                
                if (char === '}') {
                    bracketCount--;
                    if (bracketCount === 0) {
                        isInObject = false;
                        processBuffer();
                    }
                }
            }
        });

        stream.on('end', () => {
            if (buffer.trim()) {
                processBuffer();
            }
            console.log(`Finished processing ${count} entries`);
            resolve();
        });

        stream.on('error', error => {
            console.error('Error reading file:', error);
            reject(error);
        });
    });
}

async function main() {
    try {
        console.log('Starting documentation generation...');
        
        // Process both log files
        const logsDir = path.join(__dirname, '..', 'logs_for_documentation');
        console.log('Processing part 1...');
        await processFile(path.join(logsDir, 'all_logs - pt1.json'));
        console.log('Processing part 2...');
        await processFile(path.join(logsDir, 'all_logs - pt2.json'));

        // Generate and save documentation
        console.log('Generating markdown...');
        const markdown = generateMarkdown();
        const outputPath = path.join(__dirname, '..', 'item_documentation.md');
        await fs.promises.writeFile(outputPath, markdown, 'utf8');

        console.log(`Documentation generated successfully at: ${outputPath}`);
    } catch (error) {
        console.error('Error generating documentation:', error);
        process.exit(1);
    }
}

main();
