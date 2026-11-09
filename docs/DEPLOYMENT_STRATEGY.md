# Executive Proposal: Production Deployment Strategy & Zero-Cost Architecture

```
========================================================================================
Document Title: Production Deployment Strategy & Operating Cost Analysis
Project       : Ancistrus Land Canada - Web E-Commerce Platform
Classification: Executive Commercial Proposal
Document ID   : DOC-DEP-2026-V1
Version       : 1.0.0 (Production-Ready)
Copyright     : (c) 2026 Ancistrus Land Canada. All Rights Reserved.
========================================================================================
```

## 📚 Master Documentation Index
* 📄 **[Master Repository Manual](../README.md)** — Architectural Overview & Local Testing
* 📄 **[Requirements Specification (SRS & RTM)](REQUIREMENTS_SPECIFICATION.md)** — Implemented Requirements & QA Matrix
* 📄 **[Commercial License Agreement](../LICENSE)** — Proprietary Commercial Software License

---

## 1. Executive Summary

This proposal presents a production deployment architecture designed to give **Ancistrus Land Canada** an enterprise-grade, high-availability e-commerce storefront with **$0.00 in recurring monthly hosting fees**.

Traditional e-commerce platforms (such as Shopify, BigCommerce, or dedicated cPanel hosting) carry recurring costs between **$400 to $1,500+ CAD annually**, in addition to platform transaction surcharges. By utilizing modern **Jamstack edge-cloud infrastructure**, Ancistrus Land can leverage world-class global networks (Cloudflare, Vercel, or GitHub) with zero server overhead and maximum security.

---

## 2. Total Cost of Ownership (TCO) Comparison

The following table contrasts the proposed zero-cost architecture with conventional hosted alternatives:

| Expense Category | Shopify Basic | Traditional cPanel / Hostinger | Proposed Ancistrus Land Cloud Architecture |
| :--- | :--- | :--- | :--- |
| **Hosting Fee** | \$51.00 CAD / mo | \$12.00 – \$25.00 CAD / mo | **\$0.00 / mo (Free Forever)** |
| **Custom Domain** | Paid by Store | Paid by Store | Already Owned by Store (3 Years Paid) |
| **SSL (HTTPS) Certificate** | Included | \$0 – \$60.00 CAD / yr | **\$0.00 (Automated 256-bit TLS/SSL)** |
| **Transaction Platform Surcharge** | 2.0% per sale | 0% | **0% Platform Surcharge** |
| **Database Storage** | Bundled | Bundled MySQL | **\$0.00 (Firebase / Local Storage Free Tier)** |
| **DDoS Protection & Global CDN** | Basic | Additional cost | **Enterprise Cloudflare Edge Included ($0)** |
| **Annual Fixed Overhead** | **~$612.00+ CAD / yr** | **~$150.00 – $300.00 CAD / yr** | **$0.00 CAD / yr** |

---

## 3. Recommended Production Deployment Options

All three recommended options connect directly to the existing Git repository and provide automated continuous deployment: every time a change is committed, the production website rebuilds and updates automatically within seconds.

### Option A: Cloudflare Pages (Top Recommendation)
* **Performance**: Backed by Cloudflare’s global edge network spanning over 300 cities worldwide (including Toronto, Montreal, and Vancouver).
* **Benefits**:
  * Unlimited bandwidth.
  * Free automatic SSL encryption.
  * Direct DNS management for your existing domain (`dhaaraham.com` or `ancistrusland.ca`).
  * Advanced DDoS mitigation protecting your store from downtime.
* **Monthly Cost**: **$0.00 CAD**.

### Option B: Vercel Cloud
* **Performance**: Industry standard for frontend delivery with ultra-fast page rendering and instant cache invalidation.
* **Benefits**:
  * Native 1-click GitHub integration.
  * Free SSL and custom domain mapping.
  * Built-in preview environments for reviewing changes before they go live.
* **Monthly Cost**: **$0.00 CAD**.

### Option C: GitHub Pages
* **Performance**: Direct hosting from the repository with zero configuration.
* **Benefits**:
  * Highest simplicity; hosted directly alongside the source code.
  * Free custom domain support with HTTPS enforcement.
* **Monthly Cost**: **$0.00 CAD**.

---

## 4. Payment Gateway & Transaction Flow

The store implements a low-overhead, high-trust Canadian transaction flow:

```
[ Customer Browses Livestock in CAD ]
                 │
                 ▼
[ Customer Places Order on Website (checkout.html) ]
                 │
       ┌─────────┴─────────┐
       ▼                   ▼
1. Interac e-Transfer   2. Credit / Debit Invoice Link
   (0% merchant fee)       (Standard 2.9% + 30¢ via Stripe/Square)
                 │
                 ▼
[ Automated Notification Transmitted to Store Management ]
   ├─► 🟢 WhatsApp Alert to Dispatch Desk (+1 613 266 5285)
   └─► ✉️ Itemized Invoice Email (sudarsha.wijenayake@gmail.com)
```

1. **Interac e-Transfer (Primary)**:
   * **Why**: The most trusted e-commerce payment method in Canada.
   * **Merchant Fee**: **0%** (paid directly into your Canadian business bank account).
2. **Credit Card Invoicing (Secondary)**:
   * A digital invoice link (Square or Stripe) can be emailed directly to customers who request credit card payments.

---

## 5. Domain Configuration Guide (DNS Mapping)

To connect your existing domain (`dhaaraham.com` or custom domain) to the free production host:

1. **Log in** to your domain registrar (GoDaddy, Namecheap, Google Domains, etc.).
2. **Navigate to DNS Management**.
3. **Add the standard records**:
   * **CNAME Record**:
     * Host: `www`
     * Target: `<your-project-name>.pages.dev` (or `cname.vercel-dns.com`)
   * **A Record** (Root domain):
     * Host: `@`
     * Value: Cloudflare / Vercel designated IP addresses.
4. **SSL Activation**: The hosting platform automatically issues a 256-bit TLS/SSL certificate within 15 minutes of DNS verification at zero cost.

---

## 6. Security, Maintenance & Backup Policy

* **Zero Server Maintenance**: With serverless static edge hosting, there is no Linux server to patch, no PHP vulnerabilities to remediate, and no database exploits to worry about.
* **Admin Security**: Access to the product management interface (`/admin.html`) is gated by an administrative PIN and session verification.
* **Disaster Recovery**: The entire catalog, styling, and order logic are version-controlled in the Git repository. If any mistake is made, the store can be rolled back to any previous state in one second.

---

## 7. Next Steps for Store Launch

1. **Review & Approval**: Store management reviews this deployment strategy.
2. **Repository Push**: Connect the local Git repository to GitHub or GitLab.
3. **Link to Cloudflare Pages or Vercel**: Connect the repository to the chosen free host (5-minute setup).
4. **Map the Domain**: Update the DNS records in your domain registrar.
5. **Launch**: The store is live to Canadian customers with zero monthly overhead.
