/**
 * Ancistrus Land Canada - Hero Showcase Ribbon
 * Dynamically loads all fish from the live catalogue and renders them into an
 * infinite, horizontally moving ribbon strip (left to right).
 * Clicking any photo navigates directly to its shop-detail.html page.
 */

(function () {
    "use strict";

    function initRibbon() {
        const track = document.getElementById("hero-ribbon-track");
        if (!track) return;

        let products = [];
        if (typeof CatalogService !== "undefined" && CatalogService.getAll) {
            products = CatalogService.getAll();
        } else if (typeof ANCISTRUS_PRODUCTS !== "undefined") {
            products = ANCISTRUS_PRODUCTS;
        }

        // Retry if data is still loading
        if (!products || products.length === 0) {
            setTimeout(initRibbon, 100);
            return;
        }

        // Clear any placeholder
        track.innerHTML = "";

        // Function to create an individual fish photo card
        function createCard(p) {
            const card = document.createElement("a");
            card.className = "hero-ribbon-card";
            card.href = `shop-detail.html?id=${encodeURIComponent(p.id)}`;
            card.title = p.name || "Specimen";

            const img = document.createElement("img");
            img.className = "hero-ribbon-img";
            img.src = p.image || "img/Fish 1.jpg";
            img.alt = p.name || "Fish specimen";
            img.loading = "lazy";

            const overlay = document.createElement("div");
            overlay.className = "hero-ribbon-overlay";
            overlay.innerHTML = `<span class="hero-ribbon-view-btn"><i class="fas fa-eye me-1"></i> View Specimen</span>`;

            card.appendChild(img);
            card.appendChild(overlay);
            return card;
        }

        // Create the primary set of cards
        const fragment = document.createDocumentFragment();
        products.forEach(p => {
            fragment.appendChild(createCard(p));
        });

        // Duplicate the exact set once for a seamless, seamless infinite CSS translation loop
        products.forEach(p => {
            fragment.appendChild(createCard(p));
        });

        track.appendChild(fragment);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initRibbon);
    } else {
        initRibbon();
    }
})();
