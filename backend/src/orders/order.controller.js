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
      cancel_url: `${BASE_URL}/cancel`,
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
        status: session.payment_intent.status === "succeeded" ? "pending" : "failed"
      })
      
    }
    else{
      order.status = session.payment_intent.status === "succeeded" ? "pending" : "failed"
    }

    await order.save()
  //  console.log(order.status)
    return successResponse(res, 200, "Payment confirmed successfully", order)
  } catch (error) {
    return errorResponse(res , 500, "Failed to confirm payment", error)
  }
}


// getOrderByEmail

const getOrdersByEmail = async (req, res) => {

  const email = req.params.email

  try {
    if(!email){
      return errorResponse(res, 400, "Email is required")
    }

    const orders = await Order.find({email}).sort({createdAt: -1})
    if(orders.length === 0 || !orders){
      return errorResponse(res, 404, "No order found by this email")
    }
    return successResponse(res, 200, "Orders fetched successfully", orders)
  } catch (error) {
   return errorResponse(res, 500, "Failed to get order by email", error)
  }

}

// getOrdersByOrderId

const getOrdersByOrderId = async (req, res) => {
try {
  const order= await Order.findById(req.params.id)
  if(!order) {
    return errorResponse(res, 404, "Order not found")
  }

  return successResponse(res, 200, "Order fetched successfully", order)
} catch (error) {
  return errorResponse(res, 500, "Failed to get order by orderId", error)
}
}

// getAllOrders

const getAllOrders = async (req, res) => {

  try {
    const orders = await Order.find().sort({createdAt: -1})
    if(orders.length === 0 || !orders){
      return errorResponse(res, 404, "No order found")
    }

    return successResponse(res, 200, "Orders fetched successfully", orders)
  } catch (error) {
    return errorResponse(res, 500, "Failed to get all orders", error)
  }
}

// updateOrderStatus 

const updateOrderStatus = async (req, res) => {
const {id} = req.params
console.log(id)
const {status} = req.body
if(!status) {
  return errorResponse(res, 400, "Status is required")
}

try {
   const updateOrder = await Order.findByIdAndUpdate(id, {status ,updatedAt: Date.now()} , {
    new: true,
    runValidators: true
   })

   if(!updateOrder){
    return errorResponse(res, 404, "Order not found")
   }

   return successResponse(res, 200, "Order status updated successfully", updateOrder)
  
  
} catch (error) {
  return errorResponse(res, 500, "Failed to update order status", error)
}
}

// deleteOrder

const deleteOrderById = async (req, res) => {
const {id} = req.params

try {
  const deletedOrder = await Order.findByIdAndDelete(id)
  if(!deletedOrder){
    return errorResponse(res, 404, "Order not found")
  }
  return successResponse(res, 200, "Order deleted successfully", deletedOrder)
} catch (error) {
  return errorResponse(res, 500, "Failed to delete order", error)
}
}



module.exports = { makePaymentRequest ,confirmPayment , getOrdersByEmail , getOrdersByOrderId , getAllOrders , updateOrderStatus , deleteOrderById} 
