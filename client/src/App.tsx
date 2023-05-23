import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/shop/Home";
import NavBar from "./components/shop/layout/NavBar";
import Cart from "./components/shop/shoppingcart/Cart";
import Footer from "./components/shop/layout/Footer";
import Login from "./pages/shop/Login";
import Register from "./pages/shop/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "./pages/shop/Product";
import Products from "./pages/shop/Products";
import PersistLogin from "./components/common/PersistLogin";
import PrivateRoute from "./components/common/PrivateRoute";
import Checkout from "./pages/shop/Checkout";
import ShoppingCart from './pages/shop/ShoppingCart';

function App() {
  return (
    <Router>
      <ToastContainer className="z-50" />
      <div className="flex flex-col min-h-[100vh] w-full">
        <NavBar />
        <Cart />
        <main className="flex flex-col justify-center mt-1 md:mt-5">
          <Routes>
            <Route element={<PersistLogin />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products/:productId" element={<Product />} />
              <Route path="/shop" element={<Products />} />
              <Route path="/cart" element={<ShoppingCart />} />
              {/* private routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/checkout" element={<Checkout />} />
              </Route>
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
