import { useState } from "react";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import UploadImage from "./UploadImage";

const categories = [
  { label: "Select Category", value: "" },
  { label: "Accessories", value: "accessories" },
  { label: "Dress", value: "dress" },
  { label: "Jewellery", value: "jewellery" },
  { label: "Cosmetics", value: "cosmetics" },
];

function AddProduct() {
  const [image, setImage] = useState("");
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    color: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          type="text"
          label="Product Name"
          name="name"
          placeholder="Ex: Dimond Earrings"
          value={product.name}
          onChange={handleChange}
        />

        {/* Category Input  */}
        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />

        {/* Price Input  */}

        <TextInput
          type="number"
          label="Price"
          name="price"
          placeholder="50"
          value={product.price}
          onChange={handleChange}
        />

        {/* Image  */}
        <UploadImage
          label="Image"
          name="image"
          id="image"
          value={(e) => setImage(e.target.value)}
          placeholder="Upload image"
          setImage={setImage}
        />

        {/* description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>

          <textarea
            name="description"
            id="description"
            rows="6"
            value={product.description}
            onChange={handleChange}
            className="add-product-InputCSS"
          />
        </div>

        {/* submit button */}
        <div>
          <button type="submit" className="add-product-btn">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
