import { Route, Routes } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import ShopPage from "../pages/shop/ShopPage";
import CategoryPage from "../pages/category/CategoryPage";
import ErrorPage from "../components/ErrorPage";
import Login from "../components/Login";
import Register from "../components/Register";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
function RouterPage() {
  return (
    <Routes>
      <Route element={<App />} errorElement={<ErrorPage />}>
        <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:id" element={<SingleProduct />} />
        <Route path="/categories/:categoryName" element={<CategoryPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
  );
}

export default RouterPage;
