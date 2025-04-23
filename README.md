# API Request Logger

A focused tool that captures and logs all network requests to `api.prod.runiverseservers.com`. Logs are saved to JSON files organized by date.

## Features

- Captures all requests to the specified API domain
- Stores complete request and response data
- Organizes logs by date
- Saves to N: drive for permanent storage

## Prerequisites

- Node.js (v14 or higher)
- Chrome browser
- Access to N: drive

## Installation

1. Install dependencies:
```bash
npm install
```

## Usage

1. Launch Chrome with remote debugging enabled:

```powershell
Start-Process "C:\Program Files\Google\Chrome\Application\chrome.exe" -ArgumentList "--remote-debugging-port=9222 --user-data-dir=C:\temp\chrome-debug --no-first-run"
```

2. Start the logger:

```bash
npm start
```

3. Play your game as normal. The tool will automatically:
   - Monitor all network traffic to api.prod.runiverseservers.com
   - Save request/response data to N:/game-logs/
   - Create a new log file for each day

## Log Format

Each log entry contains:
```json
{
  "timestamp": "2025-04-22T21:51:55.123Z",
  "url": "https://api.prod.runiverseservers.com/...",
  "method": "GET/POST/etc",
  "requestHeaders": {},
  "status": 200,
  "responseHeaders": {},
  "responseBody": {}
}
```

## Log Location

Logs are saved to `N:/game-logs/` with filenames in the format `YYYY-MM-DD.json`

## Stopping the Logger

Press Ctrl+C in the terminal to stop the logger. It will cleanly close the connection to Chrome before exiting.
