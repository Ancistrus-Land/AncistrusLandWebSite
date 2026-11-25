/**
 * Ancistrus Land Canada - Aquarium Ambience Engine
 * Gentle, refined underwater ambience:
 * - Rising micro air bubbles
 * - Realistic swimming fish silhouettes (Pleco, Discus, Betta, Tetras)
 * - Delicate, graceful swaying aquatic plants
 */

(function () {
    "use strict";

    function initAquariumTank() {
        if (document.getElementById("aquarium-tank-container")) return;

        const container = document.createElement("div");
        container.id = "aquarium-tank-container";
        container.setAttribute("aria-hidden", "true");

        // 1. Water Caustic Light Shimmer Layer
        const waterLight = document.createElement("div");
        waterLight.className = "tank-water-shimmer";
        container.appendChild(waterLight);

        // 2. Rising Micro Bubbles Layer (Rich underwater aeration stream)
        const bubblesLayer = document.createElement("div");
        bubblesLayer.className = "tank-bubbles-layer";
        // Create 65 natural bubbles with varied sizes, speeds, and natural horizontal wavering
        for (let i = 0; i < 65; i++) {
            const bubble = document.createElement("div");
            bubble.className = "tank-bubble";
            const size = Math.floor(Math.random() * 14) + 4; // 4px to 18px
            const left = (Math.random() * 98).toFixed(1);
            const duration = (Math.random() * 8 + 6).toFixed(1); // 6s to 14s rise
            const delay = (Math.random() * 10).toFixed(1);
            const drift = (Math.random() * 40 - 20).toFixed(0);

            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${left}%`;
            bubble.style.animationDuration = `${duration}s`;
            bubble.style.animationDelay = `${delay}s`;
            bubble.style.setProperty("--drift", `${drift}px`);

            bubblesLayer.appendChild(bubble);
        }
        container.appendChild(bubblesLayer);

        // 3. Graceful Ribbon-Leaf Water Plants
        const plantsLayer = document.createElement("div");
        plantsLayer.className = "tank-plants-layer";
        plantsLayer.innerHTML = `
            <div class="tank-plant plant-left">
                <svg viewBox="0 0 100 240" width="90" height="230">
                    <path class="plant-leaf leaf-1" d="M15,240 C10,170 35,100 25,10 C28,70 15,160 20,240 Z" fill="#2d7d46" opacity="0.45"/>
                    <path class="plant-leaf leaf-2" d="M35,240 C45,160 20,90 35,25 C30,85 45,165 40,240 Z" fill="#388e3c" opacity="0.5"/>
                    <path class="plant-leaf leaf-3" d="M55,240 C40,180 65,110 50,45 C55,105 45,185 60,240 Z" fill="#43a047" opacity="0.4"/>
                </svg>
            </div>
            <div class="tank-plant plant-right">
                <svg viewBox="0 0 110 260" width="100" height="250">
                    <path class="plant-leaf leaf-1" d="M30,260 C20,180 50,110 35,15 C40,85 25,175 35,260 Z" fill="#2d7d46" opacity="0.45"/>
                    <path class="plant-leaf leaf-2" d="M60,260 C75,170 45,95 65,30 C55,100 70,180 65,260 Z" fill="#388e3c" opacity="0.5"/>
                    <path class="plant-leaf leaf-3" d="M85,260 C70,195 95,125 80,55 C88,120 75,200 90,260 Z" fill="#43a047" opacity="0.4"/>
                </svg>
            </div>
        `;
        container.appendChild(plantsLayer);

        document.body.prepend(container);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAquariumTank);
    } else {
        initAquariumTank();
    }
})();
