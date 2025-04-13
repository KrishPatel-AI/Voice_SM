// start.js
const { spawn } = require('child_process');
const path = require('path');

// Start the main server
const server = spawn('node', ['server.js']);

// Log output
server.stdout.on('data', (data) => {
  console.log(`[Server]: ${data}`);
});

server.stderr.on('data', (data) => {
  console.error(`[Server Error]: ${data}`);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});