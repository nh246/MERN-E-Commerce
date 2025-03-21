import { useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { Link, NavLink, useNavigate } from "react-router";
import { logout } from "../../redux/features/auth/authSlice";

function UserDashboard() {
  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/dashboard/orders", label: "Orders" },
    { path: "/dashboard/payments", label: "Payments" },
    { path: "/dashboard/profile", label: "Profile" },
    { path: "/dashboard/reviews", label: "Reviews" },
  ];

  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between">
      <div>
        <div className="nav__logo">
          <Link to="/">
            Lebaba<span>.</span>
          </Link>
          <p className="text-xs italic">User Dashboard</p>

          <hr className="mt-5" />
        </div>
        <ul className="space-y-5 pt-5">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active font-bold" : ""
                }
                to={item.path}
                end
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* logout  */}
        <div className="mb-5 mt-5">
          <hr className="mb-5" />

          <button
            onClick={handleLogout}
            className="text-white bg-red-500 font-medium px-5 py-1 rounded-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
