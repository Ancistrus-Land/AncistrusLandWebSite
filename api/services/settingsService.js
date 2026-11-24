/**
 * Settings & Store Configuration Service Layer
 * Single Source of Truth for Store Contacts & Info from database.
 */
const { db } = require('../lib/db');
const { AppConfig } = require('../config');

class SettingsService {
    /**
     * Retrieve official store contacts from DB with environment fallback
     */
    static async getContacts() {
        try {
            const data = await db.find('store_settings', 'key=eq.contacts&select=*');
            if (data && data.length > 0 && data[0].value) {
                return data[0].value;
            }
        } catch (err) {
            console.warn('[SETTINGS SERVICE] Cloud lookup failed, using fallback:', err.message);
        }
        return AppConfig.storeDefaults;
    }

    /**
     * Update official store contacts in database
     */
    static async updateContacts(contacts) {
        if (!contacts || typeof contacts !== 'object') {
            throw new Error("Invalid contacts payload.");
        }
        const record = {
            key: 'contacts',
            value: contacts,
            updated_at: new Date().toISOString()
        };
        return await db.upsert('store_settings', record);
    }
}

module.exports = { SettingsService };
