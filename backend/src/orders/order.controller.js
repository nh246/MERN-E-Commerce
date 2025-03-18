const { response } = require("express");
const { BASE_URL } = require("../utilis/baseURL");
const { errorResponse } = require("../utilis/responseHandler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// create checkout session controller
const makePaymentRequest = async (req, res) => {
  const { products, userId } = req.body;

  try {
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/cancle`,
    });
    res.json({ id: session.id });
  } catch (error) {
    return errorResponse(res, 500, "Failed to create payment session", error);
  }
};

module.exports = { makePaymentRequest };
