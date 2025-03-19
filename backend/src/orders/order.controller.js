const { response } = require("express");
const { BASE_URL } = require("../utilis/baseURL");
const { errorResponse, successResponse } = require("../utilis/responseHandler");
const Order = require("./order.model");
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

// confirmPayment

const confirmPayment = async (req,res) => {

  const {session_id} = req.body
  console.log(req.body)

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"]
    }) 
    const paymentIntentId = session.payment_intent.id
    let order = await Order.findOne({orderId: paymentIntentId})

    if(!order){
      const lineItems = session.line_items.data.map((item) => ({
        productId: item.price.product,
        quantity: item.quantity
      }))

      const amount = session.amount_total / 100

      order= new Order({
        orderId: paymentIntentId,
        products: lineItems,
        amount: amount,
        email: session.customer_details.email,
        status: session.payment_intent.status === "succeeded" ? "pending" : "pending"
      })
      
    }
    else{
      order.status = session.payment_intent.status === "succeeded" ? "pending" : "pending"
    }

    await order.save()
  //  console.log(order.status)
    return successResponse(res, 200, "Payment confirmed successfully", order)
  } catch (error) {
    return errorResponse(res , 500, "Failed to confirm payment", error)
  }
}

module.exports = { makePaymentRequest ,confirmPayment };
