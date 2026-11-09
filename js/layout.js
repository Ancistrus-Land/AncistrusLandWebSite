// Firebase and Cloud Configuration for Ancistrus Land
// Replace the demo credentials below with your own free Firebase project config when ready.
// Get yours free in 2 minutes at https://console.firebase.google.com/
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDemoKeyAncistrusLand2026",
    authDomain: "ancistrus-land.firebaseapp.com",
    projectId: "ancistrus-land",
    storageBucket: "ancistrus-land.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456"
};

// Global Store Configuration (Canadian Market)
const STORE_CONFIG = {
    storeName: "Ancistrus Land",
    storeEmail: "sudarsha.wijenayake@gmail.com",
    storePhone: "+1 (613) 266-5285",
    whatsappNumber: "16132665285",
    country: "Canada",
    currency: "CAD $",
    currencySymbol: "$",
    locale: "en-CA",
    adminPin: "1234",
    provinces: [
        "Ontario (ON)",
        "Quebec (QC)",
        "British Columbia (BC)",
        "Alberta (AB)",
        "Manitoba (MB)",
        "Saskatchewan (SK)",
        "Nova Scotia (NS)",
        "New Brunswick (NB)",
        "Newfoundland and Labrador (NL)",
        "Prince Edward Island (PE)",
        "Northwest Territories (NT)",
        "Yukon (YT)",
        "Nunavut (NU)"
    ]
};

const CART_KEY = "ancistrus_cart";
const CATALOG_KEY = "ancistrus_catalog_override";
const ORDERS_KEY = "ancistrus_orders";

/* --- Active Catalog Management with Cloud / Fallback sync --- */
function getActiveCatalog() {
    try {
        const override = localStorage.getItem(CATALOG_KEY);
        if (override) {
            return JSON.parse(override);
        }
    } catch (e) {
        console.warn("Could not read catalog override:", e);
    }
    return (typeof ANCISTRUS_PRODUCTS !== "undefined") ? ANCISTRUS_PRODUCTS : [];
}

function saveCatalogOverride(products) {
    localStorage.setItem(CATALOG_KEY, JSON.stringify(products));
}

function resetCatalogOverride() {
    localStorage.removeItem(CATALOG_KEY);
}

/* --- Cart Utilities --- */
function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId, quantity = 1) {
    const catalog = getActiveCatalog();
    const product = catalog.find(p => p.id === productId);
    if (!product) {
        alert("Product not found");
        return;
    }
    if (product.available === false) {
        alert("Sorry, this item is currently out of stock!");
        return;
    }

    let cart = getCart();
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price) || 0,
            image: product.image || "img/Fish 1.jpg",
            category: product.category,
            quantity: quantity
        });
    }
    saveCart(cart);
    alert(`"${product.name}" added to your cart!`);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

function updateCartQuantity(productId, qty) {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = Math.max(1, qty);
        saveCart(cart);
    }
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartCount();
}

function formatPrice(amount) {
    const num = Number(amount || 0);
    return `$${num.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function updateCartCount() {
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    const desktop = document.getElementById("cart-count");
    const mobile = document.getElementById("cart-count-mobile");
    if (desktop) desktop.textContent = totalQty;
    if (mobile) mobile.textContent = totalQty;
}

/* --- Modular Header & Footer Loader --- */
document.addEventListener("DOMContentLoaded", function () {
    fetch("includes/header.html")
        .then(res => res.text())
        .then(html => {
            const el = document.getElementById("header-placeholder");
            if (el) {
                el.innerHTML = html;
                updateCartCount();
            }
        }).catch(err => console.warn("Header load error:", err));

    fetch("includes/footer.html")
        .then(res => res.text())
        .then(html => {
            const el = document.getElementById("footer-placeholder");
            if (el) el.innerHTML = html;
        }).catch(err => console.warn("Footer load error:", err));

    updateCartCount();
});
