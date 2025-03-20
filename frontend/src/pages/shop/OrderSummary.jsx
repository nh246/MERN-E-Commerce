import { useDispatch, useSelector } from "react-redux";
import { claerCart } from "../../redux/features/cart/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { getBaseUrl } from "../../utils/getBaseUrl";
import axios from "axios";

function OrderSummary() {
  const { products, selectedItems, totalPrice } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleclearCart = () => {
    dispatch(claerCart());
  };

  // console.log(products, selectedItems, totalPrice)

  // handle Make Payment

  const makePayment = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
    // console.log(stripe);

    const body = {
      products: products,
      userId: user?._id,
    };

    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/orders/create-checkout-session`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      const result = stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (result.error) {
        return console.error("Error in redirecting checkout", result.error);
      }
    } catch (error) {
      console.error("Error creating checkout", error);
    }
  };

  return (
    <div className=" bg-primary-light mt-5 rounded text-base">
      <div className="px-6 py-4 space-y-5">
        <h1 className="text-2xl font-bold text-dark">Order Summary</h1>
        <p className="text-dark mt-2">Selected Items : {selectedItems}</p>
        <p className="text-dark mt-2">Total Price : ${totalPrice.toFixed(2)}</p>
      </div>
      <div className="px-4 pb-6">
        <button
          onClick={(e) => {
            e.stopPropagation(), handleclearCart();
          }}
          className="bg-red-500 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center mb-4"
        >
          <span className="mr-2">Clear Cart</span>

          <i className="ri-delete-bin-7-line"></i>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation(makePayment());
          }}
          className="bg-green-600 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center"
        >
          <span className="mr-2">Proceed Checkout</span>
          <i className="ri-bank-card-line"></i>
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
