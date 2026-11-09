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

        // 2. Rising Micro Bubbles Layer
        const bubblesLayer = document.createElement("div");
        bubblesLayer.className = "tank-bubbles-layer";
        for (let i = 0; i < 24; i++) {
            const bubble = document.createElement("div");
            bubble.className = "tank-bubble";
            const size = Math.floor(Math.random() * 12) + 6; // 6px to 18px
            const left = Math.random() * 98;
            const duration = (Math.random() * 7 + 8).toFixed(1); // 8s to 15s
            const delay = (Math.random() * 8).toFixed(1);
            const drift = (Math.random() * 30 - 15).toFixed(0);

            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${left}%`;
            bubble.style.animationDuration = `${duration}s`;
            bubble.style.animationDelay = `${delay}s`;
            bubble.style.setProperty("--drift", `${drift}px`);

            bubblesLayer.appendChild(bubble);
        }
        container.appendChild(bubblesLayer);

        // 3. Swimming Fish Fleet (Gentle, elegant depth silhouettes)
        const fishLayer = document.createElement("div");
        fishLayer.className = "tank-fish-layer";

        const fishFleet = [
            { type: "discus", top: "20%", speed: "30s", delay: "0s", direction: "left-to-right", scale: 0.85, opacity: 0.55 },
            { type: "pleco", bottom: "70px", speed: "35s", delay: "5s", direction: "right-to-left", scale: 0.8, opacity: 0.45 },
            { type: "tetra", top: "38%", speed: "20s", delay: "3s", direction: "left-to-right", scale: 0.5, opacity: 0.55 },
            { type: "tetra", top: "41%", speed: "22s", delay: "3.7s", direction: "left-to-right", scale: 0.45, opacity: 0.5 },
            { type: "tetra", top: "36%", speed: "21s", delay: "4.3s", direction: "left-to-right", scale: 0.48, opacity: 0.52 },
            { type: "betta", top: "60%", speed: "28s", delay: "12s", direction: "right-to-left", scale: 0.75, opacity: 0.5 }
        ];

        fishFleet.forEach(f => {
            const swimmer = document.createElement("div");
            swimmer.className = `tank-swimming-fish fish-${f.type} dir-${f.direction}`;
            if (f.top) swimmer.style.top = f.top;
            if (f.bottom) swimmer.style.bottom = f.bottom;
            swimmer.style.animationDuration = f.speed;
            swimmer.style.animationDelay = f.delay;
            swimmer.style.opacity = f.opacity;
            swimmer.style.setProperty("--scale", f.scale);

            swimmer.innerHTML = getFishSVG(f.type);
            fishLayer.appendChild(swimmer);
        });
        container.appendChild(fishLayer);

        // 4. Graceful Ribbon-Leaf Water Plants
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

    function getFishSVG(type) {
        if (type === "discus") {
            return `
                <svg viewBox="0 0 120 100" width="75" height="65">
                    <ellipse cx="55" cy="50" rx="45" ry="40" fill="#e65100"/>
                    <path d="M95,50 L115,30 L110,50 L115,70 Z" fill="#e65100"/>
                    <circle cx="30" cy="40" r="3.5" fill="#ffd54f"/>
                    <circle cx="30" cy="40" r="1.5" fill="#000000"/>
                </svg>
            `;
        } else if (type === "pleco") {
            return `
                <svg viewBox="0 0 130 50" width="85" height="35">
                    <path d="M15,25 C10,20 15,15 35,17 C65,19 95,22 110,25 C95,28 65,31 35,33 C15,35 10,30 15,25 Z" fill="#37474f"/>
                    <path d="M105,25 L125,12 L118,25 L125,38 Z" fill="#37474f"/>
                    <circle cx="28" cy="22" r="2.5" fill="#ffb300"/>
                </svg>
            `;
        } else if (type === "betta") {
            return `
                <svg viewBox="0 0 110 60" width="70" height="40">
                    <path d="M25,30 C40,22 65,25 80,30 C95,18 105,28 100,38 C90,48 75,34 65,34 C48,42 35,38 25,30 Z" fill="#5e35b1"/>
                    <circle cx="32" cy="28" r="2.5" fill="#ffffff"/>
                </svg>
            `;
        } else {
            return `
                <svg viewBox="0 0 60 24" width="45" height="18">
                    <path d="M8,12 C18,6 38,7 46,12 L56,6 L53,12 L56,18 L46,12 C38,17 18,18 8,12 Z" fill="#0277bd"/>
                    <line x1="16" y1="10" x2="40" y2="10" stroke="#00e5ff" stroke-width="2"/>
                    <circle cx="14" cy="11" r="1.5" fill="#ffffff"/>
                </svg>
            `;
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAquariumTank);
    } else {
        initAquariumTank();
    }
})();
