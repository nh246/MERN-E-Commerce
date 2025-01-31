import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
