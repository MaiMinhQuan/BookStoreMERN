import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];

  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });

  const role = useSelector((state) => {
    return state.auth.role;
  });

  if (isLoggedIn === false) {
    links.splice(2, 3);
  }

  if (isLoggedIn === true && role === "admin") {
    links.splice(2, 2);
  }

  if (isLoggedIn === true && role === "user") {
    links.splice(4, 1);
  }

  const [MobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className="z-50 relative flex bg-emerald-400 text-white px-8 py-4 items-center justify-between">
        <div className="flex item-center">
<<<<<<< HEAD
          <Link to={"/"} className="h-10 me-4" alt="logo">
=======
          <Link
            to={"/"}
            className="h-10 me-4"
            src="https://cdn-icons-png.freepik.com/256/16649/16649456.png?ga=GA1.1.1338809600.1713531712&semt=ais_hybrid"
            alt="logo"
          >
>>>>>>> 3958f272a44957e7d8669bd80d0a8c684b7f3c7c
            <h1 className="text-2xl font-semibold">BookStore</h1>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-4">
            {links.map((item, index) => {
              return (
                <Link
                  to={item.link}
                  className={"hover:text-black transition-all duration-300"}
                  key={index}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
          {!isLoggedIn && (
            <>
              <div className="flex gap-4">
                <Link
                  to={"/log-in"}
                  className={
                    "px-4 py-1 border border-white rounded text-white hover:text-zinc-800 hover:bg-white  transition-all duration-300"
                  }
                >
                  Log in
                </Link>
                <Link
                  to={"/sign-up"}
                  className={
                    "px-4 py-1 border border-white rounded text-white hover:text-zinc-800 hover:bg-white  transition-all duration-300"
                  }
                >
                  Sign up
                </Link>
              </div>
            </>
          )}

          {isLoggedIn && (
            <>
              <div className="flex gap-4">
                <button
                  className="px-4 py-1 border border-white rounded hover:text-zinc-800 hover:bg-white transition-all duration-300"
                  onClick={() => {
                    dispatch(authActions.logout());
                    dispatch(authActions.changeRole("user"));
                    localStorage.clear("id");
                    localStorage.clear("token");
                    localStorage.clear("role");
                    navigate("/");
                  }}
                >
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
