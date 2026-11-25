/**
 * Ancistrus Land Canada - Live Product Catalog
 * Official store inventory featuring our specialty captive-bred & wild specimens.
 */

export const ANCISTRUS_PRODUCTS = [
    {
        id: "fish-ram-01",
        name: "Super Red Golden Ram",
        category: "fish",
        subcategory: "cichlids",
        price: 24.99,
        image: "img/catalog/super-red-ram.jpg",
        available: true,
        description: "Captive-bred vibrant dwarf cichlid showcasing intense fiery orange-red body coloration with shimmering blue-violet iridescent spangles on the dorsal, anal, and caudal fins. Gentle temperament, ideal for peaceful planted aquariums (Temp: 26-29°C, pH: 5.8-6.8).",
        detailUrl: "shop-detail.html?id=fish-ram-01"
    },
    {
        id: "fish-discus-01",
        name: "Solid Red Melon Discus",
        category: "fish",
        subcategory: "discus",
        price: 69.99,
        image: "img/catalog/red-melon-discus.jpg",
        available: true,
        description: "High-grade round saucer form Discus featuring an unblemished, saturated solid scarlet-red torso with a striking contrasting cream-yellow face and bright ruby-red iris. Conditioned on premium beefheart and high-protein live feed (Temp: 28-30°C, pH: 6.0-6.8).",
        detailUrl: "shop-detail.html?id=fish-discus-01"
    },
    {
        id: "fish-discus-02",
        name: "Checkerboard Turquoise Discus",
        category: "fish",
        subcategory: "discus",
        price: 59.99,
        image: "img/catalog/checkerboard-discus.jpg",
        available: true,
        description: "Intricately patterned captive-bred Discus displaying interwoven metallic turquoise lines across an amber-brick red canvas, forming an ornate checkerboard lattice across both flanks. Peaceful shoaling cichlid for mature warm-water setups.",
        detailUrl: "shop-detail.html?id=fish-discus-02"
    },
    {
        id: "fish-discus-03",
        name: "Pigeon Blood Leopard Discus",
        category: "fish",
        subcategory: "discus",
        price: 64.99,
        image: "img/catalog/pigeon-leopard-discus.jpg",
        available: true,
        description: "Spectacular showpiece Discus featuring bright honey-amber body color covered in fine crimson leopard spots and striking face striations. High finnage with translucent amber pectoral fins.",
        detailUrl: "shop-detail.html?id=fish-discus-03"
    },
    {
        id: "fish-pleco-01",
        name: "Honeycomb Ancistrus Pleco",
        category: "fish",
        subcategory: "catfish",
        price: 34.99,
        image: "img/catalog/honeycomb-ancistrus.jpg",
        available: true,
        description: "Stunning juvenile Bristlenose Pleco exhibiting distinctive polygonal ivory-cream honeycomb plates outlined by bold dark chocolate margins. Exceptional, hardy algae grazer that stays compact (~10-12cm max adult size). Safe with live plants.",
        detailUrl: "shop-detail.html?id=fish-pleco-01"
    },
    {
        id: "fish-pleco-02",
        name: "Golden Nugget Pleco (L018)",
        category: "fish",
        subcategory: "catfish",
        price: 49.99,
        image: "img/catalog/golden-nugget-pleco.jpg",
        available: true,
        description: "Prime Amazonian specialty pleco (Baryancistrus xanthellus). Features a velvety deep olive-green body lavishly sprinkled with brilliant bright yellow polka dots and wide golden seams on the dorsal and caudal fins. Thrives in clean, oxygen-rich water with driftwood.",
        detailUrl: "shop-detail.html?id=fish-pleco-02"
    },
    {
        id: "fish-pencil-01",
        name: "Coral Red Pencilfish",
        category: "fish",
        subcategory: "tetrasp",
        price: 19.99,
        image: "img/catalog/coral-red-pencilfish.jpg",
        available: true,
        description: "One of the most intensely colored freshwater nano fish in the world (Nannostomus mortenthaleri). Males exhibit an electric glowing ruby-red body divided by two jet-black racing stripes with golden metallic highlights. Peaceful, active nano schooler for planted tanks.",
        detailUrl: "shop-detail.html?id=fish-pencil-01"
    },
    {
        id: "fish-betta-01",
        name: "Red Dragon Plakat Betta",
        category: "fish",
        subcategory: "bettasp",
        price: 29.99,
        image: "img/catalog/red-dragon-plakat-betta.jpg",
        available: true,
        description: "Exceptional short-fin Halfmoon Plakat (HMPK) Betta displaying heavy pearl-white metallic dragon armor across the skull and torso, contrasted against intense crimson fins bordered with crisp white cellophane ray tipping. Hardy, energetic centerpiece pet.",
        detailUrl: "shop-detail.html?id=fish-betta-01"
    }
];

// Fallback helper for environments without ES module imports
if (typeof window !== "undefined") {
    window.ANCISTRUS_PRODUCTS = ANCISTRUS_PRODUCTS;
}
