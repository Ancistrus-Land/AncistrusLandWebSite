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

function sendEmailViaResend(to, subject, html) {
    return new Promise((resolve) => {
        const apiKey = process.env.RESEND_API_KEY;
        const sender = process.env.RESEND_FROM || "Ancistrus Land Admin <orders@ancistrusland.com>";

        if (!apiKey) {
            console.error("[RESEND OTP ERROR] Missing RESEND_API_KEY environment variable.");
            return resolve({ success: false, error: "Missing RESEND_API_KEY environment variable" });
        }

        const payload = JSON.stringify({
            from: sender,
            to: Array.isArray(to) ? to : [to],
            subject: subject,
            html: html
        });

        const options = {
            hostname: 'api.resend.com',
            port: 443,
            path: '/emails',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => { data += chunk; });
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        const parsed = JSON.parse(data);
                        resolve({ success: true, id: parsed.id });
                    } catch (e) {
                        resolve({ success: true });
                    }
                } else {
                    console.error(`[RESEND OTP ERROR] status ${res.statusCode}: ${data}`);
                    resolve({ success: false, error: data });
                }
            });
        });

        req.on('error', (err) => {
            console.error('[RESEND OTP ERROR] network failure:', err.message);
            resolve({ success: false, error: err.message });
        });

        req.write(payload);
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

        // --- 4. ADMIN OTP AUTHENTICATION (via verified Resend delivery) ---
        if (action === 'send-otp') {
            if (req.method === 'POST') {
                const targetEmail = "contact@ancistrusland.com";
                // Generate a secure 6-digit code
                const code = Math.floor(100000 + Math.random() * 900000).toString();
                const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

                // Save to store_settings table
                await supabaseRequest('/rest/v1/store_settings', 'POST', {
                    key: 'admin_otp',
                    value: { code, expiresAt, email: targetEmail },
                    updated_at: new Date().toISOString()
                }, {
                    'Prefer': 'resolution=merge-duplicates,return=representation'
                });

                const html = `
                    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
                        <h2 style="color: #0077b6; margin-top: 0;">Ancistrus Land Canada</h2>
                        <h4 style="color: #1e293b; margin-bottom: 8px;">Administrative Verification Code</h4>
                        <p style="color: #64748b; font-size: 14px; line-height: 1.5;">
                            A request was made to unlock the Store Admin Dashboard. Use the 6-digit code below to authenticate:
                        </p>
                        <div style="text-align: center; margin: 24px 0;">
                            <div style="display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #0077b6; background: #f0f9ff; padding: 12px 28px; border-radius: 10px; border: 1px dashed #0096c7;">
                                ${code}
                            </div>
                        </div>
                        <p style="color: #94a3b8; font-size: 12px; line-height: 1.4;">
                            This code is valid for 10 minutes. If you did not make this request, please disregard this email.
                        </p>
                        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
                        <small style="color: #94a3b8;">Ancistrus Land Canada &bull; Ottawa, Ontario &bull; contact@ancistrusland.com</small>
                    </div>
                `;

                const emailResult = await sendEmailViaResend(targetEmail, `${code} is your Ancistrus Land Admin Verification Code`, html);

                if (!emailResult.success) {
                    throw new Error("Unable to deliver verification email via Resend.");
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: "Code sent successfully" }));
                return;
            }
        }

        if (action === 'verify-otp') {
            if (req.method === 'POST') {
                const body = await parseBody(req);
                const inputCode = (body.code || '').trim();

                const data = await supabaseRequest('/rest/v1/store_settings?key=eq.admin_otp&select=*');
                if (!data || data.length === 0 || !data[0].value) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: "No pending verification code found. Please request a new one." }));
                    return;
                }

                const otpRecord = data[0].value;
                const now = new Date();
                const expiry = new Date(otpRecord.expiresAt);

                if (now > expiry) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: "Verification code has expired. Please request a new one." }));
                    return;
                }

                if (otpRecord.code !== inputCode) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: "Invalid verification code. Please check your inbox and try again." }));
                    return;
                }

                // Invalidate code after successful use
                await supabaseRequest('/rest/v1/store_settings?key=eq.admin_otp', 'DELETE');

                // Return authenticated token
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, token: "ancistrus_admin_auth_verified" }));
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
