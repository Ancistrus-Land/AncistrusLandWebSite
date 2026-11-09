# Ancistrus Land Canada - Web E-Commerce Platform

Welcome to the official repository for **Ancistrus Land Canada**, a specialized online aquarium and livestock store based in Ottawa, Ontario, delivering exotic tropical fish, ornamental shrimp, live plants, and premium aquatic supplies across Canada.

This platform is built with a modern, high-performance, multi-tier architecture featuring decoupled business logic services, real-time inventory management, dual-channel checkout notifications (WhatsApp & Email), and an integrated administrative dashboard.

---

## 📋 Table of Contents
1. [Architecture Overview](#-architecture-overview)
2. [Key Features](#-key-features)
3. [Repository Structure](#-repository-structure)
4. [Local Development & Testing](#-local-development--testing)
5. [Administrative Dashboard](#-administrative-dashboard)
6. [Deployment Strategy & Free Cloud Hosting](#-deployment-strategy--free-cloud-hosting)
7. [Operational Best Practices](#-operational-best-practices)

---

## 🏛 Architecture Overview

The application follows strict **Clean Architecture** principles with clear separation of concerns across three distinct layers:

```
+-------------------------------------------------------------------------+
|                          1. PRESENTATION TIER                           |
|  - Semantic HTML5 Pages (index, shop, shop-detail, cart, checkout)     |
|  - Modular Component Templates: includes/header.html, footer.html       |
|  - Layout Engine: js/layout.js (ES6 Module Loader)                      |
|  - Styling: css/bootstrap.min.css & css/style.css                       |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                      2. BUSINESS SERVICES LAYER                         |
|  - CatalogService: Query, filter, stock validation, and overrides       |
|  - CartService: State management, item manipulation, and badge events   |
|  - OrderService: Order creation, receipt generation, invoice formatting |
|  - Event-Driven Pub/Sub: 'cart:updated', 'catalog:updated'              |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                     3. DATA & CONFIGURATION LAYER                       |
|  - js/config.js: Centralized Single Source of Truth                     |
|  - js/products.js: Master product schema & default seed inventory      |
|  - Storage Engine: LocalStorage with Cloud Database (Firebase) adapter  |
+-------------------------------------------------------------------------+
```

---

## ✨ Key Features

* **Localized for the Canadian Market**:
  * Native **CAD ($)** pricing and tax/shipping logic.
  * Integration with all **10 Canadian Provinces & 3 Territories**.
  * Payment options: **Interac e-Transfer**, **Major Credit Cards (Invoice link)**, and **Local Ottawa Pickup / COD**.
  * Specialized **Winter Sub-Zero Shipping Policy** (EPS insulated boxes, 72-hour Uniheat packs, pure medical oxygen).
  * **100% Live Arrival Guarantee (LAG)** policy with a 2-hour reporting protocol.

* **Dual-Channel Store Notification Engine**:
  * **1-Click WhatsApp Dispatch Notification**: Formats an itemized order summary, delivery address, and contact info ready to send to the store's dispatch phone.
  * **Direct Email Invoice Notification**: Automatically compiles an invoice addressed directly to the store management inbox.

* **Browser-Based Admin Control Panel**:
  * PIN-protected store management (`/admin.html`).
  * Live stock toggles (**In Stock** vs. **Out of Stock**).
  * 1-click **Add, Edit, and Delete** products.
  * Customer order history log.
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
│   └── DEPLOYMENT_STRATEGY.md    # Complete executive deployment and $0 cost analysis
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
├── server.js                     # Zero-dependency local testing server (Node.js)
├── .gitignore                    # Git tracking rules
└── README.md                     # Repository documentation
```

---

## 🚀 Local Development & Testing

To test the application locally:

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (v16.0.0 or higher).

### 2. Run the Local Server
From the repository root:
```bash
node server.js
```
The server will start on port `3000`:
```
Server running at http://localhost:3000/
```

### 3. Key Pages to Review
* **Home Page**: [http://localhost:3000/](http://localhost:3000/)
* **Catalog**: [http://localhost:3000/shop.html](http://localhost:3000/shop.html)
* **Cart**: [http://localhost:3000/cart.html](http://localhost:3000/cart.html)
* **Admin Panel**: [http://localhost:3000/admin.html](http://localhost:3000/admin.html) *(Default PIN: `1234`)*

---

## 🔒 Administrative Dashboard

The store administrator dashboard allows non-technical staff to manage the catalogue without editing code:
1. Navigate to [`/admin.html`](file:///admin.html).
2. Enter the store management PIN: **`1234`** *(Configurable in `js/config.js`)*.
3. Manage products:
   * **Toggle Stock**: Click the stock status button to instantly mark items as In Stock or Out of Stock across the site.
   * **Add/Edit**: Update prices, descriptions, and images.
   * **Order Log**: Review incoming customer orders submitted through the site.
   * **Export**: Click **"Download Updated products.js"** to save catalog changes permanently into the Git repository.

---

## 💰 Deployment Strategy & Free Cloud Hosting

For full details on how to deploy this platform to a custom domain (`dhaaraham.com` or `ancistrusland.ca`) with **$0/month in hosting costs**, refer to the executive guide:
* 📄 **[docs/DEPLOYMENT_STRATEGY.md](docs/DEPLOYMENT_STRATEGY.md)**

---

## 📞 Support & Contacts

* **Store**: Ancistrus Land Canada
* **Location**: Ottawa, Ontario, Canada
* **Dispatch Desk (WhatsApp/SMS)**: +1 (613) 266-5285
* **Email**: sudarsha.wijenayake@gmail.com
