import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <NavBar />
      <main className="min-h-screen">

      <Outlet />
      </main>
      <Footer/>
    </div>
  );
}

export default App;
