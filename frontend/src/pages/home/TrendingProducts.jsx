import { useState } from "react";
import products from "../../data/products.json";
import ProductsCart from "./../shop/ProductsCart";

function TrendingProducts() {
  const [visibleProducts, setVisibleProducts] = useState(8);

  const loadMoreProducts = ()=>{
    setVisibleProducts( preCount => preCount + 4)
  }

  return (
    <section className="section__container ">
      <h2 className="section__header">Trending Products</h2>

      <p className="section__subheader product__container ">
        Discover the Hottest Picks: Elevate Your Style with Our Curated
        Collecction of Trending Women's Fashion Prooducts.
      </p>

      {/* products cart  */}
      <div className="!mt-8">
        <ProductsCart products={products.slice(0, visibleProducts)} />
      </div>
      {/* load more  */}

      <div className="product__btn">
        {visibleProducts < products.length && (
          <button onClick={loadMoreProducts} className="btn">Load More</button>
        )}
      </div>
    </section>
  );
}

export default TrendingProducts;
