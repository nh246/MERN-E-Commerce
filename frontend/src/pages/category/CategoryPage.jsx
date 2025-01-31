import { useParams } from "react-router";
import ProductsCart from "../shop/ProductsCart";
import { useEffect, useState } from "react";
import products from "../../data/products.json";

function CategoryPage() {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category === categoryName.toLocaleLowerCase()
    );

    setFilteredProducts(filtered);
  }, []);

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">
          Browse a divarce range of catagory , from female dress to versatile
          accsesories. Elevate your style today!
        </p>
      </section>
      {/* products cart  */}

      <div className="section__container">
        <ProductsCart products={filteredProducts} />
      </div>
    </>
  );
}

export default CategoryPage;
