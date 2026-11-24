/**
 * Ancistrus Land Canada - Cloud Store Management API
 * Provides secure endpoints to:
 * 1. Fetch & update public store settings (contacts, address, phone)
 * 2. Fetch & update live catalog products and stock status
 * 3. Fetch past customer orders for the Admin dashboard
 * Works seamlessly in both local server.js and Vercel serverless.
 */
const https = require('https');
const url = require('url');

function getSupabaseConfig() {
    const supabaseUrl = process.env.SUPABASE_URL || "https://brcerimskfuogsadzewy.supabase.co";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    return { supabaseUrl, supabaseKey };
}

function supabaseRequest(path, method = 'GET', body = null, extraHeaders = {}) {
    return new Promise((resolve, reject) => {
        const { supabaseUrl, supabaseKey } = getSupabaseConfig();
        if (!supabaseUrl || !supabaseKey) {
            return reject(new Error("Supabase credentials not configured"));
        }

        const parsedUrl = new url.URL(supabaseUrl);
        const headers = {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            ...extraHeaders
        };

        let payload = null;
        if (body) {
            payload = JSON.stringify(body);
            headers['Content-Length'] = Buffer.byteLength(payload);
        }

        const options = {
            hostname: parsedUrl.hostname,
            port: 443,
            path: path,
            method: method,
            headers: headers
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(data ? JSON.parse(data) : null);
                    } catch (e) {
                        resolve(data);
                    }
                } else {
                    reject(new Error(`Supabase error ${res.statusCode}: ${data}`));
                }
            });
        });

        req.on('error', (err) => reject(err));
        if (payload) req.write(payload);
        req.end();
    });
}

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-pin');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const action = parsedUrl.query.action; // 'settings', 'products', 'orders'

    try {
        // --- 1. STORE SETTINGS (Contacts, Address, Phone, Email) ---
        if (action === 'settings') {
            if (req.method === 'GET') {
                try {
                    const data = await supabaseRequest('/rest/v1/store_settings?key=eq.contacts&select=*');
                    const contacts = (data && data.length > 0) ? data[0].value : null;
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, contacts }));
                } catch (err) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, fallback: true, error: err.message }));
                }
                return;
            }

            if (req.method === 'POST') {
                const body = await parseBody(req);
                const payload = {
                    key: 'contacts',
                    value: body.contacts,
                    updated_at: new Date().toISOString()
                };
                // Upsert to store_settings
                await supabaseRequest('/rest/v1/store_settings', 'POST', payload, {
                    'Prefer': 'resolution=merge-duplicates,return=representation'
                });
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: "Settings saved to cloud" }));
                return;
            }
        }

        // --- 2. PRODUCTS CATALOG ---
        if (action === 'products') {
            if (req.method === 'GET') {
                try {
                    const products = await supabaseRequest('/rest/v1/products?select=*&order=created_at.desc');
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, products: products || [] }));
                } catch (err) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, fallback: true, error: err.message }));
                }
                return;
            }

            if (req.method === 'POST') {
                const body = await parseBody(req);
                if (Array.isArray(body.products)) {
                    // Bulk upsert
                    await supabaseRequest('/rest/v1/products', 'POST', body.products, {
                        'Prefer': 'resolution=merge-duplicates,return=representation'
                    });
                } else if (body.product) {
                    // Single product upsert
                    await supabaseRequest('/rest/v1/products', 'POST', body.product, {
                        'Prefer': 'resolution=merge-duplicates,return=representation'
                    });
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
                return;
            }

            if (req.method === 'DELETE') {
                const id = parsedUrl.query.id;
                if (!id) throw new Error("Product ID required for deletion");
                await supabaseRequest(`/rest/v1/products?id=eq.${encodeURIComponent(id)}`, 'DELETE');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, deleted: id }));
                return;
            }
        }

        // --- 3. CUSTOMER ORDERS (Admin View) ---
        if (action === 'orders') {
            if (req.method === 'GET') {
                try {
                    const orders = await supabaseRequest('/rest/v1/orders?select=*&order=created_at.desc');
                    // Format rows for Admin table compatibility
                    const formatted = (orders || []).map(o => ({
                        orderId: o.id,
                        date: new Date(o.created_at).toLocaleString("en-CA"),
                        customer: {
                            name: o.customer_name,
                            phone: o.customer_phone,
                            email: o.customer_email,
                            address: o.shipping_address,
                            city: o.city,
                            province: o.province,
                            postalCode: o.postal_code,
                            notes: o.delivery_notes,
                            paymentMethod: o.payment_method
                        },
                        items: o.items || [],
                        subtotal: Number(o.subtotal) || 0,
                        tax: o.tax_details || null,
                        total: Number(o.total) || 0,
                        status: o.status
                    }));
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, orders: formatted }));
                } catch (err) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, fallback: true, error: err.message }));
                }
                return;
            }
        }

        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Invalid action or method" }));
    } catch (err) {
        console.error("Store API Error:", err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
    }
};

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
