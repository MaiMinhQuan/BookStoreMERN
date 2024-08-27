import React, { useEffect } from "react";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import AllBooks from "./pages/AllBooks.jsx";
import LogIn from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Cart from "./pages/Cart.jsx";
import Profile from "./pages/Profile.jsx";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails.jsx";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth.js";
import Favorites from "./components/Profile/Favorites.jsx";
import UserOrderHistory from "./components/Profile/UserOrderHistory.jsx";
import Settings from "./components/Profile/Settings.jsx";
import AllOrders from "./pages/AllOrders.jsx";
import AddBook from "./pages/AddBook.jsx";
import UpdateBook from "./pages/UpdateBook.jsx";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => {
    return state.auth.role;
  });

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" exact="true" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          {role === "user" ? (
            <Route index element={<Favorites />} />
          ) : (
            <Route index element={<AllOrders />} />
          )}

          {role === "admin" && (
            <Route path="/profile/add-book" element={<AddBook />} />
          )}

          <Route path="/profile/order-history" element={<UserOrderHistory />} />
          <Route path="/profile/settings" element={<Settings />} />
        </Route>
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        {role === "admin" && (
          <Route path="/update-book/:id" element={<UpdateBook />} />
        )}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
