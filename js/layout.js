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
