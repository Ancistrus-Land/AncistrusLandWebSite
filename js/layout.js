/**
 * Ancistrus Land Canada - Layout Loader & Theme Controller
 * Injects modular header and footer templates, attaches cart listeners,
 * manages persistent Dark/Light Theme preferences, and initializes the tank engine.
 */
import { CartService } from './services.js';
import { i18n } from './i18n.js';
import './aquarium.js';

// Theme controller with System Preference Detection and Dark Fallback
function getPreferredTheme() {
    const stored = localStorage.getItem("ancistrus_theme");
    if (stored === "dark" || stored === "light") {
        return stored;
    }
    // Device / OS theme auto-detection
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return "light";
    }
    // Default fallback: dark mode
    return "dark";
}

function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
    updateThemeIcons(theme);
}

function updateThemeIcons(theme) {
    const isDark = theme === "dark" || document.body.classList.contains("dark-mode");
    document.querySelectorAll(".theme-icon").forEach(icon => {
        if (isDark) {
            icon.className = "fas fa-sun theme-icon";
        } else {
            icon.className = "fas fa-moon theme-icon";
        }
    });
}

window.toggleTheme = function () {
    const isDark = document.body.classList.toggle("dark-mode");
    const newTheme = isDark ? "dark" : "light";
    localStorage.setItem("ancistrus_theme", newTheme);
    updateThemeIcons(newTheme);
};

// Initial theme setup immediately on load
applyTheme(getPreferredTheme());

// Live listener for OS theme changes (only applies if the user hasn't manually set a preference)
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem("ancistrus_theme")) {
            applyTheme(e.matches ? "dark" : "light");
        }
    });
}

// Hydrate dynamic contact information in header, footer, and pages
export function hydrateStoreContacts() {
    const config = (typeof window.getStoreConfig === "function") ? window.getStoreConfig() : (window.STORE_CONFIG || {});
    const email = config.email || "contact@ancistrusland.com";
    const phone = config.phoneDisplay || "+1 (613) 857-7381";
    const location = config.location || "22 Moresby Drive, Ottawa, Ontario, K2M 2E5";
    const waNumber = config.whatsappNumber || "16138577381";
    const waUrl = `https://wa.me/${waNumber.replace(/[^0-9]/g, '')}`;

    // Target elements with data-store-contact attribute
    document.querySelectorAll('[data-store-contact="email"]').forEach(el => {
        el.textContent = email;
        if (el.tagName === 'A') el.href = `mailto:${email}`;
    });
    document.querySelectorAll('[data-store-contact="email-link"]').forEach(el => {
        if (el.tagName === 'A') el.href = `mailto:${email}`;
    });
    document.querySelectorAll('[data-store-contact="phone"]').forEach(el => {
        el.textContent = phone;
        if (el.tagName === 'A') el.href = `tel:${phone.replace(/[^0-9+]/g, '')}`;
    });
    document.querySelectorAll('[data-store-contact="location"]').forEach(el => {
        el.textContent = location;
    });
    document.querySelectorAll('[data-store-contact="whatsapp-link"]').forEach(el => {
        if (el.tagName === 'A') el.href = waUrl;
    });
}

if (typeof window !== "undefined") {
    window.hydrateStoreContacts = hydrateStoreContacts;
    window.addEventListener('store:config:updated', () => {
        hydrateStoreContacts();
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // 1. Fetch Header
    const headerPlaceholder = document.getElementById("header-placeholder");
    if (headerPlaceholder) {
        fetch("includes/header.html")
            .then(res => res.text())
            .then(html => {
                headerPlaceholder.innerHTML = html;
                CartService.notify();
                updateThemeIcons(localStorage.getItem("ancistrus_theme") || "light");
                hydrateStoreContacts();
                i18n.init();
            })
            .catch(err => console.error("Error loading header:", err));
    }

    // 2. Fetch Footer
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
        fetch("includes/footer.html")
            .then(res => res.text())
            .then(html => {
                footerPlaceholder.innerHTML = html;
                hydrateStoreContacts();
                i18n.translatePage();
            })
            .catch(err => console.error("Error loading footer:", err));
    }

    CartService.notify();
    hydrateStoreContacts();

    // Background sync from Supabase cloud database
    if (typeof window.syncStoreContactsFromCloud === "function") {
        window.syncStoreContactsFromCloud().then(() => hydrateStoreContacts());
    }
});
