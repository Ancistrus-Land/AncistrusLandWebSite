/**
 * Ancistrus Land Canada - Order Processing & Automated Email Service
 * Works natively in both standard Node.js server (server.js) and Vercel/Cloudflare Serverless Functions
 * Uses Node built-in https (zero external dependencies required)
 */
const https = require('https');

// Default Store Configuration
const STORE_CONFIG = {
    name: "Ancistrus Land Canada",
    email: process.env.STORE_EMAIL || "sudarsha.wijenayake@gmail.com",
    phone: "+1 (613) 266-5285",
    whatsapp: "+1 (613) 266-5285",
    location: "Ottawa, Ontario, Canada",
    website: process.env.SITE_URL || "https://ancistrusland.ca"
};

/**
 * Dispatch email via Resend API (Free Tier: 3,000 emails/mo)
 * Falls back gracefully to console log if RESEND_API_KEY is not yet configured.
 */
function sendEmailViaResend({ to, subject, html, from }) {
    return new Promise((resolve) => {
        const apiKey = process.env.RESEND_API_KEY;
        const sender = from || process.env.RESEND_FROM || "Ancistrus Land Orders <onboarding@resend.dev>";

        if (!apiKey) {
            console.log(`\n======================================================`);
            console.log(`[EMAIL DISPATCH - DEV SIMULATION (No RESEND_API_KEY set)]`);
            console.log(`To: ${to}`);
            console.log(`Subject: ${subject}`);
            console.log(`From: ${sender}`);
            console.log(`======================================================\n`);
            return resolve({ success: true, simulated: true });
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
                        console.log(`[EMAIL SUCCESS] Sent to ${to}. Message ID: ${parsed.id}`);
                        resolve({ success: true, id: parsed.id });
                    } catch (e) {
                        resolve({ success: true });
                    }
                } else {
                    console.error(`[EMAIL ERROR] Resend status ${res.statusCode}: ${data}`);
                    resolve({ success: false, error: data });
                }
            });
        });

        req.on('error', (err) => {
            console.error('[EMAIL ERROR] Request failure:', err.message);
            resolve({ success: false, error: err.message });
        });

        req.write(payload);
        req.end();
    });
}

/**
 * Generate Customer Invoice HTML Email
 */
function buildCustomerEmailHtml(order) {
    const c = order.customer;
    const itemsRows = order.items.map(item => `
        <tr>
            <td style="padding: 12px 14px; border-bottom: 1px solid #e5e7eb;">
                <strong style="color: #0f1c2e; font-size: 14px;">${item.name}</strong><br>
                <span style="font-size: 12px; color: #64748b;">$${Number(item.price).toFixed(2)} CAD each</span>
            </td>
            <td style="padding: 12px 14px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #334155;">
                x${item.quantity}
            </td>
            <td style="padding: 12px 14px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 700; color: #0077b6;">
                $${(item.price * item.quantity).toFixed(2)} CAD
            </td>
        </tr>
    `).join("");

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Order Confirmation #${order.orderId}</title>
    </head>
    <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #0f1c2e;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
            <!-- Brand Banner Header -->
            <tr>
                <td style="background: linear-gradient(135deg, #023e8a 0%, #0077b6 50%, #00b4d8 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
                    <h1 style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">ANCISTRUS LAND CANADA</h1>
                    <p style="margin: 6px 0 0; font-size: 13px; color: #e0f2fe; text-transform: uppercase; letter-spacing: 1px;">Freshwater Wonders &bull; Canada-Wide Aquatic Specialist</p>
                </td>
            </tr>

            <!-- Thank You Badge & Order ID -->
            <tr>
                <td style="padding: 28px 24px 16px; text-align: center;">
                    <div style="display: inline-block; background-color: #ecfdf5; border: 1px solid #a7f3d0; color: #059669; padding: 6px 16px; border-radius: 20px; font-weight: 700; font-size: 13px; margin-bottom: 12px;">
                        ✓ Order Received & Confirmed
                    </div>
                    <h2 style="margin: 0 0 6px; font-size: 22px; color: #0f1c2e;">Thank You, ${c.name}!</h2>
                    <p style="margin: 0; color: #64748b; font-size: 14px;">We're preparing your aquatic livestock for express courier transit.</p>
                    <p style="margin: 8px 0 0; font-size: 13px; color: #0077b6; font-weight: 700;">Order ID: ${order.orderId} &bull; ${order.date}</p>
                </td>
            </tr>

            <!-- Shipping & Payment Cards -->
            <tr>
                <td style="padding: 12px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td width="48%" valign="top" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;">
                                <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #0077b6; letter-spacing: 0.5px; margin-bottom: 6px;">
                                    Shipping Address
                                </div>
                                <div style="font-size: 13.5px; font-weight: 700; color: #0f1c2e;">${c.name}</div>
                                <div style="font-size: 13px; color: #475569; margin-top: 2px;">${c.phone}</div>
                                <div style="font-size: 13px; color: #475569;">${c.email}</div>
                                <div style="font-size: 13px; color: #475569; margin-top: 4px;">
                                    ${c.address}<br>${c.city}, ${c.province} (${c.postalCode})
                                </div>
                            </td>
                            <td width="4%"></td>
                            <td width="48%" valign="top" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;">
                                <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #0077b6; letter-spacing: 0.5px; margin-bottom: 6px;">
                                    Payment Method
                                </div>
                                <div style="font-size: 13.5px; font-weight: 700; color: #0f1c2e;">${c.paymentMethod}</div>
                                <div style="font-size: 12.5px; color: #64748b; margin-top: 6px;">
                                    Status: <span style="background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 6px; font-weight: 700;">Processing Dispatch</span>
                                </div>
                                ${c.notes ? `<div style="font-size: 12px; color: #475569; margin-top: 8px;"><strong>Delivery Notes:</strong> ${c.notes}</div>` : ''}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <!-- Interac Payment Instructions Callout -->
            ${c.paymentMethod && c.paymentMethod.includes('Interac') ? `
            <tr>
                <td style="padding: 12px 24px;">
                    <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 14px 16px; font-size: 13.5px; color: #1e40af;">
                        <strong style="color: #1d4ed8;">⚡ Interac e-Transfer Instructions:</strong><br>
                        Please send <strong>$${Number(order.total).toFixed(2)} CAD</strong> from your Canadian banking app to <strong>${STORE_CONFIG.email}</strong>.<br>
                        <span style="font-size: 12.5px; color: #3b82f6;">Please include Order ID <strong>${order.orderId}</strong> in the transfer message/memo.</span>
                    </div>
                </td>
            </tr>
            ` : ''}

            <!-- Items Table -->
            <tr>
                <td style="padding: 12px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin-top: 8px;">
                        <thead>
                            <tr style="background-color: #f1f5f9;">
                                <th align="left" style="padding: 10px 14px; font-size: 11px; text-transform: uppercase; color: #475569; letter-spacing: 0.5px; border-bottom: 2px solid #cbd5e1;">Item Description</th>
                                <th align="center" style="padding: 10px 14px; font-size: 11px; text-transform: uppercase; color: #475569; letter-spacing: 0.5px; border-bottom: 2px solid #cbd5e1;">Qty</th>
                                <th align="right" style="padding: 10px 14px; font-size: 11px; text-transform: uppercase; color: #475569; letter-spacing: 0.5px; border-bottom: 2px solid #cbd5e1;">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsRows}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" align="right" style="padding: 10px 14px; font-size: 13px; color: #475569; border-bottom: 1px solid #e2e8f0;">
                                    Insulated Packaging & Winter Heat Pack:
                                </td>
                                <td align="right" style="padding: 10px 14px; font-size: 13px; font-weight: 700; color: #16a34a; border-bottom: 1px solid #e2e8f0;">
                                    FREE (Included)
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" align="right" style="padding: 14px; font-size: 16px; font-weight: 800; color: #0f1c2e;">
                                    Grand Total:
                                </td>
                                <td align="right" style="padding: 14px; font-size: 18px; font-weight: 800; color: #0077b6;">
                                    $${Number(order.total).toFixed(2)} CAD
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </td>
            </tr>

            <!-- Guarantee Callout -->
            <tr>
                <td style="padding: 8px 24px 20px;">
                    <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 12px 14px; font-size: 12.5px; color: #166534; text-align: center;">
                        🛡️ <strong>100% Live Arrival Guarantee (LAG):</strong> Packed in molded thermo-insulated boxes with pure medical oxygen for safe Canadian arrival.
                    </div>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="background-color: #0f1c2e; padding: 22px; text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.6;">
                    <strong style="color: #ffffff;">Ancistrus Land Canada</strong> &bull; ${STORE_CONFIG.location}<br>
                    Need assistance or have acclimation questions? Email <a href="mailto:${STORE_CONFIG.email}" style="color: #00b4d8; text-decoration: none;">${STORE_CONFIG.email}</a> or WhatsApp <a href="https://wa.me/${STORE_CONFIG.whatsapp.replace(/[^0-9]/g, '')}" style="color: #00b4d8; text-decoration: none;">${STORE_CONFIG.phone}</a>.
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}

/**
 * Generate Store Owner Notification Email
 */
function buildStoreAlertEmailHtml(order) {
    const c = order.customer;
    const itemsSummary = order.items.map(i => `• ${i.name} (x${i.quantity}) - $${(i.price * i.quantity).toFixed(2)} CAD`).join("<br>");

    return `
    <h2>⚡ New Order Received #${order.orderId}</h2>
    <p><strong>Customer:</strong> ${c.name} (<a href="mailto:${c.email}">${c.email}</a>, <a href="tel:${c.phone}">${c.phone}</a>)</p>
    <p><strong>Shipping To:</strong> ${c.address}, ${c.city}, ${c.province} (${c.postalCode})</p>
    <p><strong>Payment Method:</strong> ${c.paymentMethod}</p>
    <p><strong>Total Value:</strong> $${Number(order.total).toFixed(2)} CAD</p>
    ${c.notes ? `<p><strong>Notes:</strong> ${c.notes}</p>` : ''}
    <hr>
    <h3>Items to Pack:</h3>
    <p style="font-size: 14px; line-height: 1.6;">${itemsSummary}</p>
    <hr>
    <p><small>View and manage all orders in your <a href="${STORE_CONFIG.website}/admin.html">Store Admin Dashboard</a>.</small></p>
    `;
}

/**
 * Core Order Intake Handler
 */
async function processOrder(orderData) {
    if (!orderData || !orderData.orderId || !orderData.customer) {
        throw new Error("Invalid order payload");
    }

    const customerEmail = orderData.customer.email;
    const orderId = orderData.orderId;

    // 1. Send confirmation email to Customer
    const customerHtml = buildCustomerEmailHtml(orderData);
    const customerEmailPromise = sendEmailViaResend({
        to: customerEmail,
        subject: `Order Confirmation #${orderId} - Ancistrus Land Canada`,
        html: customerHtml
    });

    // 2. Send instant alert email to Store Owner
    const storeHtml = buildStoreAlertEmailHtml(orderData);
    const storeEmailPromise = sendEmailViaResend({
        to: STORE_CONFIG.email,
        subject: `⚡ New Order #${orderId} from ${orderData.customer.name} ($${Number(orderData.total).toFixed(2)} CAD)`,
        html: storeHtml
    });

    const [customerRes, storeRes] = await Promise.all([customerEmailPromise, storeEmailPromise]);

    return {
        success: true,
        orderId: orderId,
        customerNotified: customerRes.success,
        storeNotified: storeRes.success,
        simulated: customerRes.simulated || false
    };
}

/**
 * Export for Vercel / Cloudflare Serverless Function (req, res)
 */
module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
        return;
    }

    try {
        let body = req.body;
        // In case body isn't parsed yet by runtime
        if (typeof body === 'string') {
            body = JSON.parse(body);
        } else if (!body) {
            body = await new Promise((resolve, reject) => {
                let data = '';
                req.on('data', chunk => { data += chunk; });
                req.on('end', () => {
                    try { resolve(JSON.parse(data || '{}')); } catch (e) { reject(e); }
                });
            });
        }

        const result = await processOrder(body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
    } catch (err) {
        console.error("Order processing error:", err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
    }
};

// Export raw processOrder for local server.js
module.exports.processOrder = processOrder;
