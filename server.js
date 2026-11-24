const http = require('http');
const fs = require('fs');
const path = require('path');

// Zero-dependency local .env / .env.local loader
function loadLocalEnv() {
    ['.env', '.env.local'].forEach(fileName => {
        const envPath = path.join(__dirname, fileName);
        if (fs.existsSync(envPath)) {
            try {
                const lines = fs.readFileSync(envPath, 'utf8').split('\n');
                lines.forEach(line => {
                    const trimmed = line.trim();
                    if (!trimmed || trimmed.startsWith('#')) return;
                    const eqIndex = trimmed.indexOf('=');
                    if (eqIndex > 0) {
                        const key = trimmed.slice(0, eqIndex).trim();
                        let val = trimmed.slice(eqIndex + 1).trim();
                        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                            val = val.slice(1, -1);
                        }
                        if (!process.env[key]) {
                            process.env[key] = val;
                        }
                    }
                });
            } catch (e) {
                console.warn(`Could not read ${fileName}:`, e.message);
            }
        }
    });
}
loadLocalEnv();

const orderApi = require('./api/order');
const storeApi = require('./api/store');

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

    // 1. API Routes: /api/order, /api/store
    if (reqUrl === '/api/order') {
        return orderApi(req, res);
    }
    if (reqUrl === '/api/store') {
        return storeApi(req, res);
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
