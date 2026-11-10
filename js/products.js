/*
 * Ancistrus Land Canada - Product Catalogue
 * Prices are in Canadian Dollars (CAD)
 */
const ANCISTRUS_CATEGORIES = {
    invertebrate: [
        { slug: "caridina-shrimp", name: "Caridina Shrimp" },
        { slug: "neocaridina-shrimp", name: "Neocaridina Shrimp" },
        { slug: "other-Livestock", name: "Other Livestock" },
        { slug: "green-water-farm", name: "Green Water Farm" }
    ],
    fish: [
        { slug: "catfish", name: "Catfish & Ancistrus Plecos" },
        { slug: "discus", name: "Discus" },
        { slug: "angel", name: "Angel" },
        { slug: "corydoras", name: "Corydoras" },
        { slug: "bettasp", name: "Betta SP" },
        { slug: "cichlids", name: "Cichlids" },
        { slug: "danio", name: "Danio" },
        { slug: "goby", name: "Goby" },
        { slug: "gourami", name: "Gourami" },
        { slug: "killifish", name: "Killifish" },
        { slug: "livebearer", name: "Livebearer" },
        { slug: "loach", name: "Loach" },
        { slug: "rainbowssp", name: "Rainbows SP" },
        { slug: "rarefinds", name: "Rare Finds" },
        { slug: "rasborasp", name: "Rasbora SP" },
        { slug: "ricefish", name: "Ricefish" },
        { slug: "tetrasp", name: "Tetra Sp" }
    ],
    "dry-goods": [
        { slug: "aquarium-accessories", name: "Aquarium Accessories" }
    ],
    plants: [
        { slug: "aquatic-plants", name: "Aquatic Plants" }
    ]
};

const ANCISTRUS_PRODUCTS = [
    /* --- NEW ANCESTRUS PLECO BREED STOCK (Direct Store Stock) --- */
    {
        id: "P-015",
        name: "Common Bristlenose Pleco (Ancistrus sp.) - Juvenile",
        category: "fish",
        subcategory: "catfish",
        price: 14.99,
        image: "img/catalog/ancistrus-stock-1.jpg",
        detailUrl: "shop-detail.html?id=P-015",
        available: true,
        description: "Hardy captive-bred common Bristlenose Pleco. Excellent, gentle community tank algae grazer. Fully acclimated to Canadian tap water."
    },
    {
        id: "P-016",
        name: "Calico Bristlenose Pleco (Ancistrus sp.)",
        category: "fish",
        subcategory: "catfish",
        price: 26.99,
        image: "img/catalog/ancistrus-stock-2.jpg",
        detailUrl: "shop-detail.html?id=P-016",
        available: true,
        description: "Eye-catching marbled orange, brown, and black calico patterning. Active bottom dweller that thrives on driftwood and vegetable wafers."
    },
    {
        id: "P-017",
        name: "White Seam / Starry Night Ancistrus (L183 / Starlight)",
        category: "fish",
        subcategory: "catfish",
        price: 39.99,
        image: "img/catalog/ancistrus-stock-3.jpg",
        detailUrl: "shop-detail.html?id=P-017",
        available: true,
        description: "Deep jet-black body covered in tiny white starlight spots with a crisp white margin on the dorsal and caudal fin. Exceptional show specimen."
    },
    {
        id: "P-018",
        name: "Brown Marbled Bristlenose Pleco - Adult Male",
        category: "fish",
        subcategory: "catfish",
        price: 34.99,
        image: "img/catalog/ancistrus-stock-4.jpg",
        detailUrl: "shop-detail.html?id=P-018",
        available: true,
        description: "Mature adult male showing developed facial bristles (tentacles). Proven breeder lineage, peaceful temperament."
    },
    {
        id: "P-019",
        name: "Super Red Longfin Bristlenose Pleco",
        category: "fish",
        subcategory: "catfish",
        price: 49.99,
        image: "img/catalog/ancistrus-stock-5.jpg",
        detailUrl: "shop-detail.html?id=P-019",
        available: true,
        description: "Flowing veil fins with deep velvet-red coloration. High grade lineage bred in our Ottawa breeding station."
    },
    {
        id: "P-020",
        name: "Green Dragon Bristlenose Pleco",
        category: "fish",
        subcategory: "catfish",
        price: 32.99,
        image: "img/catalog/ancistrus-stock-6.jpg",
        detailUrl: "shop-detail.html?id=P-020",
        available: true,
        description: "Solid olive-slate hue with no spotting. Rare, sleek coloration that stands out in lush planted aquascapes."
    },
    {
        id: "P-021",
        name: "Albino Bristlenose Pleco (L144 Lemon / Albino)",
        category: "fish",
        subcategory: "catfish",
        price: 18.99,
        image: "img/catalog/ancistrus-stock-7.jpg",
        detailUrl: "shop-detail.html?id=P-021",
        available: true,
        description: "Bright golden-yellow coloration. Active cleaner that stays compact (max 4-5 inches) and will not harm live plants."
    },
    {
        id: "P-022",
        name: "Spotted Bristlenose Pleco (Ancistrus cirrhosus)",
        category: "fish",
        subcategory: "catfish",
        price: 16.99,
        image: "img/catalog/ancistrus-stock-8.jpg",
        detailUrl: "shop-detail.html?id=P-022",
        available: true,
        description: "Fine honeycomb spot pattern across dark armor plating. Great for planted and hardscape tanks."
    },
    {
        id: "P-023",
        name: "Breeder Pair - Bristlenose Plecos (1 Male + 1 Female)",
        category: "fish",
        subcategory: "catfish",
        price: 54.99,
        image: "img/catalog/ancistrus-stock-9.jpg",
        detailUrl: "shop-detail.html?id=P-023",
        available: true,
        description: "Selected bonded breeding pair. Ready to spawn in standard terracotta or ceramic breeding caves."
    },

    /* --- DISCUS, SHRIMPS, BETTAS & COMMUNITY SPECIES --- */
    {
        id: "P-001",
        name: "Caridina Shrimp (Pure Red Line)",
        category: "invertebrate",
        subcategory: "caridina-shrimp",
        price: 12.99,
        image: "img/shrimp-1.jpg",
        detailUrl: "shop-detail.html?id=P-001",
        available: true,
        description: "High-grade Caridina shrimp bred in soft, mineral-balanced water. Active, healthy, and vivid red coloration."
    },
    {
        id: "P-002",
        name: "Mystery Snail (Gold / Ivory)",
        category: "invertebrate",
        subcategory: "other-Livestock",
        price: 5.49,
        image: "img/snail-1.jpg",
        detailUrl: "shop-detail.html?id=P-002",
        available: true,
        description: "Peaceful algae-eating community snail that thrives in planted aquariums."
    },
    {
        id: "P-003",
        name: "Red Melon Discus",
        category: "fish",
        subcategory: "discus",
        price: 79.99,
        image: "img/Red_melon.jpg",
        detailUrl: "shop-detail.html?id=P-003",
        available: true,
        description: "Spectacular solid-red Discus specimen. Quarantine certified, feeding vigorously on frozen and high-protein pellets."
    },
    {
        id: "P-004",
        name: "Yellow Lemon Discus",
        category: "fish",
        subcategory: "discus",
        price: 74.99,
        image: "img/Yellow_lemon.jpg",
        detailUrl: "shop-detail.html?id=P-004",
        available: true,
        description: "Striking bright yellow Discus with vibrant red eyes. Fully acclimated to Canadian domestic tap conditions."
    },
    {
        id: "P-005",
        name: "Blue Diamond Discus",
        category: "fish",
        subcategory: "discus",
        price: 84.99,
        image: "img/Blue_diamond.jpg",
        detailUrl: "shop-detail.html?id=P-005",
        available: true,
        description: "Vibrant solid metallic blue Discus with unmatched symmetry and finnage."
    },
    {
        id: "P-006",
        name: "Platinum White Discus",
        category: "fish",
        subcategory: "discus",
        price: 89.99,
        image: "img/Platinum.jpg",
        detailUrl: "shop-detail.html?id=P-006",
        available: true,
        description: "Rare pure white specimen with radiant pearl iridescence."
    },
    {
        id: "P-007",
        name: "Plakat Black Samurai Betta",
        category: "fish",
        subcategory: "bettasp",
        price: 29.99,
        image: "img/Plakat_Blk_DragonBlk_Samurai.jpg",
        detailUrl: "shop-detail.html?id=P-007",
        available: true,
        description: "Stunning metallic dragon armor contrast over deep matte black body."
    },
    {
        id: "P-008",
        name: "Plakat Nemo Copper Betta",
        category: "fish",
        subcategory: "bettasp",
        price: 34.99,
        image: "img/Plakat_Nemo_Copper.jpg",
        detailUrl: "shop-detail.html?id=P-008",
        available: true,
        description: "Multi-colour Koi/Nemo pattern with metallic copper scales."
    },
    {
        id: "P-009",
        name: "Plakat Red Dragon Betta",
        category: "fish",
        subcategory: "bettasp",
        price: 27.99,
        image: "img/Plakat_Red_Dragon.jpg",
        detailUrl: "shop-detail.html?id=P-009",
        available: true,
        description: "Intense red body with brilliant silver-white dragon scaling."
    },
    {
        id: "P-010",
        name: "Sunshine Golden Ram (Mikrogeophagus ramirezi)",
        category: "fish",
        subcategory: "cichlids",
        price: 18.99,
        image: "img/Sunshine_golden_ram.jpg",
        detailUrl: "shop-detail.html?id=P-010",
        available: true,
        description: "Peaceful dwarf cichlid featuring radiant gold-yellow tones and iridescent blue highlights."
    },
    {
        id: "P-011",
        name: "Plakat Multi-Color Dumbo Ear Betta",
        category: "fish",
        subcategory: "bettasp",
        price: 32.99,
        image: "img/Plakat_Multi_color_Dumbo_Ear.jpg",
        detailUrl: "shop-detail.html?id=P-011",
        available: true,
        description: "Extra large pectoral fins with vivid kaleidoscopic coloration."
    },
    {
        id: "P-012",
        name: "Sterbai Corydoras",
        category: "fish",
        subcategory: "corydoras",
        price: 11.99,
        image: "img/Fish 1.jpg",
        detailUrl: "shop-detail.html?id=P-012",
        available: true,
        description: "High temperature-tolerant catfish with spotted head and vibrant orange pectoral fins. Ideal Discus tank-mate."
    },
    {
        id: "P-013",
        name: "Super Red Bristlenose Pleco (Ancistrus)",
        category: "fish",
        subcategory: "catfish",
        price: 24.99,
        image: "img/catalog/ancistrus-stock-5.jpg",
        detailUrl: "shop-detail.html?id=P-013",
        available: true,
        description: "Our signature captive-bred Ancistrus pleco. Unmatched algae cleaner with rich velvet red coloration."
    },
    {
        id: "P-014",
        name: "Cardinal Tetra (School of 6)",
        category: "fish",
        subcategory: "tetrasp",
        price: 21.99,
        image: "img/Fish 1.jpg",
        detailUrl: "shop-detail.html?id=P-014",
        available: true,
        description: "Vibrant neon-blue and full-body red schooling fish. Fully quarantined and acclimated."
    }
];

if (typeof module !== "undefined") {
    module.exports = { ANCISTRUS_CATEGORIES, ANCISTRUS_PRODUCTS };
}

if (typeof window !== "undefined") {
    window.ANCISTRUS_CATEGORIES = ANCISTRUS_CATEGORIES;
    window.ANCISTRUS_PRODUCTS = ANCISTRUS_PRODUCTS;
}
