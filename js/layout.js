const STORE_CONFIG = {
    storeName: "Ancistrus Land",
    storeEmail: "sudarsha.wijenayake@gmail.com",
    storePhone: "+1 613 266 5285",
    whatsappNumber: "16132665285",
    currency: "Rs.",
    adminPin: "1234"
};

const CART_KEY = "ancistrus_cart";
const CATALOG_KEY = "ancistrus_catalog_override";

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
    alert(`"${product.name}" added to cart!`);
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
    return `${STORE_CONFIG.currency} ${Number(amount || 0).toLocaleString("en-LK")}`;
}

function updateCartCount() {
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    const desktop = document.getElementById("cart-count");
    const mobile = document.getElementById("cart-count-mobile");
    if (desktop) desktop.textContent = totalQty;
    if (mobile) mobile.textContent = totalQty;
}

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
