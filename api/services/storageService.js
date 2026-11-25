/**
 * Cloud Storage Service Layer
 * Handles uploading cropped/optimized binary and base64 images to Supabase Storage.
 * Follows Single Responsibility and Dependency Inversion principles.
 */
const { db } = require('../lib/db');
const { AppConfig } = require('../config');

class StorageService {
    /**
     * Upload an image buffer/base64 to a storage bucket
     * @param {string} fileName Target filename (e.g. 'fish-1700000000.webp')
     * @param {string} base64Data Base64 encoded image string (data:image/... or bare base64)
     * @param {string} bucket Target storage bucket (defaults to 'catalog')
     * @returns {Promise<{ url: string, path: string }>}
     */
    static async uploadImage(fileName, base64Data, bucket = 'catalog') {
        if (!base64Data) {
            throw new Error("Missing image data for upload.");
        }

        // Clean and detect mime-type
        let mimeType = 'image/jpeg';
        let rawBase64 = base64Data;
        if (base64Data.includes(';base64,')) {
            const parts = base64Data.split(';base64,');
            mimeType = parts[0].replace('data:', '') || 'image/jpeg';
            rawBase64 = parts[1];
        }

        const buffer = Buffer.from(rawBase64, 'base64');
        const cleanFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
        const storagePath = `/storage/v1/object/${bucket}/${cleanFileName}`;

        try {
            await db.request(storagePath, 'POST', buffer, {
                'Content-Type': mimeType,
                'x-upsert': 'true'
            });

            // Construct public CDN URL for the stored object
            const publicUrl = `${AppConfig.supabase.url}/storage/v1/object/public/${bucket}/${cleanFileName}`;
            return {
                success: true,
                url: publicUrl,
                path: cleanFileName
            };
        } catch (err) {
            // If storage bucket doesn't exist or permissions block direct storage upload,
            // provide clean diagnostic message
            console.warn(`Storage upload warning [${bucket}/${cleanFileName}]:`, err.message);
            throw err;
        }
    }
}

module.exports = { StorageService };
