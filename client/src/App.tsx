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
import ShoppingCart from "./pages/shop/ShoppingCart";
import Profile from "./pages/shop/Profile";
import MultiStepCheckout from "./pages/shop/MultiStepCheckout";
import Address from "./pages/shop/Address";
import CheckoutSuccess from "./pages/shop/CheckoutSuccess";
import Orders from "./pages/shop/Orders";
import Changepassword from "./pages/shop/ChangePassword";
import Categories from "./pages/shop/Categories";
import Brands from "./pages/shop/Brands";
import WishList from "./pages/shop/WishList";

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
              <Route path="/categories" element={<Categories />} />
              <Route path="/brands" element={<Brands />} />
              {/* private routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/wishlist" element={<WishList />} />
                <Route path="/checkout" element={<MultiStepCheckout />}>
                  <Route path="addressForm" element={<Address />} />
                  <Route path="checkoutForm" element={<Checkout />} />
                  <Route path="success" element={<CheckoutSuccess />} />
                </Route>
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/change-password" element={<Changepassword />} />
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
