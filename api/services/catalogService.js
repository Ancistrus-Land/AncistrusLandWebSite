/**
 * Product & Inventory Catalog Service Layer
 * Encapsulates catalog queries, stock alterations, and deletions.
 */
const { db } = require('../lib/db');

class CatalogService {
    /**
     * Get all products from database sorted by creation date
     */
    static async getAll() {
        const products = await db.find('products', 'select=*&order=created_at.desc');
        return products || [];
    }

    /**
     * Get single product by ID
     */
    static async getById(id) {
        const results = await db.findById('products', id);
        return (results && results.length > 0) ? results[0] : null;
    }

    /**
     * Upsert single product or array of products
     */
    static async save(productOrArray) {
        return await db.upsert('products', productOrArray);
    }

    /**
     * Delete product by ID
     */
    static async delete(id) {
        return await db.delete('products', id);
    }
}

module.exports = { CatalogService };
