/**
 * Ancistrus Land Canada - Hero Showcase Slideshow
 * Automatically cycles through all products in the catalogue with a smooth timer.
 * Includes interactive prev/next controls, pause on hover, and direct links to product pages.
 */

(function () {
    "use strict";

    let currentIndex = 0;
    let timer = null;
    let products = [];
    const INTERVAL = 3500; // 3.5 seconds per slide

    function initShowcase() {
        // Resolve products from services or global array
        if (typeof CatalogService !== "undefined" && CatalogService.getAll) {
            products = CatalogService.getAll();
        } else if (typeof ANCISTRUS_PRODUCTS !== "undefined") {
            products = ANCISTRUS_PRODUCTS;
        }

        if (!products || products.length === 0) {
            setTimeout(initShowcase, 100);
            return;
        }

        renderSlide(0);
        startTimer();

        // Attach user control listeners
        const container = document.getElementById("hero-showcase");
        if (container) {
            container.addEventListener("mouseenter", pauseTimer);
            container.addEventListener("mouseleave", startTimer);
        }

        const btnPrev = document.getElementById("showcase-prev");
        const btnNext = document.getElementById("showcase-next");
        if (btnPrev) btnPrev.addEventListener("click", prevSlide);
        if (btnNext) btnNext.addEventListener("click", nextSlide);
    }

    function renderSlide(index) {
        if (!products || products.length === 0) return;
        currentIndex = (index + products.length) % products.length;
        const p = products[currentIndex];

        const imgEl = document.getElementById("showcase-img");
        const nameEl = document.getElementById("showcase-name");
        const priceEl = document.getElementById("showcase-price");
        const badgeEl = document.getElementById("showcase-category");
        const linkEl = document.getElementById("showcase-link");
        const counterEl = document.getElementById("showcase-counter");

        if (imgEl) {
            imgEl.style.opacity = "0.3";
            imgEl.style.transform = "scale(0.97)";
            setTimeout(() => {
                imgEl.src = p.image || "img/Fish 1.jpg";
                imgEl.alt = p.name;
                imgEl.style.opacity = "1";
                imgEl.style.transform = "scale(1)";
            }, 200);
        }

        if (nameEl) nameEl.textContent = p.name;
        if (priceEl) {
            const price = Number(p.price || 0).toFixed(2);
            priceEl.textContent = `$${price} CAD`;
        }
        if (badgeEl) {
            badgeEl.textContent = (p.subcategory || p.category || "Specialty Fish").toUpperCase();
        }
        if (linkEl) {
            linkEl.href = `shop-detail.html?id=${p.id}`;
        }
        if (counterEl) {
            counterEl.textContent = `${currentIndex + 1} / ${products.length}`;
        }
    }

    function nextSlide() {
        renderSlide(currentIndex + 1);
        resetTimer();
    }

    function prevSlide() {
        renderSlide(currentIndex - 1);
        resetTimer();
    }

    function startTimer() {
        pauseTimer();
        timer = setInterval(nextSlide, INTERVAL);
    }

    function pauseTimer() {
        if (timer) clearInterval(timer);
        timer = null;
    }

    function resetTimer() {
        pauseTimer();
        startTimer();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initShowcase);
    } else {
        initShowcase();
    }
})();
