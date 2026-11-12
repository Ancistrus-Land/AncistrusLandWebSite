const http = require('http');
const fs = require('fs');
const path = require('path');
const orderApi = require('./api/order');

const PORT = process.env.PORT || 3000;
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0];

    // 1. API Route: /api/order
    if (reqUrl === '/api/order') {
        return orderApi(req, res);
    }

    // 2. Static Files Serving
    if (reqUrl === '/') reqUrl = '/index.html';

    const filePath = path.join(__dirname, decodeURIComponent(reqUrl));

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            const ext = path.extname(filePath).toLowerCase();
            const mime = MIME_TYPES[ext] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': mime });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Automated Order API active at http://localhost:${PORT}/api/order`);
});
