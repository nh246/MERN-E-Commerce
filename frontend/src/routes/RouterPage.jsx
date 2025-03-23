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
import UserOrders from "../pages/dashboard/user/orders/UserOrders";
import OrderDetail from "../pages/dashboard/user/orders/OrderDetail";
import UserPayments from "../pages/dashboard/user/payments/UserPayments";
import UserReviews from "../pages/dashboard/user/reviews/UserReviews";
import UserProfile from "../pages/dashboard/user/profile/UserProfile";
import AdminDMain from './../pages/dashboard/admin/dashboard/AdminDMain';
import ManageUsers from './../pages/dashboard/admin/users/ManageUsers';
import ManageOrders from './../pages/dashboard/admin/orders/ManageOrders';
import AddProduct from './../pages/dashboard/admin/addProduct/AddProduct';
import ManageProducts from "../pages/dashboard/admin/manageProduct/ManageProducts";
import UpdateProduct from './../pages/dashboard/admin/manageProduct/UpdateProduct';
function RouterPage() {
  return (
    <Routes>
      <Route element={<App />} errorElement={<ErrorPage />}>
        <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:id" element={<SingleProduct />} />
        <Route path="/categories/:categoryName" element={<CategoryPage />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/orders/:orderId" element={<OrderDetail/>} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute><DashboardLayout/></PrivateRoute>}>
        <Route index element={<UserDMain/>} />
        <Route path="profile" element={<UserProfile/>} />
        <Route path="orders" element={<UserOrders/>} />
        <Route path="payments" element={<UserPayments/>}/>
        <Route path="reviews" element={<UserReviews/>}/>
        <Route path="admin" element={ <PrivateRoute role={"admin"} ><AdminDMain/></PrivateRoute> }/>
        <Route path="add-product" element={<PrivateRoute role={"admin"}><AddProduct/></PrivateRoute>}/>
        <Route path="manage-products" element={<PrivateRoute role={"admin"}><ManageProducts/></PrivateRoute>}/>
        <Route path="update-product/:id" element={<PrivateRoute role={"admin"}><UpdateProduct/></PrivateRoute>}/>
        <Route path="manage-orders" element={<PrivateRoute role={"admin"}><ManageOrders/></PrivateRoute>}/>
        <Route path="users" element={<PrivateRoute role={"admin"}><ManageUsers/></PrivateRoute>}/>
      </Route>
    </Routes>
  );
}

export default RouterPage;
