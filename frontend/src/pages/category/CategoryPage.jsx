import { useParams } from "react-router";

function CategoryPage() {
  const { categoryName } = useParams();

  return (
    <>
      <section className="section__container">
        <h2>{categoryName}</h2>
      </section>
    </>
  );
}

export default CategoryPage;
