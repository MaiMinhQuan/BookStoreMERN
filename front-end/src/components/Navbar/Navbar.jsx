import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
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
    links.splice(3, 1);
  }

  if (isLoggedIn === true && role === "user") {
    links.splice(4, 1);
  }

  const [MobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <div className="flex item-center">
          <Link
            to={"/"}
            className="h-10 me-4"
            src="https://cdn-icons-png.freepik.com/256/16649/16649456.png?ga=GA1.1.1338809600.1713531712&semt=ais_hybrid"
            alt="logo"
          >
            <h1 className="text-2xl font-semibold">BookHeaven</h1>
          </Link>
        </div>
        <div className="nav-links-bookheaven block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((item, index) => {
              return (
                <Link
                  to={item.link}
                  className={` hover:text-blue-500 transition-all duration-300`}
                  key={index}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
          {!isLoggedIn && (
            <>
              <div className="hidden md:flex gap-4">
                <Link
                  to={"/log-in"}
                  className={` px-4 py-1 border border-blue-500 rounded text-white hover:text-zinc-800 hover:bg-white  transition-all duration-300`}
                >
                  Log in
                </Link>
                <Link
                  to={"/sign-up"}
                  className={`px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}
                >
                  Sign up
                </Link>
              </div>
            </>
          )}
          <button
            className="block md:hidden text-white text-2xl hover:text-zinc-400"
            onClick={() => {
              setMobileNav(MobileNav === "hidden" ? "block" : "hidden");
            }}
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div
        className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((item, index) => {
          return (
            <Link
              to={item.link}
              className={`${MobileNav} text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300`}
              key={index}
              onClick={() => {
                setMobileNav(MobileNav === "hidden" ? "block" : "hidden");
              }}
            >
              {item.title}
            </Link>
          );
        })}
        {!isLoggedIn && (
          <>
            <Link
              to={"/log-in"}
              className={`${MobileNav} px-8 mb-8 text-5xl font-semibold py-2 border border-blue-500 rounded text-white hover:text-zinc-800 hover:bg-white  transition-all duration-300`}
              onClick={() => {
                setMobileNav(MobileNav === "hidden" ? "block" : "hidden");
              }}
            >
              Log in
            </Link>
            <Link
              to={"/sign-up"}
              className={`${MobileNav} px-8 mb-8 text-5xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}
              onClick={() => {
                setMobileNav(MobileNav === "hidden" ? "block" : "hidden");
              }}
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
