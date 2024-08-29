import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth.js";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => {
    return state.auth.role;
  });

  return (
    <div className="bg-emerald-400 p-4 rounded flex flex-col items-center justify-between h-[80vh]">
      <div className="flex flex-col items-center justify-center">
        <img src={data.avatar} alt="" className="h-[12vh]" />

        <p className="mt-1 text-normal text-zinc-100 font-semibold">
          {data.username}
        </p>

        <p className="mt-1 text-normal text-zinc-100">{data.email}</p>

        <div className="w-full mt-4 h-[1px] bg-zinc-100 hidden lg:block"></div>
      </div>

      {role === "user" && (
        <div className="w-full flex flex-col items-center justify-center">
          <Link
            to={"/profile"}
            className={`text-zinc-100 font-semibold w-full py-2 text-center hover:bg-white hover:text-zinc-900 rounded transition-all duration-300`}
          >
            Favorites
          </Link>
          <Link
            to={"/profile/order-history"}
            className={`text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-white hover:text-zinc-900 rounded transition-all duration-300`}
          >
            Order History
          </Link>
          <Link
            to={"/profile/settings"}
            className={`text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-white hover:text-zinc-900 rounded transition-all duration-300`}
          >
            Settings
          </Link>
        </div>
      )}

      {role === "admin" && (
        <div className="w-full flex flex-col items-center justify-center">
          <Link
            to={"/profile"}
            className={`text-zinc-100 font-semibold w-full py-2 text-center hover:bg-white hover:text-zinc-900 rounded transition-all duration-300`}
          >
            All Orders
          </Link>
          <Link
            to={"/profile/add-book"}
            className={`text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-white hover:text-zinc-900 rounded transition-all duration-300`}
          >
            Add Book
          </Link>
        </div>
      )}

      <button
        className="gb-zinc-900 w-full mt-4 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300"
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
        <FaArrowRightFromBracket className="ms-4" />
      </button>
    </div>
  );
};

export default Sidebar;
