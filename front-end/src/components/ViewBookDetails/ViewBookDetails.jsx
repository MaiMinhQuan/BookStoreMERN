import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader.jsx";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });
  const role = useSelector((state) => {
    return state.auth.role;
  });

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:8010/api/v1/get-book-by-id/${id}`
      );
      console.log("Check response: ", response.data.data);

      if (response && response.data && response.data.data) {
        setData(response.data.data);
      }
    };

    fetch();
  }, []);

  const headers = {
    id: localStorage.getItem("id"),
    auth: localStorage.getItem("token"),
    bookid: id,
  };

  const handleFavorite = async () => {
    const response = await axios.put(
      `http://localhost:8010/api/v1/add-book-to-favorite`,
      {},
      { headers }
    );
    console.log("Check response add favorite: ", response);
    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      `http://localhost:8010/api/v1/add-book-to-cart`,
      {},
      { headers }
    );
    console.log("Check response add cart: ", response);
    alert(response.data.message);
  };

  const handleDelete = async () => {
    const response = await axios.delete(
      `http://localhost:8010/api/v1/delete-book`,
      { headers }
    );
    console.log("Check response delete book: ", response);
    alert(response.data.message);
    navigate("/all-books");
  };

  return (
    <>
      {!Data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
      {Data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8">
          <div className="w-full lg:w-3/6">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 bg-zinc-800 rounded p-10">
              <img
                src={Data.url}
                alt=""
                className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded"
              />
              {isLoggedIn === true && role === "user" && (
                <div className=" flex flex-row md:flex-col gap-4">
                  <button
                    className="bg-white rounded-full text-2xl p-2 text-red-500"
                    onClick={handleFavorite}
                  >
                    <FaHeart />
                  </button>
                  <button
                    className="bg-white rounded-full text-2xl p-2 text-blue-500"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              )}

              {isLoggedIn === true && role === "admin" && (
                <div className=" flex flex-row md:flex-col gap-4">
                  <Link
                    to={`/update-book/${id}`}
                    className="bg-white rounded-full text-2xl p-2 text-blue-500"
                  >
                    <FaRegEdit />
                  </Link>
                  <button
                    className="bg-white rounded-full text-2xl p-2 text-red-500"
                    onClick={handleDelete}
                  >
                    <MdOutlineDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {Data.title}
            </h1>
            <p className="text-zinc-400 mt-1">{Data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" /> {Data.language}
            </p>
            <p className="text-zinc-100 mt-4 text-3xl font-semibold">
              Price: {Data.price}$
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
