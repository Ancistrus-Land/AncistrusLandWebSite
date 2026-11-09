# Software Requirements Specification (SRS) & Verification Traceability Matrix

```
========================================================================================
Document Title: Software Requirements Specification (SRS) & Traceability Matrix
Project       : Ancistrus Land Canada - Web E-Commerce Platform
Classification: Commercial Store Platform Specification
Document ID   : DOC-SRS-2026-V1
Version       : 1.0.0 (Production-Ready)
Copyright     : (c) 2026 Ancistrus Land Canada. All Rights Reserved.
========================================================================================
```

## 📚 Master Documentation Index
* 📄 **[Master Repository Manual](../README.md)** — Architectural Overview & Local Testing
* 📄 **[Production Deployment & Pricing Strategy](DEPLOYMENT_STRATEGY.md)** — Executive Cloud Hosting & Zero-Cost Analysis
* 📄 **[Commercial License Agreement](../LICENSE)** — Proprietary Commercial Software License

---

## 1. Executive Scope & Objective

This document defines the formal Software Requirements Specification (SRS) for **Ancistrus Land Canada**. It establishes the complete functional, technical, operational, and compliance requirements implemented in the production storefront. 

This document serves as the official baseline for store management sign-off, quality assurance auditing, and continuous enhancement tracking.

---

## 2. Requirements Traceability Matrix (RTM)

The matrix below maps each business and technical requirement to its functional category, implementation file, test procedure, and quality assurance result.

| Req ID | Requirement Description | Category | Implementation Module | Verification Method | QA Status |
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
| **REQ-POL-03** | Comprehensive informational pages: Why Us, Careers, Contact Us, Helpful Articles, Privacy Policy, Terms of Use, License. | Presentation | Entire root page suite | Inspect all 14 pages; verify active links and Canadian content | **PASS** |

---

## 3. Test Cases & Verification Procedures

### Test Case TC-01: End-to-End Customer Purchase Journey
* **Goal**: Validate complete flow from catalogue browsing to receipt and dual store notifications.
* **Execution Steps**:
  1. Navigate to `http://localhost:3000/shop.html`.
  2. Search for `"Discus"` and select `"Red Melon Discus"` ($79.99 CAD).
  3. Set quantity to `2` on `shop-detail.html?id=P-003` and click **"Add to Cart"**.
  4. Verify header cart badge updates to `2`.
  5. Navigate to `cart.html`; verify Subtotal is `$159.98 CAD`.
  6. Proceed to `checkout.html`, input customer data (Ottawa, ON, K1P 5N6), select **Interac e-Transfer**, and click **"Place Order Now"**.
* **Expected Result**:
  * Unique Order ID generated (`ANC-CA-XXXXXX`).
  * Session cart resets to zero.
  * Confirmation page displays complete receipt with zero-cost thermal packaging.
  * WhatsApp button generates formatted payload for dispatch phone (`+1 613 266 5285`).
  * Email button generates formatted invoice for `sudarsha.wijenayake@gmail.com`.
* **Result**: **PASS**

### Test Case TC-02: Real-Time Admin Inventory Control
* **Goal**: Verify administrative stock override and instant storefront reflection.
* **Execution Steps**:
  1. Navigate to `http://localhost:3000/admin.html`.
  2. Enter PIN: `1234`.
  3. Locate product `"P-001 - Caridina Shrimp"` and click **"In Stock"** to switch state.
  4. Open `shop.html` in an adjacent tab.
* **Expected Result**:
  * Product immediately displays a red **"Out of Stock"** badge.
  * Action button is replaced with disabled **"Sold Out"** state.
* **Result**: **PASS**

---

## 4. Formal Sign-Off & Corporate Approval

This document constitutes the official Software Requirements Specification and Verification Matrix for Ancistrus Land Canada.

```
Reviewed and Approved by:

________________________________________         ___________________________
Lead Systems Architect                            Date

________________________________________         ___________________________
Store Operations / Managing Director              Date
```
