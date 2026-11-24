/**
 * Ancistrus Land Canada - Cloud Store Management API Router
 * Delegates all operations to decoupled service layers.
 * Zero duplicated low-level HTTPS calls, zero hardcoded emails or secrets.
 */
const url = require('url');
const { SettingsService } = require('./services/settingsService');
const { CatalogService } = require('./services/catalogService');
const { OrderService } = require('./services/orderService');
const { AuthService } = require('./services/authService');

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const action = parsedUrl.query.action; // 'settings', 'products', 'orders', 'send-otp', 'verify-otp'

    try {
        // --- 1. STORE SETTINGS (Contacts, Location, Phone, Email) ---
        if (action === 'settings') {
            if (req.method === 'GET') {
                const contacts = await SettingsService.getContacts();
                return sendJson(res, 200, { success: true, contacts });
            }

            if (req.method === 'POST') {
                const body = await parseBody(req);
                await SettingsService.updateContacts(body.contacts);
                return sendJson(res, 200, { success: true, message: "Settings saved to database." });
            }
        }

        // --- 2. PRODUCTS CATALOG ---
        if (action === 'products') {
            if (req.method === 'GET') {
                const products = await CatalogService.getAll();
                return sendJson(res, 200, { success: true, products });
            }

            if (req.method === 'POST') {
                const body = await parseBody(req);
                await CatalogService.save(body.products || body.product);
                return sendJson(res, 200, { success: true, message: "Catalog updated." });
            }

            if (req.method === 'DELETE') {
                const id = parsedUrl.query.id;
                if (!id) throw new Error("Product ID required for deletion");
                await CatalogService.delete(id);
                return sendJson(res, 200, { success: true, deleted: id });
            }
        }

        // --- 3. CUSTOMER ORDERS (Admin View) ---
        if (action === 'orders') {
            if (req.method === 'GET') {
                const orders = await OrderService.getAllOrders();
                return sendJson(res, 200, { success: true, orders });
            }

            if (req.method === 'POST') {
                const body = await parseBody(req);
                const result = await OrderService.processOrder(body);
                return sendJson(res, 200, result);
            }
        }

        // --- 4. ADMIN OTP AUTHENTICATION ---
        if (action === 'send-otp') {
            if (req.method === 'POST') {
                const result = await AuthService.sendAdminOtp();
                return sendJson(res, 200, result);
            }
        }

        if (action === 'verify-otp') {
            if (req.method === 'POST') {
                const body = await parseBody(req);
                const result = await AuthService.verifyAdminOtp(body.code);
                return sendJson(res, 200, result);
            }
        }

        return sendJson(res, 400, { success: false, error: "Invalid action or HTTP method" });
    } catch (err) {
        console.error("[API CONTROLLER ERROR]:", err);
        return sendJson(res, 500, { success: false, error: err.message });
    }
};

function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

function parseBody(req) {
    return new Promise((resolve, reject) => {
        if (req.body) {
            return resolve(typeof req.body === 'string' ? JSON.parse(req.body) : req.body);
        }
        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', () => {
            try {
                resolve(JSON.parse(data || '{}'));
            } catch (e) {
                reject(e);
            }
        });
    });
}
