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
    email: "sudarsha.wijenayake@gmail.com",
    phoneDisplay: "+1 (613) 266-5285",
    whatsappNumber: "16132665285",
    location: "Ottawa, Ontario, Canada",
    
    // Admin Security
    adminPin: "1234",
    
    // Shipping & Regional Constraints
    dispatchDays: ["Monday", "Tuesday"],
    lagWindowHours: 2, // Live Arrival Guarantee reporting window
    provinces: [
        { code: "ON", name: "Ontario" },
        { code: "QC", name: "Quebec" },
        { code: "BC", name: "British Columbia" },
        { code: "AB", name: "Alberta" },
        { code: "MB", name: "Manitoba" },
        { code: "SK", name: "Saskatchewan" },
        { code: "NS", name: "Nova Scotia" },
        { code: "NB", name: "New Brunswick" },
        { code: "NL", name: "Newfoundland and Labrador" },
        { code: "PE", name: "Prince Edward Island" }
    ],
    
    // Payment Options Supported
    paymentMethods: [
        { id: "interac", name: "Interac e-Transfer", desc: "Direct Canadian bank transfer to sudarsha.wijenayake@gmail.com" },
        { id: "cod", name: "Cash on Delivery / Pickup", desc: "Available for Ottawa / Gatineau region" },
        { id: "invoice", name: "Credit / Debit Card", desc: "Secure digital payment link via email" }
    ],

    storageKeys: {
        cart: "ancistrus_cart",
        catalogOverride: "ancistrus_catalog_override",
        orders: "ancistrus_orders",
        adminSession: "ancistrus_admin_auth"
    }
});

// Expose globally for legacy script compatibility
if (typeof window !== "undefined") {
    window.STORE_CONFIG = STORE_CONFIG;
}
