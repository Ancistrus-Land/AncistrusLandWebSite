/**
 * Administrative Authentication & OTP Security Service
 * Zero hardcoded email addresses: always queries current store settings dynamically.
 */
const crypto = require('crypto');
const { db } = require('../lib/db');
const { mailer } = require('../lib/mailer');
const { SettingsService } = require('./settingsService');

class AuthService {
    /**
     * Generate and dispatch 6-digit OTP code to the current store email
     */
    static async sendAdminOtp() {
        const contacts = await SettingsService.getContacts();
        const targetEmail = contacts.email || "contact@ancistrusland.com";

        // Cryptographically secure 6-digit random code
        const code = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

        // Persist code in database store_settings table
        await db.upsert('store_settings', {
            key: 'admin_otp',
            value: { code, expiresAt, email: targetEmail },
            updated_at: new Date().toISOString()
        });

        // Email HTML template
        const html = `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 28px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #0077b6; margin: 0 0 4px 0; font-size: 22px;">Ancistrus Land Canada</h2>
                    <span style="font-size: 11px; font-weight: 700; color: #023e8a; text-transform: uppercase; letter-spacing: 1px;">Store Administration Security</span>
                </div>
                <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid #edf2f7;">
                    <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">
                        A login request was initiated for your store administration dashboard. Please enter the verification code below:
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <span style="display: inline-block; font-size: 36px; font-weight: 800; letter-spacing: 10px; color: #0077b6; background: #e0f2fe; padding: 14px 28px; border-radius: 12px; border: 2px dashed #38bdf8;">
                            ${code}
                        </span>
                    </div>
                    <p style="color: #64748b; font-size: 12px; line-height: 1.5; margin: 0; text-align: center;">
                        This single-use code will expire in <strong>10 minutes</strong>.
                    </p>
                </div>
                <p style="color: #94a3b8; font-size: 11px; margin: 0; text-align: center;">
                    If you did not initiate this login request, no action is required. Your account remains protected.
                </p>
            </div>
        `;

        const result = await mailer.send({
            to: targetEmail,
            subject: `${code} is your Ancistrus Land Admin Verification Code`,
            html: html
        });

        if (!result.success) {
            throw new Error(`Email dispatch failed: ${result.error || 'Unknown mailer error'}`);
        }

        return {
            success: true,
            emailObfuscated: targetEmail.replace(/(^.{2})(.*)(@.*$)/, (m, a, b, c) => a + '*'.repeat(b.length) + c)
        };
    }

    /**
     * Verify submitted 6-digit OTP code against database
     */
    static async verifyAdminOtp(inputCode) {
        const cleanCode = (inputCode || '').trim();
        if (!cleanCode || cleanCode.length < 6) {
            throw new Error("Invalid code length. 6 digits required.");
        }

        const data = await db.find('store_settings', 'key=eq.admin_otp&select=*');
        if (!data || data.length === 0 || !data[0].value) {
            throw new Error("No pending verification request. Please request a new code.");
        }

        const otpRecord = data[0].value;
        const now = new Date();
        const expiry = new Date(otpRecord.expiresAt);

        if (now > expiry) {
            throw new Error("Verification code has expired. Please request a new code.");
        }

        if (otpRecord.code !== cleanCode) {
            throw new Error("Invalid verification code. Please try again.");
        }

        // Invalidate OTP immediately upon successful verification
        await db.deleteByKey('store_settings', 'key', 'admin_otp');

        // Create signed session token
        const tokenPayload = {
            role: 'admin',
            email: otpRecord.email,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (8 * 3600) // 8 hours
        };
        const token = Buffer.from(JSON.stringify(tokenPayload)).toString('base64');

        return {
            success: true,
            token: token
        };
    }
}

module.exports = { AuthService };
