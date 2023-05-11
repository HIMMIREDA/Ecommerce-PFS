import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/shop/Home";
import NavBar from "./components/shop/layout/NavBar";
import Cart from "./components/shop/shoppingcart/Cart";
import { useState } from "react";
import Footer from "./components/shop/layout/Footer";
import Login from "./pages/shop/Login";
import Register from "./pages/shop/Register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Product from "./pages/shop/Product";

function App() {
  const [openCart, setOpenCart] = useState(false);
  return (
    <Router>

      <div className="flex flex-col min-h-[100vh] w-full">
        <ToastContainer />
        <NavBar setOpenCart={setOpenCart} />
        <Cart openCart={openCart} setOpenCart={setOpenCart} />
        <main className="flex flex-col justify-center mt-1 md:mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products/:productId" element={<Product />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
