/**
 * Ancistrus Land Canada - Layout Loader
 * Injects modular header and footer templates, attaches cart listeners
 */
import { CartService } from './services.js';

document.addEventListener("DOMContentLoaded", function () {
    // 1. Fetch Header
    const headerPlaceholder = document.getElementById("header-placeholder");
    if (headerPlaceholder) {
        fetch("includes/header.html")
            .then(res => res.text())
            .then(html => {
                headerPlaceholder.innerHTML = html;
                CartService.notify();
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
            })
            .catch(err => console.error("Error loading footer:", err));
    }

    CartService.notify();
});
