import { Link, useParams } from "react-router";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import Loading from "./../../../components/Loading";
import RatingStar from "./../../../components/RatingStar";
import ReviewsCart from "../reviews/ReviewsCart";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cart/cartSlice";

function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    data: { data: productdetails } = {},
    isLoading,
    isError,
  } = useFetchProductByIdQuery(id);

  const handleAddToCart = (product) => {
    // console.log("add to cart", product);
    dispatch(addToCart(product));
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
       
      <div className="flex items-center justify-center h-96">
        Error to Load Product Details
      </div>
    );

  const { product, reviews } = productdetails || {};

  // console.log(productdetails);

  return (
    <>
      {/* products banner section  */}
      <section className="section__container rounded bg-primary-light">
        <h2 className="section__header">Single Product Page</h2>
        <div className="section__subheader space-x-2">
          <span className="hover:text-primary">
            <Link to="/">home</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">
            <Link to="/shop">shop</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">{product.name}</span>
        </div>
      </section>

      {/* products container section  */}

      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <img
              src={product?.image}
              alt=""
              className="rounded-md w-full h-auto"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
            <p className="text-xl text-primary mb-4">
              {product?.price}{" "}
              {product?.oldPrice && <s>${product?.oldPrice}</s>}
            </p>
            <p className="text-gray-700 mb-4">{product?.description}</p>

            {/* Additional Product Information */}
            <div className="flex flex-col space-y-2">
              <p className="capitalize">
                <strong>Category:</strong> {product?.category}
              </p>
              <p className="capitalize">
                <strong>Color:</strong> {product?.color}
              </p>
              <div className="flex gap-1 items-center">
                <strong>Rating: </strong>{" "}
                <RatingStar rating={product?.rating} />
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
              className="mt-6 px-6 py-3 bg-primary text-white rounded-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* reviews section  */}

      <section className="section__container mt-8">
        <ReviewsCart productReviews={reviews} />
      </section>
    </>
  );
}

export default SingleProduct;
