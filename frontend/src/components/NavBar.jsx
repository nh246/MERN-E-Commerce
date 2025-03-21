import { Link, NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import avatarImg from "../assets/avatar.png";
import { useState } from "react";
import { logout } from "../redux/features/auth/authSlice";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import CartModal from "../pages/shop/CartModal";
function NavBar() {

  const products = useSelector((state)=> state.cart.products)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const { user } = useSelector((state) => state.auth);
  // console.log(user);
  const dispatch = useDispatch();

  const [loginUser] = useLogoutUserMutation();

  const navigate = useNavigate();

  // drop down navigation

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  }

  const userDropdownMenus = [
    { lable: "Dashboard", path: "/dashboard" },
    { lable: "Profile", path: "/dashboard/profile" },
    { lable: "Payments", path: "/dashboard/payments" },
    { lable: "Orders", path: "/dashboard/orders" },
    { lable: "Reviews", path: "/dashboard/reviews" },
  ];

  const adminDropdownMenus = [
    { lable: "Dashboard", path: "/dashboard/admin" },
    { lable: "Manage Items", path: "/dashboard/manage-products" },
    { lable: "All Orders", path: "/dashboard/manage-orders" },
    { lable: "All Product", path: "/dashboard/add-product" },
  ];

  // role base dropdown show

  const dropDownMenues =
    user?.role === "admin" ? [...adminDropdownMenus] : [...userDropdownMenus];

  const handleLogout = async () => {
    try {
      await loginUser().unwrap();
      dispatch(logout());
      alert("Logout sucessfull");
      navigate("/");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li className="link">
            <NavLink
              to="/shop"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Shop
            </NavLink>
          </li>
          <li className="link">
            <NavLink
              to="/pages"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Pages
            </NavLink>
          </li>
          <li className="link">
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="nav__logo">
          <Link to="/">
            Lebaba<span>.</span>
          </Link>
        </div>
        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>
            </Link>
          </span>
          <span>
            <button 
            onClick={handleCartToggle}
            className="hover:text-primary">
              <i className="ri-shopping-bag-line"></i>
              <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">
                {products.length}
              </sup>
            </button>
          </span>
          <span>
            {user ? (
              <>
                <img
                  onClick={handleDropDownToggle}
                  src={user?.profileImage || avatarImg}
                  className="size-6 rounded-full cursor-pointer"
                />
                {isDropDownOpen && (
                  <div className="absolute right-0 mt-3 p-4 w-48 bg-white border-gray-200 border rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-4 p-2">
                      {dropDownMenues.map((menu, index) => (
                        <li key={index}>
                          <Link
                            className="dropdown-items"
                            onClick={() => handleDropDownToggle(false)}
                            to={menu.path}
                          >
                            {menu.lable}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link className="dropdown-items" onClick={handleLogout}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <i className="ri-user-line rounded-full cursor-pointer"></i>
              </Link>
            )}
          </span>
        </div>
      </nav>

      {/* cart model  */}
      {
        isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle} />
      }
    </header>
  );
}

export default NavBar;
