/**
 * External Database Adapter for Supabase REST / PostgreSQL
 * Encapsulates all network communication, headers, error handling, and payload formatting.
 */
const https = require('https');
const url = require('url');
const { AppConfig } = require('../config');

class DatabaseAdapter {
    constructor() {
        const { url: supabaseUrl, serviceKey, anonKey } = AppConfig.supabase;
        this.baseUrl = supabaseUrl;
        this.apiKey = serviceKey || anonKey;
    }

    /**
     * Low-level HTTPS dispatch to Supabase REST endpoints
     */
    request(path, method = 'GET', body = null, extraHeaders = {}) {
        return new Promise((resolve, reject) => {
            if (!this.baseUrl || !this.apiKey) {
                return reject(new Error("Database connection parameters not configured in environment variables."));
            }

            const parsed = new url.URL(this.baseUrl);
            const headers = {
                'apikey': this.apiKey,
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                ...extraHeaders
            };

            let payload = null;
            if (body !== null && body !== undefined) {
                payload = typeof body === 'string' ? body : JSON.stringify(body);
                headers['Content-Length'] = Buffer.byteLength(payload);
            }

            const options = {
                hostname: parsed.hostname,
                port: 443,
                path: path,
                method: method,
                headers: headers
            };

            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', chunk => { data += chunk; });
                res.on('end', () => {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        try {
                            resolve(data ? JSON.parse(data) : null);
                        } catch (e) {
                            resolve(data);
                        }
                    } else {
                        reject(new Error(`Database error [HTTP ${res.statusCode}]: ${data}`));
                    }
                });
            });

            req.on('error', (err) => reject(err));
            if (payload) req.write(payload);
            req.end();
        });
    }

    // CRUD primitives
    find(table, query = '') {
        const q = query ? `?${query}` : '';
        return this.request(`/rest/v1/${table}${q}`, 'GET');
    }

    findById(table, id) {
        return this.request(`/rest/v1/${table}?id=eq.${encodeURIComponent(id)}&select=*`, 'GET');
    }

    insert(table, record, preferReturn = true) {
        const headers = preferReturn ? { 'Prefer': 'return=representation' } : {};
        return this.request(`/rest/v1/${table}`, 'POST', record, headers);
    }

    upsert(table, record) {
        return this.request(`/rest/v1/${table}`, 'POST', record, {
            'Prefer': 'resolution=merge-duplicates,return=representation'
        });
    }

    delete(table, id) {
        return this.request(`/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, 'DELETE');
    }

    deleteByKey(table, key, value) {
        return this.request(`/rest/v1/${table}?${encodeURIComponent(key)}=eq.${encodeURIComponent(value)}`, 'DELETE');
    }
}

// Singleton database instance
const db = new DatabaseAdapter();

module.exports = { DatabaseAdapter, db };
