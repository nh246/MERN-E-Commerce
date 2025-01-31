import RatingStar from "../../components/RatingStar";

function ProductsCart({ products }) {
//   console.log(products);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products &&
        products.map((product, index) => (
          <div key={index} className="product__card">
            <div className="relative">
              <a href="/shop/66d45fb27e580755d843823e">
                <img
                  src={product?.image}
                  alt="Men Casual tShirt"
                  className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300"
                />
              </a>
              <div className="hover:block absolute top-3 right-3">
                <button>
                  <i className="ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark"></i>
                </button>
              </div>
            </div>
            <div className="product__card__content">
              <h4>{product?.name}</h4>
              <p>
                ${product.price}
                {product?.oldPrice ? <s>{product?.oldPrice}</s> : null}
              </p>
              <RatingStar rating={product?.rating} />
            </div>
          </div>
        ))}
    </div>
  );
}

export default ProductsCart;
