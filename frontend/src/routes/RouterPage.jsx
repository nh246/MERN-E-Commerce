import { Route, Routes } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import ShopPage from "../pages/shop/ShopPage";
function RouterPage() {
  return (
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home/>} />
        <Route path="/shop" element={<ShopPage/>} />
      </Route>
    </Routes>
  );
}

export default RouterPage;
