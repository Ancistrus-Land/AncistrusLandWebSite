# Ancistrus Land Canada - API Reference & Backend Architecture

This document describes the backend API endpoints, payload schemas, automated email dispatch pipelines, deployment environment variables, and testing guidelines for **Ancistrus Land Canada**.

---

## Architecture Overview

The backend uses an **environment-agnostic, zero-dependency Node.js architecture**:
- **Local Development**: Mounted directly into `server.js` (`http://localhost:3000/api/order`).
- **Serverless Cloud**: Exported as an edge serverless function (`/api/order.js`) compatible with Vercel, Cloudflare Pages, Netlify, and Render.
- **Zero Heavy Dependencies**: Uses Node's built-in `https` module to eliminate bundle bloat and ensure sub-50ms cold starts.

---

## Endpoints

### 1. `POST /api/order`

Receives customer checkout data, logs the transaction, and concurrently dispatches automated transactional emails to both the customer and store dispatch.

- **URL**: `/api/order`
- **Method**: `POST`
- **Headers**:
  ```http
  Content-Type: application/json
  ```
- **CORS Support**: `Access-Control-Allow-Origin: *`, `OPTIONS` pre-flight supported.

#### Request Body Schema

```json
{
  "orderId": "ANC-CA-417307",
  "date": "2026-11-12, 12:05:00 p.m.",
  "customer": {
    "name": "Jane Tremblay",
    "phone": "+1 (613) 555-0123",
    "email": "jane@example.ca",
    "address": "123 Bank Street, Apt 4B",
    "city": "Ottawa",
    "province": "Ontario",
    "postalCode": "K1P 5N6",
    "notes": "Leave with concierge or ring bell.",
    "paymentMethod": "Interac e-Transfer"
  },
  "items": [
    {
      "id": "P-015",
      "name": "Common Bristlenose Pleco (Ancistrus sp.) - Juvenile",
      "price": 14.99,
      "quantity": 2
    },
    {
      "id": "P-017",
      "name": "White Seam / Starry Night Ancistrus (L183 / Starlight)",
      "price": 39.99,
      "quantity": 1
    }
  ],
  "total": 69.97
}
```

#### Field Specifications

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `orderId` | `String` | Yes | Unique order identifier formatted as `ANC-CA-XXXXXX`. |
| `date` | `String` | Yes | Local timestamp formatted for Canadian regional standards (`en-CA`). |
| `customer.name` | `String` | Yes | Full recipient name for parcel declaration. |
| `customer.phone` | `String` | Yes | Contact number for express courier SMS/WhatsApp notifications. |
| `customer.email` | `String` | Yes | Recipient email address where invoice and tracking are sent. |
| `customer.address`| `String` | Yes | Physical delivery street address. |
| `customer.city` | `String` | Yes | Destination city (e.g. Ottawa, Toronto, Montreal, Vancouver). |
| `customer.province`| `String`| Yes | Canadian province or territory. |
| `customer.postalCode`| `String`| Yes| Destination postal code. |
| `customer.notes` | `String` | No | Acclimation requests, buzzer codes, or delivery instructions. |
| `customer.paymentMethod`| `String`| Yes| Payment type selected (`Interac e-Transfer` or `Cash on Delivery / Local Pickup`). |
| `items` | `Array<Object>` | Yes | Array of purchased livestock objects (`id`, `name`, `price`, `quantity`). |
| `total` | `Number` | Yes | Grand total order value in Canadian Dollars (CAD). |

---

### Response Schema

#### Success Response (`200 OK`)

```json
{
  "success": true,
  "orderId": "ANC-CA-417307",
  "customerNotified": true,
  "storeNotified": true,
  "simulated": false
}
```

*Note: If `RESEND_API_KEY` is not present (e.g. during offline local development), the response returns `"simulated": true` and prints the email preview to the terminal.*

#### Error Response (`405 Method Not Allowed`)

```json
{
  "error": "Method Not Allowed"
}
```

#### Error Response (`500 Internal Server Error`)

```json
{
  "success": false,
  "error": "Invalid order payload"
}
```

---

## Automated Email Dispatch Pipeline

When `POST /api/order` is triggered, two asynchronous emails are dispatched in parallel via `Promise.all()`:

```
                          POST /api/order Payload
                                     │
                 ┌───────────────────┴───────────────────┐
                 ▼                                       ▼
    1. Buyer's Invoice Email                2. Merchant's Alert Email
    To: customer.email                      To: sudarsha.wijenayake@gmail.com
    Subject: Order Confirmation #ANC-CA-...  Subject: ⚡ New Order #ANC-CA-...
    Content:                                Content:
    • Branded header & Order ID badge       • Customer phone & address
    • Itemized table with quantities        • Exact packing list with quantities
    • Interac e-Transfer instructions       • Payment method selected
    • 100% Live Arrival Guarantee note      • Direct link to Store Admin
```

---

## Environment Variables

Configure these variables in your local `.env` file or cloud dashboard (Vercel, Cloudflare, Render):

| Variable | Required | Default Value | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | No | `3000` | Port for the local Node.js server. |
| `STORE_EMAIL` | No | `sudarsha.wijenayake@gmail.com` | Merchant email address for dispatch alerts and Interac e-Transfer notes. |
| `RESEND_API_KEY` | In Prod | `None (Simulated in Dev)` | Transactional email API key obtained from [Resend.com](https://resend.com). |
| `RESEND_FROM` | No | `Ancistrus Land Orders <onboarding@resend.dev>` | Email sender identity. Once your domain is verified, change to `orders@ancistrusland.ca`. |
| `SITE_URL` | No | `https://ancistrusland.ca` | Canonical site URL for email links. |

---

## Local Testing with cURL / PowerShell

You can test the endpoint directly using PowerShell:

```powershell
$body = @{
    orderId = "ANC-CA-999001"
    date = (Get-Date -Format "yyyy-MM-dd, hh:mm:ss tt")
    customer = @{
        name = "Alex Tremblay"
        phone = "+1 (613) 555-0123"
        email = "alex@example.ca"
        address = "123 Bank Street"
        city = "Ottawa"
        province = "Ontario"
        postalCode = "K1P 5N6"
        notes = "Leave on porch"
        paymentMethod = "Interac e-Transfer"
    }
    items = @(
        @{ id = "P-015"; name = "Common Bristlenose Pleco"; price = 14.99; quantity = 1 }
    )
    total = 14.99
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Uri "http://localhost:3000/api/order" -Method Post -Body $body -ContentType "application/json"
```
