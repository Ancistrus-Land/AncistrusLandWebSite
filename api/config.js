/**
 * Ancistrus Land Canada - Centralized Backend Environment Configuration
 * Strictly loads from environment variables with graceful fallback defaults.
 * Never stores credentials or API secrets in code.
 */
try {
    require('dotenv').config();
} catch (e) {
    // dotenv optional in cloud serverless environments
}

class AppConfig {
    static get env() {
        return process.env.NODE_ENV || 'development';
    }

    static get siteUrl() {
        return process.env.SITE_URL || 'https://www.ancistrusland.com';
    }

    static get supabase() {
        return {
            url: process.env.SUPABASE_URL || 'https://brcerimskfuogsadzewy.supabase.co',
            anonKey: process.env.SUPABASE_ANON_KEY || '',
            serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || ''
        };
    }

    static get resend() {
        return {
            apiKey: process.env.RESEND_API_KEY || '',
            fromSender: process.env.RESEND_FROM || 'Ancistrus Land Orders <orders@ancistrusland.com>'
        };
    }

    static get storeDefaults() {
        return {
            name: 'Ancistrus Land',
            email: process.env.STORE_EMAIL || 'contact@ancistrusland.com',
            phone: '+1 (613) 857-7381',
            location: '22 Moresby Drive, Ottawa, Ontario, K2M 2E5',
            whatsapp: '16138577381'
        };
    }
}

module.exports = { AppConfig };
