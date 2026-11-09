# Ancistrus Land Canada - Web E-Commerce Platform

```
========================================================================================
Project       : Ancistrus Land Canada - Web E-Commerce Platform
Classification: Commercial Proprietary Software
Location      : Ottawa, Ontario, Canada
Currency      : CAD ($)
Version       : 1.0.0 (Production-Ready)
Copyright     : (c) 2026 Ancistrus Land Canada. All Rights Reserved.
========================================================================================
```

Welcome to the official repository for **Ancistrus Land Canada**, a specialized online aquarium and livestock store based in Ottawa, Ontario, delivering exotic tropical fish, ornamental shrimp, live aquatic plants, and premium supplies across Canada.

This platform is engineered using modern **Clean Architecture** principles, featuring a decoupled Presentation Tier, Business Services Tier, and centralized Data Layer. It includes an on-site checkout engine with dual-channel store alerts (WhatsApp & Email) and an integrated administrative dashboard.

---

## 📚 Master Documentation Suite

All documents in this platform adhere to unified corporate styling and are cross-linked for seamless audit and store review:

| Document | Primary Audience | Purpose | Quick Link |
| :--- | :--- | :--- | :--- |
| **Requirements Specification (SRS & RTM)** | Store Owners / QA Team | Comprehensive requirements traceability and test verification procedures | [View Document &rarr;](docs/REQUIREMENTS_SPECIFICATION.md) |
| **Production Deployment & Pricing** | Store Owners / Finance | Executive cloud hosting comparison and $0.00/month recurring cost analysis | [View Document &rarr;](docs/DEPLOYMENT_STRATEGY.md) |
| **Commercial License Agreement** | Legal / Store Operations | Proprietary commercial licensing terms and trademark protection | [View Document &rarr;](LICENSE) |
| **Repository Manual** *(This File)* | Developers / Technical Staff | Platform architecture, code structure, and local execution manual | [View Document &rarr;](#-architecture-overview) |

---

## 🏛 Architecture Overview

The application follows strict **Clean Multi-Tier Architecture** principles with clear separation of concerns across three distinct layers:

```
+-------------------------------------------------------------------------+
|                          1. PRESENTATION TIER                           |
|  - Semantic HTML5 Pages (index, shop, shop-detail, cart, checkout)     |
|  - Reusable Component Templates: includes/header.html, footer.html       |
|  - Layout Engine: js/layout.js (ES6 Module Loader)                      |
|  - Styling: css/bootstrap.min.css & css/style.css                       |
+-------------------------------------------------------------------------+
                                    │
                                    ▼
+-------------------------------------------------------------------------+
|                      2. BUSINESS SERVICES LAYER                         |
|  - CatalogService: Query, filter, stock validation, and overrides       |
|  - CartService: State management, item manipulation, and badge events   |
|  - OrderService: Order creation, receipt generation, invoice formatting |
|  - Event-Driven Pub/Sub: 'cart:updated', 'catalog:updated'              |
+-------------------------------------------------------------------------+
                                    │
                                    ▼
+-------------------------------------------------------------------------+
|                     3. DATA & CONFIGURATION LAYER                       |
|  - js/config.js: Centralized Single Source of Truth                     |
|  - js/products.js: Master product schema & default seed inventory      |
|  - Storage Engine: LocalStorage with Cloud Database (Firebase) adapter  |
+-------------------------------------------------------------------------+
```

---

## ✨ Core Platform Capabilities

* **Canadian Market Specialization**:
  * Native **CAD ($)** pricing and tax/shipping logic.
  * Integration with all **10 Canadian Provinces & 3 Territories**.
  * Payment options: **Interac e-Transfer** (0% platform fee), **Credit / Debit Card** invoice link, and **Local Ottawa Pickup / COD**.
  * Specialized **Winter Sub-Zero Shipping Policy** (1.5" molded EPS insulated boxes, 72-hour Uniheat packs, medical pure oxygen).
  * **100% Live Arrival Guarantee (LAG)** policy with a strict 2-hour reporting protocol.

* **Dual-Channel Store Notification Engine**:
  * **1-Click WhatsApp Dispatch Notification**: Formats an itemized order summary, delivery address, and contact info ready to send to the store's dispatch phone (`+1 613 266 5285`).
  * **Direct Email Invoice Notification**: Automatically compiles an invoice addressed directly to the store management inbox (`sudarsha.wijenayake@gmail.com`).

* **Administrative Dashboard (`/admin.html`)**:
  * PIN-protected store management (`1234`).
  * Live stock toggles (**In Stock** vs. **Out of Stock**).
  * 1-click **Add, Edit, and Delete** products.
  * Customer order history ledger.
  * 1-click **Export Catalog** to permanently back up changes to `products.js`.

---

## 📁 Repository Structure

```
AncistrusLandWebSite/
├── css/
│   ├── bootstrap.min.css         # Bootstrap 5 responsive framework
│   └── style.css                 # Custom store styling, headers, and color themes
├── js/
│   ├── config.js                 # Global Single Source of Truth (Brand, Contacts, CAD)
│   ├── services.js               # Domain services (CatalogService, CartService, OrderService)
│   ├── layout.js                 # Modular header/footer injector and event listeners
│   ├── products.js               # Master catalog schema and seed inventory
│   └── main.js                   # Interactive UI behaviors (scrolls, carousels)
├── includes/
│   ├── header.html               # Reusable responsive navigation bar & category dropdowns
│   └── footer.html               # Reusable store footer with contacts and legal links
├── img/                          # Optimized livestock images, banners, and logos
├── lib/                          # Vendor packages (OwlCarousel, Lightbox, Easing, Waypoints)
├── docs/
│   ├── REQUIREMENTS_SPECIFICATION.md # Software Requirements Specification & RTM
│   └── DEPLOYMENT_STRATEGY.md        # Cloud deployment and $0/month cost analysis
├── index.html                    # Storefront homepage with featured fish sliders
├── shop.html                     # Full catalogue browsing with category and price filters
├── shop-detail.html              # Individual product view with water specs and care info
├── cart.html                     # Shopping cart with dynamic quantity manipulation
├── checkout.html                 # Shipping address collection & payment selection
├── order-confirmation.html       # Customer receipt with WhatsApp & Email triggers
├── admin.html                    # Store administrator dashboard (PIN: 1234)
├── contact.html                  # Canadian contact desk with map and direct messaging
├── faqs.html                     # Frequently asked questions & winter shipping details
├── helpful-articles.html         # Drip acclimation and water chemistry care guides
├── why-us.html                   # 14-day quarantine standards and breeding philosophy
├── careers.html                  # Open caretaker & packing coordinator opportunities
├── privacy-policy.html           # E-commerce customer data policy
├── terms-of-use.html             # Terms of service and Live Arrival Guarantee policy
├── license.html                  # Public on-site commercial license & copyright page
├── LICENSE                       # Repository legal proprietary commercial license
├── server.js                     # Zero-dependency local testing server (Node.js)
├── .gitignore                    # Git tracking rules
└── README.md                     # Master Repository Manual (This Document)
```

---

## 🚀 Local Development & Execution

To test the application locally:

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (v16.0.0 or higher).

### 2. Start the Zero-Dependency Test Server
From the repository root:
```bash
node server.js
```
The server will initialize on port `3000`:
```
Server running at http://localhost:3000/
```

### 3. Store Front & Admin URLs
* **Storefront Home**: [http://localhost:3000/](http://localhost:3000/)
* **Catalogue & Filters**: [http://localhost:3000/shop.html](http://localhost:3000/shop.html)
* **Cart Page**: [http://localhost:3000/cart.html](http://localhost:3000/cart.html)
* **Checkout Engine**: [http://localhost:3000/checkout.html](http://localhost:3000/checkout.html)
* **Admin Dashboard**: [http://localhost:3000/admin.html](http://localhost:3000/admin.html) *(Default PIN: `1234`)*
* **License & Legal**: [http://localhost:3000/license.html](http://localhost:3000/license.html)

---

## 📞 Store Contacts & Ownership

* **Entity**: Ancistrus Land Canada
* **Operating Facility**: Ottawa, Ontario, Canada
* **Dispatch Desk (WhatsApp/SMS)**: +1 (613) 266-5285
* **Commercial Email**: sudarsha.wijenayake@gmail.com
* **Corporate License**: [Commercial Proprietary License (c) 2026](LICENSE)
