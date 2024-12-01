// routes/checkout.js
const express = require('express');
const stripe = require('stripe')('sk_test_51Q6IidKQcaWD8Hrk4ltpLRWj1OjSCKzXIk7nYm379YhemEQ22ZDY6zcBvRjN8Et3S6ne1kqI9K9AXEGdhFWkQIpI00dnph5iQX'); // Replace with your Stripe secret key
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
    const { items } = req.body;

    // Create a line item array for the checkout session
    const lineItems = items.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
                images: [item.image_url],
            },
            unit_amount: item.price * 100, // Amount in cents
        },
        quantity: item.quantity, // Quantity of the item
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'https://flyshoes-frontend-d4a16ae44cdf.herokuapp.com/success', // Redirect to success page
            cancel_url: 'https://flyshoes-frontend-d4a16ae44cdf.herokuapp.com/cancel', // Redirect to cancel page
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
