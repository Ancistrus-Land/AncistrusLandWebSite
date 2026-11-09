/**
 * Ancistrus Land Canada - Aquarium Ambience Engine
 * Generates rising air bubbles, animated aquatic plants, and swimming fish.
 * Pure CSS animations + lightweight DOM layering with zero performance lag.
 */

(function () {
    "use strict";

    function initAquariumTank() {
        // Prevent duplicate creation
        if (document.getElementById("aquarium-tank-container")) return;

        // Container covers whole viewport fixed behind content
        const container = document.createElement("div");
        container.id = "aquarium-tank-container";
        container.setAttribute("aria-hidden", "true");

        // 1. Water Caustic Light Shimmer Layer
        const waterLight = document.createElement("div");
        waterLight.className = "tank-water-shimmer";
        container.appendChild(waterLight);

        // 2. Rising Bubbles Layer
        const bubblesLayer = document.createElement("div");
        bubblesLayer.className = "tank-bubbles-layer";
        // Create 20 natural floating bubbles with randomized drift and speeds
        for (let i = 0; i < 22; i++) {
            const bubble = document.createElement("div");
            bubble.className = "tank-bubble";
            const size = Math.floor(Math.random() * 16) + 8; // 8px to 24px
            const left = Math.random() * 98; // 0% to 98%
            const duration = (Math.random() * 8 + 7).toFixed(1); // 7s to 15s
            const delay = (Math.random() * 10).toFixed(1); // 0s to 10s
            const drift = (Math.random() * 40 - 20).toFixed(0); // -20px to 20px wobble

            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${left}%`;
            bubble.style.animationDuration = `${duration}s`;
            bubble.style.animationDelay = `${delay}s`;
            bubble.style.setProperty("--drift", `${drift}px`);

            bubblesLayer.appendChild(bubble);
        }
        container.appendChild(bubblesLayer);

        // 3. Swimming Fish Layer (Subtle, gentle silhouettes swimming across depth planes)
        const fishLayer = document.createElement("div");
        fishLayer.className = "tank-fish-layer";

        // Species types: pleco, discus, betta, tetra
        const fishFleet = [
            { type: "discus", top: "18%", speed: "26s", delay: "0s", direction: "left-to-right", scale: 0.9, opacity: 0.65 },
            { type: "pleco", bottom: "8%", speed: "32s", delay: "4s", direction: "right-to-left", scale: 0.85, opacity: 0.5 },
            { type: "tetra", top: "42%", speed: "18s", delay: "2s", direction: "left-to-right", scale: 0.5, opacity: 0.6 },
            { type: "tetra", top: "45%", speed: "20s", delay: "2.8s", direction: "left-to-right", scale: 0.45, opacity: 0.5 },
            { type: "tetra", top: "40%", speed: "19s", delay: "3.5s", direction: "left-to-right", scale: 0.48, opacity: 0.55 },
            { type: "betta", top: "65%", speed: "28s", delay: "10s", direction: "right-to-left", scale: 0.8, opacity: 0.6 }
        ];

        fishFleet.forEach(f => {
            const swimmer = document.createElement("div");
            swimmer.className = `tank-swimming-fish fish-${f.type} dir-${f.direction}`;
            if (f.top) swimmer.style.top = f.top;
            if (f.bottom) swimmer.style.bottom = f.bottom;
            swimmer.style.animationDuration = f.speed;
            swimmer.style.animationDelay = f.delay;
            swimmer.style.opacity = f.opacity;
            swimmer.style.transform = `scale(${f.scale})`;

            // SVG fish silhouette for smooth vector rendering
            swimmer.innerHTML = getFishSVG(f.type);
            fishLayer.appendChild(swimmer);
        });
        container.appendChild(fishLayer);

        // 4. Swaying Water Plants at the Bottom
        const plantsLayer = document.createElement("div");
        plantsLayer.className = "tank-plants-layer";
        plantsLayer.innerHTML = `
            <div class="tank-plant plant-left">
                <svg viewBox="0 0 120 300" preserveAspectRatio="none">
                    <path class="plant-stem stem-1" d="M30,300 Q20,200 45,130 T35,0" />
                    <path class="plant-stem stem-2" d="M60,300 Q80,210 50,140 T70,20" />
                    <path class="plant-stem stem-3" d="M90,300 Q70,230 95,160 T85,40" />
                </svg>
            </div>
            <div class="tank-plant plant-right">
                <svg viewBox="0 0 140 320" preserveAspectRatio="none">
                    <path class="plant-stem stem-1" d="M40,320 Q20,220 50,150 T30,10" />
                    <path class="plant-stem stem-2" d="M80,320 Q110,230 75,160 T105,30" />
                    <path class="plant-stem stem-3" d="M110,320 Q90,240 120,170 T100,50" />
                </svg>
            </div>
        `;
        container.appendChild(plantsLayer);

        // Inject as first child of body so it stays in background behind everything
        document.body.prepend(container);
    }

    // High quality vector silhouettes of Discus, Pleco, Betta, Tetra
    function getFishSVG(type) {
        if (type === "discus") {
            return `
                <svg viewBox="0 0 140 130" width="90" height="85" fill="currentColor">
                    <!-- Discus round body with dorsal and anal fins -->
                    <path d="M70,10 C105,10 125,35 125,65 C125,95 105,120 70,120 C35,120 15,95 15,65 C15,35 35,10 70,10 Z" opacity="0.85"/>
                    <path d="M120,65 L140,40 L135,65 L140,90 Z" />
                    <path d="M50,60 Q65,65 50,70 Z" fill="#ffffff" opacity="0.3"/>
                    <circle cx="35" cy="50" r="4" fill="#ffdd66" opacity="0.9"/>
                    <circle cx="35" cy="50" r="2" fill="#000000"/>
                </svg>
            `;
        } else if (type === "pleco") {
            return `
                <svg viewBox="0 0 150 70" width="100" height="50" fill="currentColor">
                    <!-- Ancistrus Bristlenose pleco body with wide head and broad tail -->
                    <path d="M20,35 C10,30 5,35 15,40 C35,48 70,52 110,42 L145,55 L135,35 L145,15 L110,28 C70,18 35,22 15,30 Z"/>
                    <path d="M75,22 L90,5 L85,24 Z"/>
                    <circle cx="30" cy="30" r="3" fill="#ffaa33" opacity="0.9"/>
                </svg>
            `;
        } else if (type === "betta") {
            return `
                <svg viewBox="0 0 130 80" width="85" height="55" fill="currentColor">
                    <!-- Flowing betta fins -->
                    <path d="M30,40 C45,30 75,35 95,40 C115,20 130,35 125,50 C115,65 95,45 85,45 C65,55 45,50 30,40 Z"/>
                    <path d="M65,33 Q85,10 105,15 Q80,25 75,33 Z" opacity="0.7"/>
                    <circle cx="40" cy="38" r="3" fill="#ffffff" opacity="0.8"/>
                </svg>
            `;
        } else {
            // Neon / Cardinal Tetra
            return `
                <svg viewBox="0 0 70 30" width="50" height="22" fill="currentColor">
                    <path d="M10,15 C20,8 45,9 55,15 L68,7 L64,15 L68,23 L55,15 C45,21 20,22 10,15 Z"/>
                    <line x1="20" y1="12" x2="48" y2="12" stroke="#00d4ff" stroke-width="2" opacity="0.8"/>
                    <circle cx="16" cy="13" r="2" fill="#ffffff"/>
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
