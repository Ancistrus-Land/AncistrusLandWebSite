/*
 * Ancistrus Land product catalogue
 * Edit this one file to add, update, remove, or reorder products.
 * Keep assigned IDs stable; use the next unused P-### ID for new products.
 * Each detailUrl must use the same ID as its product.
 */
const ANCISTRUS_CATEGORIES = {
    invertebrate: [
        { slug: "caridina-shrimp", name: "Caridina Shrimp" },
        { slug: "neocaridina-shrimp", name: "Neocaridina Shrimp" },
        { slug: "other-Livestock", name: "Other Livestock" },
        { slug: "green-water-farm", name: "Green Water Farm" }
    ],
    fish: [
        { slug: "discus", name: "Discus" },
        { slug: "angel", name: "Angel" },
        { slug: "corydoras", name: "Corydoras" },
        { slug: "bettasp", name: "Betta SP" },
        { slug: "catfish", name: "Catfish" },
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
        { slug: "tetrasp", name: "Tetra Sp" },
        
    ],
    "dry-goods": [],
    plants: []
    
};

const ANCISTRUS_PRODUCTS = [
    {
        id: "P-001",
        name: "Cherry Shrimp",
        category: "invertebrate",
        subcategory: "neocaridina-shrimp",
        price: 250,
        image: "img/shrimp-1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-001",
        available: true,
        bestseller: true
    },
    {
        id: "P-002",
        name: "Nerite Snail",
        category: "invertebrate",
        subcategory: "nerite-snails",
        price: 300,
        image: "img/snail-1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-002",
        available: true,
        bestseller: true
    },
    {
        id: "P-003",
        name: "Red melon",
        category: "fish",
        subcategory: "discus",
        price: 750,
        image: "img/Red_melon.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-003",
        available: true,
        bestseller: true
    },
    {
        id: "P-004",
        name: "Red panda",
        category: "fish",
        subcategory: "discus",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-004",
        available: true,
        bestseller: true
    },
    {
        id: "P-005",
        name: "Pigeon blood",
        category: "fish",
        subcategory: "discus",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-005",
        available: true
    },
    {
        id: "P-006",
        name: "Red turquoise",
        category: "fish",
        subcategory: "discus",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-006",
        available: true,
        bestseller: true
    },
    {
        id: "P-007",
        name: "Yellow panda",
        category: "fish",
        subcategory: "discus",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-007",
        available: true
    },
    {
        id: "P-008",
        name: "Yellow lemon",
        category: "fish",
        subcategory: "discus",
        price: 750,
        image: "img/Yellow_lemon.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-008",
        available: true,
        bestseller: true
    },
    {
        id: "P-009",
        name: "Yellow pigeon",
        category: "fish",
        subcategory: "discus",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-009",
        available: true
    },
    {
        id: "P-010",
        name: "Blue diamond",
        category: "fish",
        subcategory: "discus",
        price: 750,
        image: "img/Blue_diamond.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-010",
        available: true,
        bestseller: true
    },
    {
        id: "P-011",
        name: "Platinum",
        category: "fish",
        subcategory: "discus",
        price: 750,
        image: "img/Platinum.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-011",
        available: true,
        bestseller: true
    },
    {
        id: "P-012",
        name: "Black",
        category: "fish",
        subcategory: "angel",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-012",
        available: true
    },
    {
        id: "P-013",
        name: "Black marble",
        category: "fish",
        subcategory: "angel",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-013",
        available: true,
        bestseller: true
    },
    {
        id: "P-014",
        name: "Platinum",
        category: "fish",
        subcategory: "angel",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-014",
        available: true,
        bestseller: true
    },
    {
        id: "P-015",
        name: "Gold",
        category: "fish",
        subcategory: "angel",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-015",
        available: true
    },
    {
        id: "P-016",
        name: "Red devil",
        category: "fish",
        subcategory: "angel",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-016",
        available: true
    },
    {
        id: "P-017",
        name: "Green avatar",
        category: "fish",
        subcategory: "angel",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-017",
        available: true
    },
    {
        id: "P-018",
        name: "Blue avatar",
        category: "fish",
        subcategory: "angel",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-018",
        available: true
    },
    {
        id: "P-019",
        name: "Blue Lepord skin",
        category: "fish",
        subcategory: "angel",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-019",
        available: true
    },
    {
        id: "P-020",
        name: "Panda",
        category: "fish",
        subcategory: "corydoras",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-020",
        available: true
    },
    {
        id: "P-021",
        name: "Sterbai",
        category: "fish",
        subcategory: "corydoras",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-021",
        available: true
    },
    {
        id: "P-022",
        name: "Julii",
        category: "fish",
        subcategory: "corydoras",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-022",
        available: true
    },
    {
        id: "P-023",
        name: "Adolfoi",
        category: "fish",
        subcategory: "corydoras",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-023",
        available: true
    },
    {
        id: "P-024",
        name: "Barbatus",
        category: "fish",
        subcategory: "corydoras",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-024",
        available: true
    },
    {
        id: "P-025",
        name: "Red laser",
        category: "fish",
        subcategory: "corydoras",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-025",
        available: true
    },
    {
        id: "P-026",
        name: "Similis",
        category: "fish",
        subcategory: "corydoras",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-026",
        available: true
    },
    {
        id: "P-027",
        name: "Venezuelan black",
        category: "fish",
        subcategory: "corydoras",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-027",
        available: true
    },
    {
        id: "P-028",
        name: "Venezuelan orange",
        category: "fish",
        subcategory: "corydoras",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-028",
        available: true
    },
    {
        id: "P-029",
        name: "Gold laser",
        category: "fish",
        subcategory: "corydoras",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-029",
        available: true
    },
    {
        id: "P-030",
        name: "Green laser",
        category: "fish",
        subcategory: "corydoras",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-030",
        available: true
    },
    {
        id: "P-031",
        name: "Albino Sterbai",
        category: "fish",
        subcategory: "corydoras",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-031",
        available: true
    },
    {
        id: "P-032",
        name: "CW005 Albertini",
        category: "fish",
        subcategory: "corydoras",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-032",
        available: true
    },
    {
        id: "P-033",
        name: "CW217 Concolor",
        category: "fish",
        subcategory: "corydoras",
        price: 750,
        image: "img/Fish 1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-033",
        available: true
    },
    {
        id: "P-034",
        name: "Plakat Blk DragonBlk Samurai",
        category: "fish",
        subcategory: "corydoras",
        price: 750,
        image: "img/Plakat_Blk_DragonBlk_Samurai.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-034",
        available: true
    },
    {
        id: "P-035",
        name: "Plakat Nemo Copper",
        category: "fish",
        subcategory: "corydoras",
        price: 750,
        image: "img/Plakat_Nemo_Copper.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-035",
        available: true
    },
    {
        id: "P-036",
        name: "Plakat Red Dragon",
        category: "fish",
        subcategory: "corydoras",
        price: 750,
        image: "img/Plakat_Red_Dragon.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-036",
        available: true
    },
    {
        id: "P-037",
        name: "Sunshine golden ram",
        category: "fish",
        subcategory: "corydoras",
        price: 750,
        image: "img/Sunshine_golden_ram.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-037",
        available: true
    },
    {
        id: "P-038",
        name: "Plakat Multi color Dumbo Ear",
        category: "fish",
        subcategory: "corydoras",
        price: 750,
        image: "img/Plakat_Multi_color_Dumbo_Ear.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        detailUrl: "shop-detail.html?id=P-038",
        available: true
    },

];

(function () {
    "use strict";

    const categoryLabels = {
        invertebrate: "Invertebrate",
        fish: "Fish",
        "dry-goods": "Dry Goods",
        plants: "Plants"
    };

    function escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function formatPrice(price) {
        return `Rs. ${Number(price).toLocaleString("en-LK")}`;
    }

    function productCard(product) {
        const stockText = product.available ? "View Product" : "Out of Stock";
        const disabledClass = product.available ? "" : " disabled opacity-50";
        const link = product.available ? product.detailUrl : "#";

        return `
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="rounded position-relative fruite-item h-100">
                    <div class="fruite-img">
                        <img src="${escapeHtml(product.image)}"
                             class="img-fluid w-100 h-100 rounded-top"
                             alt="${escapeHtml(product.name)}"
                             onerror="this.src='img/Fish 1.jpg'">
                    </div>
                    <div class="text-white bg-secondary px-3 py-1 rounded position-absolute"
                         style="top:10px;left:10px;">
                        ${escapeHtml(categoryLabels[product.category] || product.category)}
                    </div>
                    <div class="p-4 border border-secondary border-top-0 rounded-bottom h-100">
                        <h4>${escapeHtml(product.name)}</h4>
                        <p style="
                            overflow-wrap: anywhere;
                            word-break: break-word;
                            display: -webkit-box;
                            -webkit-line-clamp: 3;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                        ">
                             ${escapeHtml(product.description)}
                        </p>
                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                            <p class="text-dark fs-5 fw-bold mb-0">${formatPrice(product.price)}</p>
                            <a href="${escapeHtml(link)}"
                               class="btn border border-secondary rounded-pill px-3 text-primary${disabledClass}"
                               ${product.available ? "" : 'aria-disabled="true"'}>
                                ${stockText}
                            </a>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    function emptyMessage(label) {
        return `
            <div class="col-12">
                <div class="text-center bg-light rounded p-5">
                    <i class="fas fa-fish fa-3x text-primary mb-3"></i>
                    <h4>No ${escapeHtml(label)} products added yet</h4>
                    <p class="mb-0">Products will appear here after they are added to ANCISTRUS_PRODUCTS.</p>
                </div>
            </div>`;
    }

    function renderProducts(container, products, emptyLabel) {
        if (!container) return;
        container.innerHTML = products.length
            ? [...products]
                .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }))
                .map(productCard).join("")
            : emptyMessage(emptyLabel);
    }

    function migrateCartProductIds() {
        const cartKey = "ancistrus_cart";

        try {
            const cart = JSON.parse(localStorage.getItem(cartKey));
            if (!Array.isArray(cart)) return;

            let changed = false;
            const migrated = cart.map(item => {
                const oldId = String(item?.id ?? "");
                if (!/^\d+$/.test(oldId)) return item;

                const id = `P-${String(Number(oldId)).padStart(3, "0")}`;
                if (!ANCISTRUS_PRODUCTS.some(product => product.id === id)) return item;

                changed = true;
                return { ...item, id };
            });

            if (changed) localStorage.setItem(cartKey, JSON.stringify(migrated));
        } catch (error) {
            // The catalogue must still load when browser storage is unavailable.
        }
    }

    function renderAllProducts() {
        renderProducts(
            document.getElementById("products-all"),
            ANCISTRUS_PRODUCTS,
            "available"
        );
    }

    function renderCategory(category) {
        const nav = document.getElementById(`${category}-subcategory-nav`);
        const grid = document.getElementById(`${category}-products`);
        if (!nav || !grid) return;

        const subcategories = [...(ANCISTRUS_CATEGORIES[category] || [])]
    .sort((a, b) => a.name.localeCompare(b.name, "en", {
        sensitivity: "base"
    }));

            if (subcategories.length === 0) {
                nav.style.display = "none";
            } else {
              nav.style.display = "";
            }

        nav.innerHTML = [
            `<button type="button" class="btn btn-primary rounded-pill category-filter active" data-subcategory="all">All ${escapeHtml(categoryLabels[category] || category)}</button>`,
            ...subcategories.map(item =>
                `<button type="button" class="btn btn-light rounded-pill category-filter" data-subcategory="${escapeHtml(item.slug)}">${escapeHtml(item.name)}</button>`
            )
        ].join("");

        const categoryProducts = ANCISTRUS_PRODUCTS.filter(product => product.category === category);
        renderProducts(grid, categoryProducts, categoryLabels[category] || category);

        nav.addEventListener("click", function (event) {
            const button = event.target.closest(".category-filter");
            if (!button) return;

            nav.querySelectorAll(".category-filter").forEach(item => {
                item.classList.remove("btn-primary", "active");
                item.classList.add("btn-light");
            });
            button.classList.remove("btn-light");
            button.classList.add("btn-primary", "active");

            const selected = button.dataset.subcategory;
            const filtered = selected === "all"
                ? categoryProducts
                : categoryProducts.filter(product => product.subcategory === selected);

            const subcategoryName = subcategories.find(item => item.slug === selected)?.name
                || categoryLabels[category]
                || category;
            renderProducts(grid, filtered, subcategoryName);
        });
    }

    function openRequestedCategoryFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const category = params.get("category");
        const subcategory = params.get("subcategory");

        if (!category || !Object.prototype.hasOwnProperty.call(ANCISTRUS_CATEGORIES, category)) {
            return;
        }

        const tabMap = {
            invertebrate: "#tab-2",
            fish: "#tab-3",
            "dry-goods": "#tab-4",
            plants: "#tab-5"
        };

        const targetTab = tabMap[category];

        if (targetTab) {
            const tabTrigger = document.querySelector(
                `[data-bs-toggle="pill"][href="${targetTab}"], [data-bs-toggle="tab"][href="${targetTab}"]`
            );

            if (tabTrigger) {
                if (window.bootstrap && bootstrap.Tab) {
                    bootstrap.Tab.getOrCreateInstance(tabTrigger).show();
                } else {
                    document.querySelectorAll(".tab-pane").forEach(pane => {
                        pane.classList.remove("show", "active");
                    });
                    document.querySelectorAll('[data-bs-toggle="pill"], [data-bs-toggle="tab"]').forEach(link => {
                        link.classList.remove("active");
                        link.setAttribute("aria-selected", "false");
                    });

                    const pane = document.querySelector(targetTab);
                    if (pane) pane.classList.add("show", "active");
                    tabTrigger.classList.add("active");
                    tabTrigger.setAttribute("aria-selected", "true");
                }
            }
        }

        if (!subcategory) return;

        const nav = document.getElementById(`${category}-subcategory-nav`);
        if (!nav) return;

        const wantedButton = Array.from(
            nav.querySelectorAll(".category-filter")
        ).find(button => button.dataset.subcategory === subcategory);

        if (wantedButton) {
            wantedButton.click();
        }
    }

    migrateCartProductIds();

    document.addEventListener("DOMContentLoaded", function () {
        renderAllProducts();
        Object.keys(ANCISTRUS_CATEGORIES).forEach(renderCategory);

        // Header links use:
        // shop.html?category=fish&subcategory=discus
        // This opens the correct main category tab and then selects
        // the requested subcategory automatically.
        openRequestedCategoryFromUrl();
    });
})();
