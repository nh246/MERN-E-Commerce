import { Route, Routes } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import ShopPage from "../pages/shop/ShopPage";
import CategoryPage from "../pages/category/CategoryPage";
import ErrorPage from "../components/ErrorPage";
import Login from "../components/Login";
import Register from "../components/Register";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import PaymentSuccess from "../components/PaymentSuccess";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserDMain from "../pages/dashboard/user/dashboard/UserDMain";
function RouterPage() {
  return (
    <Routes>
      <Route element={<App />} errorElement={<ErrorPage />}>
        <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:id" element={<SingleProduct />} />
        <Route path="/categories/:categoryName" element={<CategoryPage />} />
        <Route path="/success" element={<PaymentSuccess />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute><DashboardLayout/></PrivateRoute>}>
        <Route index element={<UserDMain/>} />
        <Route path="profile" element={<h1>Profile</h1>} />
        <Route path="orders" element={<h1>Orders</h1>} />
        <Route path="payments" element={<h1>Payments</h1>}/>
        <Route path="reviews" element={<h1>reviews</h1>}/>
        <Route path="admin" element={ <PrivateRoute role={"admin"} ><h1>admin dashboard</h1></PrivateRoute> }/>
        <Route path="add-product" element={<PrivateRoute role={"admin"}><h1>add-product</h1></PrivateRoute>}/>
        <Route path="manage-products" element={<PrivateRoute role={"admin"}><h1>manage-products</h1></PrivateRoute>}/>
        <Route path="update-product/:id" element={<PrivateRoute role={"admin"}><h1>update-product</h1></PrivateRoute>}/>
        <Route path="manage-orders" element={<PrivateRoute role={"admin"}><h1>manage-orders</h1></PrivateRoute>}/>
        <Route path="users" element={<PrivateRoute role={"admin"}><h1>manage-users</h1></PrivateRoute>}/>
      </Route>
    </Routes>
  );
}

export default RouterPage;
