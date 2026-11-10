/**
 * Ancistrus Land Canada - State Management & Services Layer
 * Handles Cart, Catalog Repository, and Order Processing
 */
import { STORE_CONFIG } from './config.js';

/* ==========================================================================
   1. Catalog Repository Service
   ========================================================================== */
export const CatalogService = {
    getAll() {
        try {
            const override = localStorage.getItem(STORE_CONFIG.storageKeys.catalogOverride);
            if (override) return JSON.parse(override);
        } catch (e) {
            console.warn("Failed to load catalog override:", e);
        }
        return (typeof ANCISTRUS_PRODUCTS !== "undefined") ? ANCISTRUS_PRODUCTS : [];
    },

    getById(id) {
        return this.getAll().find(p => p.id === id) || null;
    },

    getByCategory(category, subcategory = null) {
        return this.getAll().filter(p => {
            if (category && category !== 'all' && p.category !== category) return false;
            if (subcategory && p.subcategory !== subcategory) return false;
            return true;
        });
    },

    saveAll(products) {
        localStorage.setItem(STORE_CONFIG.storageKeys.catalogOverride, JSON.stringify(products));
        window.dispatchEvent(new CustomEvent('catalog:updated', { detail: products }));
    },

    resetToDefault() {
        localStorage.removeItem(STORE_CONFIG.storageKeys.catalogOverride);
        window.dispatchEvent(new CustomEvent('catalog:updated'));
    }
};

/* ==========================================================================
   2. Cart Service
   ========================================================================== */
export const CartService = {
    getItems() {
        try {
            return JSON.parse(localStorage.getItem(STORE_CONFIG.storageKeys.cart)) || [];
        } catch (e) {
            return [];
        }
    },

    save(items) {
        localStorage.setItem(STORE_CONFIG.storageKeys.cart, JSON.stringify(items));
        this.notify();
    },

    add(productId, quantity = 1) {
        const product = CatalogService.getById(productId);
        if (!product) throw new Error("Product not found");
        if (product.available === false) throw new Error("Item is currently out of stock");

        const cart = this.getItems();
        const existing = cart.find(i => i.id === productId);

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

        this.save(cart);
        return product;
    },

    updateQuantity(productId, quantity) {
        let cart = this.getItems();
        const item = cart.find(i => i.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.remove(productId);
            } else {
                item.quantity = quantity;
                this.save(cart);
            }
        }
    },

    remove(productId) {
        let cart = this.getItems().filter(i => i.id !== productId);
        this.save(cart);
    },

    clear() {
        localStorage.removeItem(STORE_CONFIG.storageKeys.cart);
        this.notify();
    },

    getTotalCount() {
        return this.getItems().reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    },

    getSubtotal() {
        return this.getItems().reduce((sum, item) => sum + ((Number(item.price) || 0) * (Number(item.quantity) || 1)), 0);
    },

    notify() {
        const count = this.getTotalCount();
        const desktopBadge = document.getElementById("cart-count");
        const mobileBadge = document.getElementById("cart-count-mobile");
        if (desktopBadge) desktopBadge.textContent = count;
        if (mobileBadge) mobileBadge.textContent = count;
        window.dispatchEvent(new CustomEvent('cart:updated', { detail: { count, items: this.getItems() } }));
    }
};

/* ==========================================================================
   3. Order Service
   ========================================================================== */
export const OrderService = {
    getAll() {
        try {
            return JSON.parse(localStorage.getItem(STORE_CONFIG.storageKeys.orders)) || [];
        } catch (e) {
            return [];
        }
    },

    create(customerData, cartItems, totalAmount) {
        const orderId = `ANC-CA-${Math.floor(100000 + Math.random() * 900000)}`;
        const order = {
            orderId,
            date: new Date().toLocaleString(STORE_CONFIG.locale),
            customer: customerData,
            items: cartItems,
            total: totalAmount
        };

        // Save to current session for confirmation view
        sessionStorage.setItem("last_order", JSON.stringify(order));

        // Save to master orders log
        const orders = this.getAll();
        orders.unshift(order);
        localStorage.setItem(STORE_CONFIG.storageKeys.orders, JSON.stringify(orders));

        CartService.clear();
        return order;
    },

    buildWhatsAppMessage(order) {
        const c = order.customer;
        let msg = `*NEW ORDER - ${STORE_CONFIG.brandName.toUpperCase()}*\n`;
        msg += `*Order ID:* ${order.orderId}\n`;
        msg += `*Customer:* ${c.name}\n`;
        msg += `*Phone:* ${c.phone}\n`;
        msg += `*Email:* ${c.email}\n`;
        msg += `*Address:* ${c.address}, ${c.city}, ${c.province} (${c.postalCode})\n`;
        msg += `*Payment:* ${c.paymentMethod}\n`;
        if (c.notes) msg += `*Notes:* ${c.notes}\n`;
        msg += `\n*ITEMS ORDERED:*\n`;
        order.items.forEach(i => {
            msg += `- ${i.name} (x${i.quantity}) - $${(i.price * i.quantity).toFixed(2)}\n`;
        });
        msg += `\n*TOTAL:* $${Number(order.total).toFixed(2)} CAD`;
        return msg;
    }
};

/* ==========================================================================
   4. UI Formatting Helpers
   ========================================================================== */
export function formatCurrency(amount) {
    return `$${Number(amount || 0).toLocaleString(STORE_CONFIG.locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

// Universal Global Bindings for inline page scripts
if (typeof window !== "undefined") {
    window.STORE_CONFIG = STORE_CONFIG;
    window.CatalogService = CatalogService;
    window.CartService = CartService;
    window.OrderService = OrderService;
    window.getActiveCatalog = () => CatalogService.getAll();
    window.formatPrice = formatCurrency;
    window.getCart = () => CartService.getItems();
    window.clearCart = () => CartService.clear();
    window.removeFromCart = (id) => CartService.remove(id);
    window.updateCartQuantity = (id, q) => CartService.updateQuantity(id, q);
    window.ORDERS_KEY = STORE_CONFIG.storageKeys.orders;
    window.addToCart = (id, q = 1) => {
        try {
            const p = CartService.add(id, q);
            alert(`"${p.name}" added to cart!`);
        } catch (e) {
            alert(e.message);
        }
    };
    window.updateCartCount = () => CartService.notify();
}
