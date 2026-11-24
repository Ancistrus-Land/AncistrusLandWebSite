/**
 * Customer Orders & Dispatch Service Layer
 * Coordinates database order storage, formatting, and invoice dispatch via Mailer.
 */
const { db } = require('../lib/db');
const { mailer } = require('../lib/mailer');
const { SettingsService } = require('./settingsService');

class OrderService {
    /**
     * Get all logged customer orders formatted for Admin display
     */
    static async getAllOrders() {
        const orders = await db.find('orders', 'select=*&order=created_at.desc');
        return (orders || []).map(o => ({
            orderId: o.id,
            date: new Date(o.created_at).toLocaleString("en-CA"),
            customer: {
                name: o.customer_name,
                phone: o.customer_phone,
                email: o.customer_email,
                address: o.shipping_address,
                city: o.city,
                province: o.province,
                postalCode: o.postal_code,
                notes: o.delivery_notes,
                paymentMethod: o.payment_method
            },
            items: o.items || [],
            subtotal: Number(o.subtotal) || 0,
            tax: o.tax_details || null,
            total: Number(o.total) || 0,
            status: o.status
        }));
    }

    /**
     * Process new customer order: persist to DB and send notification email
     */
    static async processOrder(orderData) {
        const c = orderData.customer || {};
        const subtotal = Number(orderData.subtotal != null ? orderData.subtotal : (orderData.items ? orderData.items.reduce((s, i) => s + (i.price * i.quantity), 0) : orderData.total));
        const total = Number(orderData.total || 0);

        const record = {
            id: orderData.orderId,
            customer_name: c.name || "Customer",
            customer_phone: c.phone || "",
            customer_email: c.email || "",
            shipping_address: c.address || "",
            city: c.city || "",
            province: c.province || "",
            postal_code: c.postalCode || "",
            delivery_notes: c.notes || "",
            payment_method: c.paymentMethod || "Interac e-Transfer",
            items: orderData.items || [],
            subtotal: subtotal,
            tax_details: orderData.tax || null,
            total: total,
            status: 'Pending Review',
            created_at: new Date().toISOString()
        };

        // 1. Save to database
        const dbResult = await db.insert('orders', record);

        // 2. Lookup dynamic store email for merchant notification
        const storeContacts = await SettingsService.getContacts();
        const merchantEmail = storeContacts.email;

        // 3. Dispatch merchant notification email if merchant email exists
        if (merchantEmail) {
            await mailer.send({
                to: merchantEmail,
                subject: `New Order #${record.id} from ${record.customer_name}`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px;">
                        <h2 style="color: #0077b6;">New Order Received #${record.id}</h2>
                        <p><strong>Customer:</strong> ${record.customer_name} (${record.customer_email || 'No email'})</p>
                        <p><strong>Phone:</strong> ${record.customer_phone}</p>
                        <p><strong>Address:</strong> ${record.shipping_address}, ${record.city}, ${record.province} ${record.postal_code}</p>
                        <p><strong>Total:</strong> CAD $${record.total.toFixed(2)} (${record.payment_method})</p>
                    </div>
                `
            });
        }

        return { success: true, orderId: record.id };
    }
}

module.exports = { OrderService };
