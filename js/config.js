/**
 * Ancistrus Land Canada - Centralized Store Configuration
 * Single Source of Truth for all contact, market, and business constants.
 */
export const STORE_CONFIG = Object.freeze({
    brandName: "Ancistrus Land",
    tagline: "Canada's Specialty Aquatic Pets & Supplies",
    country: "Canada",
    currency: "CAD",
    currencySymbol: "$",
    locale: "en-CA",
    
    // Store Contacts
    email: "contact@ancistrusland.com",
    phoneDisplay: "+1 (613) 857-7381",
    whatsappNumber: "16138577381",
    
    // Admin Security
    adminEmail: "contact@ancistrusland.com",
    
    // Shipping & Regional Constraints
    dispatchDays: ["Monday", "Tuesday"],
    lagWindowHours: 2, // Live Arrival Guarantee reporting window
    provinces: [
        { code: "ON", name: "Ontario", taxType: "HST", rate: 0.13, label: "13% HST" },
        { code: "QC", name: "Quebec", taxType: "GST+QST", rate: 0.14975, label: "14.975% (5% GST + 9.975% QST)" },
        { code: "BC", name: "British Columbia", taxType: "GST+PST", rate: 0.12, label: "12% (5% GST + 7% PST)" },
        { code: "AB", name: "Alberta", taxType: "GST", rate: 0.05, label: "5% GST" },
        { code: "MB", name: "Manitoba", taxType: "GST+PST", rate: 0.12, label: "12% (5% GST + 7% RST)" },
        { code: "SK", name: "Saskatchewan", taxType: "GST+PST", rate: 0.11, label: "11% (5% GST + 6% PST)" },
        { code: "NS", name: "Nova Scotia", taxType: "HST", rate: 0.15, label: "15% HST" },
        { code: "NB", name: "New Brunswick", taxType: "HST", rate: 0.15, label: "15% HST" },
        { code: "NL", name: "Newfoundland and Labrador", taxType: "HST", rate: 0.15, label: "15% HST" },
        { code: "PE", name: "Prince Edward Island", taxType: "HST", rate: 0.15, label: "15% HST" },
        { code: "NT", name: "Northwest Territories", taxType: "GST", rate: 0.05, label: "5% GST" },
        { code: "YT", name: "Yukon", taxType: "GST", rate: 0.05, label: "5% GST" },
        { code: "NU", name: "Nunavut", taxType: "GST", rate: 0.05, label: "5% GST" }
    ],
    
    // Payment Options Supported
    paymentMethods: [
        { id: "interac", name: "Interac e-Transfer", desc: "Direct Canadian bank transfer to contact@ancistrusland.com" },
        { id: "cod", name: "Cash on Delivery / Pickup", desc: "Available for Ottawa / Gatineau region" },
        { id: "invoice", name: "Credit / Debit Card", desc: "Secure digital payment link via email" }
    ],

    storageKeys: {
        cart: "ancistrus_cart",
        catalogOverride: "ancistrus_catalog_override",
        orders: "ancistrus_orders",
        adminSession: "ancistrus_admin_auth",
        contactsOverride: "ancistrus_contacts_override"
    }
});

/**
 * Returns active store configuration merging default constants with any admin overrides
 */
let cachedStoreConfig = null;

export function getStoreConfig() {
    if (cachedStoreConfig) return cachedStoreConfig;
    try {
        const custom = localStorage.getItem(STORE_CONFIG.storageKeys.contactsOverride);
        if (custom) {
            const parsed = JSON.parse(custom);
            cachedStoreConfig = { ...STORE_CONFIG, ...parsed };
            return cachedStoreConfig;
        }
    } catch (e) {
        console.warn("Failed to read contacts override:", e);
    }
    return STORE_CONFIG;
}

/**
 * Loads store contacts from the cloud database (Supabase) if available,
 * seamlessly caching locally and broadcasting live updates.
 */
export async function syncStoreContactsFromCloud() {
    try {
        const res = await fetch('/api/store?action=settings');
        if (res.ok) {
            const data = await res.json();
            if (data && data.success && data.contacts) {
                localStorage.setItem(STORE_CONFIG.storageKeys.contactsOverride, JSON.stringify(data.contacts));
                cachedStoreConfig = { ...STORE_CONFIG, ...data.contacts };
                if (typeof window !== "undefined") {
                    window.STORE_CONFIG = cachedStoreConfig;
                    window.dispatchEvent(new CustomEvent('store:config:updated', { detail: data.contacts }));
                }
                return cachedStoreConfig;
            }
        }
    } catch (e) {
        // Offline or local fallback
    }
    return getStoreConfig();
}

export async function saveStoreContacts(contacts) {
    cachedStoreConfig = { ...STORE_CONFIG, ...contacts };
    localStorage.setItem(STORE_CONFIG.storageKeys.contactsOverride, JSON.stringify(contacts));
    if (typeof window !== "undefined") {
        window.STORE_CONFIG = cachedStoreConfig;
        window.dispatchEvent(new CustomEvent('store:config:updated', { detail: contacts }));
    }

    // Push to Supabase Cloud
    try {
        await fetch('/api/store?action=settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contacts })
        });
    } catch (err) {
        console.warn("Could not save settings to cloud (saved locally):", err);
    }
}

export async function resetStoreContacts() {
    cachedStoreConfig = null;
    localStorage.removeItem(STORE_CONFIG.storageKeys.contactsOverride);
    if (typeof window !== "undefined") {
        window.STORE_CONFIG = STORE_CONFIG;
        window.dispatchEvent(new CustomEvent('store:config:updated'));
    }

    // Reset on Supabase Cloud
    try {
        await fetch('/api/store?action=settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contacts: {
                    location: STORE_CONFIG.location,
                    phoneDisplay: STORE_CONFIG.phoneDisplay,
                    email: STORE_CONFIG.email,
                    whatsappNumber: STORE_CONFIG.whatsappNumber
                }
            })
        });
    } catch (err) {
        console.warn("Could not reset settings in cloud:", err);
    }
}

/**
 * Calculates Canadian tax details based on destination province name or province code.
 * @param {string} provinceInput - Province name (e.g. "Ontario") or code (e.g. "ON")
 * @param {number} subtotal - Order subtotal in CAD
 */
export function calculateCanadianTax(provinceInput, subtotal = 0) {
    const input = (provinceInput || "").trim().toLowerCase();
    const prov = STORE_CONFIG.provinces.find(p => 
        p.name.toLowerCase() === input || 
        p.code.toLowerCase() === input
    ) || STORE_CONFIG.provinces[0]; // Defaults to Ontario (13% HST) if unspecified

    const safeSubtotal = Math.max(0, Number(subtotal) || 0);
    const taxAmount = Math.round(safeSubtotal * prov.rate * 100) / 100;
    const totalWithTax = Math.round((safeSubtotal + taxAmount) * 100) / 100;

    return {
        province: prov.name,
        code: prov.code,
        taxType: prov.taxType,
        rate: prov.rate,
        label: prov.label,
        ratePercentage: `${(prov.rate * 100).toFixed(prov.rate === 0.14975 ? 3 : (prov.rate % 1 === 0 ? 0 : (prov.rate * 100 % 1 !== 0 ? 1 : 0)))}%`,
        taxAmount: taxAmount,
        subtotal: safeSubtotal,
        total: totalWithTax
    };
}

// Expose globally for legacy script compatibility
if (typeof window !== "undefined") {
    window.STORE_CONFIG = getStoreConfig();
    window.getStoreConfig = getStoreConfig;
    window.syncStoreContactsFromCloud = syncStoreContactsFromCloud;
    window.saveStoreContacts = saveStoreContacts;
    window.resetStoreContacts = resetStoreContacts;
    window.calculateCanadianTax = calculateCanadianTax;
}
