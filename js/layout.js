/**
 * Ancistrus Land Canada - Layout Loader & Theme Controller
 * Injects modular header and footer templates, attaches cart listeners,
 * manages persistent Dark/Light Theme preferences, and initializes the tank engine.
 */
import { CartService } from './services.js';
import './aquarium.js';

// Theme controller
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
const savedTheme = localStorage.getItem("ancistrus_theme") || "light";
applyTheme(savedTheme);

// Hydrate dynamic contact information in header, footer, and pages
export function hydrateStoreContacts() {
    const config = (typeof window.getStoreConfig === "function") ? window.getStoreConfig() : (window.STORE_CONFIG || {});
    const email = config.email || "sudarsha.wijenayake@gmail.com";
    const phone = config.phoneDisplay || "+1 (613) 266-5285";
    const location = config.location || "Ottawa, Ontario, Canada";
    const waNumber = config.whatsappNumber || "16132665285";
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
            })
            .catch(err => console.error("Error loading footer:", err));
    }

    CartService.notify();
    hydrateStoreContacts();
});
