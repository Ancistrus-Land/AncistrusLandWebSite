/**
 * External Email Service Adapter for Resend API
 * Encapsulates transactional email dispatch, error handling, and message logging.
 */
const https = require('https');
const { AppConfig } = require('../config');

class MailerAdapter {
    constructor() {
        const { apiKey, fromSender } = AppConfig.resend;
        this.apiKey = apiKey;
        this.defaultSender = fromSender;
    }

    /**
     * Dispatches transactional email via Resend REST API
     * @param {Object} options - { to, subject, html, text, from }
     */
    send({ to, subject, html, text = '', from = null }) {
        return new Promise((resolve) => {
            if (!this.apiKey) {
                console.error("[MAILER ERROR] Missing RESEND_API_KEY environment variable.");
                return resolve({ success: false, error: "Missing RESEND_API_KEY environment variable" });
            }

            const sender = from || this.defaultSender;
            const payload = JSON.stringify({
                from: sender,
                to: Array.isArray(to) ? to : [to],
                subject: subject,
                html: html,
                text: text || undefined
            });

            const options = {
                hostname: 'api.resend.com',
                port: 443,
                path: '/emails',
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
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
                        console.error(`[MAILER ERROR] Resend HTTP ${res.statusCode}: ${data}`);
                        resolve({ success: false, error: data });
                    }
                });
            });

            req.on('error', (err) => {
                console.error('[MAILER ERROR] Network dispatch error:', err.message);
                resolve({ success: false, error: err.message });
            });

            req.write(payload);
            req.end();
        });
    }
}

// Singleton mailer instance
const mailer = new MailerAdapter();

module.exports = { MailerAdapter, mailer };
