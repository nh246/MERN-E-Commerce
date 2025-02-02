import { Route, Routes } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import ShopPage from "../pages/shop/ShopPage";
import CategoryPage from "../pages/category/CategoryPage";
import ErrorPage from "../components/ErrorPage";
function RouterPage() {
  return (
    <Routes>
      <Route element={<App />} errorElement={<ErrorPage/>} >
        <Route path="/" element={<Home/>} errorElement={<ErrorPage/>} />
        <Route path="/shop" element={<ShopPage/>} />
        <Route path="/categories/:categoryName" element={<CategoryPage/>} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default RouterPage;
