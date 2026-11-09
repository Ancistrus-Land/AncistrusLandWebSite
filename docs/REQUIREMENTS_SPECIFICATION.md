# Software Requirements Specification (SRS) & Verification Traceability Matrix

**Project**: Ancistrus Land Canada E-Commerce Platform  
**Document Version**: 1.0.0  
**Classification**: Commercial Store Platform Specification  
**Status**: Implemented & Verified  

---

## 1. Scope & Objective
This document details all business, functional, non-functional, and operational requirements implemented in the Ancistrus Land Canada e-commerce web platform. It serves as the official specification for store management, compliance verification, and quality assurance testing.

---

## 2. Requirements Traceability Matrix (RTM)

| Req ID | Requirement Description | Category | Source Module / File | Verification Method | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-CAT-01** | Support hierarchical taxonomy across 4 main departments (Fish, Invertebrates, Plants, Dry Goods) and 21 subcategories. | Functional | `js/products.js`, `includes/header.html` | Navigation menu inspection & URL query filter test | **PASS** |
| **REQ-CAT-02** | Display product cards with image, title, subcategory pill, CAD ($) price, and stock status. | Presentation | `shop.html`, `js/services.js` | Visual verification on `shop.html` | **PASS** |
| **REQ-CAT-03** | Provide real-time client-side keyword search across product names and subcategories without page reloads. | Functional | `shop.html`, `js/services.js` | Input query in search box; verify instant grid filtering | **PASS** |
| **REQ-CAT-04** | Support sorting catalogue by Price (Low to High, High to Low) and Alphabetically (A to Z). | Functional | `shop.html` | Select sort dropdown; verify re-ordered array | **PASS** |
| **REQ-CAT-05** | Product Detail view displaying care parameters (pH, Temperature, Diet, Temperament) and related species. | Functional | `shop-detail.html` | Navigate with `?id=P-003`; verify parameter table | **PASS** |
| **REQ-CRT-01** | Add to Cart functionality with stock validation (prevent adding out-of-stock items). | Functional | `js/services.js` (`CartService.add`) | Attempt adding out-of-stock item; verify error guard | **PASS** |
| **REQ-CRT-02** | Real-time badge counter synchronization across desktop and mobile headers via Pub/Sub event system. | Architectural | `js/services.js`, `includes/header.html` | Add item; verify both `#cart-count` & `#cart-count-mobile` update | **PASS** |
| **REQ-CRT-03** | Shopping Cart page allowing quantity increments, decrements, item deletion, and live subtotal calculations. | Functional | `cart.html`, `js/services.js` | Click `+`, `-`, and remove icons; verify instant recalculation | **PASS** |
| **REQ-CHK-01** | Canadian checkout collection capturing Full Name, Phone/WhatsApp, Email, Street Address, City, Province, and Postal Code. | Functional | `checkout.html` | Submit checkout form; verify validation constraints | **PASS** |
| **REQ-CHK-02** | Canadian payment method selection supporting Interac e-Transfer, Cash on Delivery (Ottawa), and Credit Card invoice link. | Functional | `checkout.html` | Select payment radio options; verify payload state | **PASS** |
| **REQ-ORD-01** | Dual-channel store notification: Generate itemized order confirmation with 1-click WhatsApp transmission. | Integration | `order-confirmation.html` | Click "Send to WhatsApp"; verify pre-filled message syntax | **PASS** |
| **REQ-ORD-02** | Dual-channel store notification: Generate 1-click email invoice addressed to store management. | Integration | `order-confirmation.html` | Click "Send to Email"; verify pre-addressed `mailto:` invoice | **PASS** |
| **REQ-ADM-01** | Gated Administrative Dashboard requiring secure PIN authentication. | Security | `admin.html`, `js/config.js` | Access `/admin.html`; verify lockout until PIN `1234` entered | **PASS** |
| **REQ-ADM-02** | Admin ability to Add new products with ID, name, category, price, image, and description. | Functional | `admin.html` | Click "Add New Item"; verify modal saves and injects into catalog | **PASS** |
| **REQ-ADM-03** | Admin ability to Edit or Delete existing products. | Functional | `admin.html` | Click edit/delete icons; verify catalogue state update | **PASS** |
| **REQ-ADM-04** | Admin 1-click Stock Status toggle between "In Stock" and "Out of Stock" with instant storefront reflection. | Functional | `admin.html`, `js/services.js` | Toggle stock; refresh `shop.html`; verify "Sold Out" state | **PASS** |
| **REQ-ADM-05** | Customer order history ledger capturing order ID, date, customer info, items, and total. | Functional | `admin.html` | Place test order; review entry in Admin "Orders Log" tab | **PASS** |
| **REQ-ADM-06** | 1-Click Export capability to download updated `products.js` for permanent source control commit. | Operational | `admin.html` | Click "Download Updated products.js"; verify file structure | **PASS** |
| **REQ-POL-01** | Dedicated Live Arrival Guarantee (LAG) & DOA reporting documentation (2-hour photo/video protocol). | Compliance | `faqs.html`, `terms-of-use.html` | Review policy clauses and legal terms | **PASS** |
| **REQ-POL-02** | Sub-zero Canadian winter packaging specifications (1.5" molded EPS boxes, 72-hr Uniheat packs, pure oxygen). | Compliance | `faqs.html`, `why-us.html` | Review packaging guidelines and dispatch calendar (Mon/Tue) | **PASS** |
| **REQ-POL-03** | Comprehensive informational pages: Why Us, Careers, Contact Us, Helpful Articles, Privacy Policy, Terms of Use. | Presentation | Entire root page suite | Inspect all 14 pages; verify active links and Canadian content | **PASS** |

---

## 3. Test Cases & Verification Procedures

### Test Case TC-01: End-to-End Customer Purchase Journey
1. **Navigate** to `http://localhost:3000/shop.html`.
2. **Search** for `"Discus"` and select `"Red Melon Discus"` ($79.99).
3. **Set quantity** to `2` on `shop-detail.html?id=P-003` and click **"Add to Cart"**.
4. **Inspect** the header cart badge; verify it displays `2`.
5. **Proceed** to `cart.html`; verify Subtotal is `$159.98 CAD`.
6. **Proceed** to `checkout.html`, fill in Canadian customer details (e.g. Ottawa, ON, K1P 5N6), select **Interac e-Transfer**, and click **"Place Order Now"**.
7. **Verify**:
   * Order ID generated (`ANC-CA-XXXXXX`).
   * Cart count resets to `0`.
   * Order Confirmation screen displays receipt with free thermal packaging.
   * "Send to WhatsApp" link formats message containing items, price, and customer address.

### Test Case TC-02: Real-Time Admin Inventory Control
1. **Navigate** to `http://localhost:3000/admin.html`.
2. **Authenticate** using PIN: `1234`.
3. Locate `"P-001 - Caridina Shrimp"` and click **"In Stock"** to toggle it to **"Out of Stock"**.
4. **Open** `http://localhost:3000/shop.html` in a new tab.
5. **Verify**: Product card shows **"Out of Stock"** with button disabled.
6. **Return** to `admin.html` and click **"Out of Stock"** to toggle back to **"In Stock"**.
7. **Refresh** `shop.html`; verify product returns to active state.

---

## 4. Sign-off & Store Approval
* **Technical Reviewer**: Engineering Lead  
* **Store Representative**: Ancistrus Land Store Management  
* **Date**: November 2026
