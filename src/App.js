import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./features/navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./features/auth/components/SignUp";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import ProductDetails from "./features/product/components/ProductDetails";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItemsByUserIDAsync } from "./features/cart/CartSlice";
import { loggedInUserData } from "./features/auth/authSlice";
import PageNotFound from "./pages/PageNotFound";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrders from "./features/user/components/UserOrders";
import UserProfile from "./features/user/components/UserProfile";
import { fetchUserDataAsync } from "./features/user/UserSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import ProductFormPage from "./pages/ProductFormPage";
import AdminOrderPage from "./pages/AdminOrderPage";

function App() {
  const [openCart, setOpenCart] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(loggedInUserData);
  useEffect(() => {
    if (user) {
      // console.log(user.id);
      dispatch(fetchCartItemsByUserIDAsync(user.id));
      dispatch(fetchUserDataAsync(user.id));
    }
  }, [dispatch, user]);
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route element={<Protected setOpenCart={setOpenCart} />}>
              <Route
                element={
                  <Navbar openCart={openCart} setOpenCart={setOpenCart} />
                }
              >
                <Route path="/" element={<Home />} />
                <Route
                  path="/:productID"
                  element={
                    <ProductDetails
                      openCart={openCart}
                      setOpenCart={setOpenCart}
                    />
                  }
                />
                <Route path="/user-orders" element={<UserOrders />} />
                <Route path="/user-profile" element={<UserProfile />} />
              </Route>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success/:id" element={<OrderSuccessPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route element={<ProtectedAdmin setOpenCart={setOpenCart} />}>
              <Route
                element={
                  <Navbar openCart={openCart} setOpenCart={setOpenCart} />
                }
              >
                <Route path="/admin" element={<AdminHome />} />
                <Route
                  path="/admin/product-form"
                  element={<ProductFormPage />}
                />
                <Route
                  path="/admin/product-form/edit/:id"
                  element={<ProductFormPage />}
                />
                <Route
                  path="/admin/admin-orders"
                  element={<AdminOrderPage />}
                />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
