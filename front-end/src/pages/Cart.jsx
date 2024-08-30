import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader.jsx";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    auth: localStorage.getItem("token"),
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8010/api/get-book-from-cart`,
          { headers }
        );

        if (response && response.data && response.data.data) {
          setCart(response.data.data);
        }
      } catch (error) {
        alert("Error!");
      }
    };

    fetch();
  }, [Cart]);

  const removeFromCart = async (bookid) => {
    try {
      const response = await axios.put(
        `http://localhost:8010/api/remove-book-from-cart/${bookid}`,
        {},
        { headers }
      );
      console.log("Check response remove cart: ", response);
      alert(response.data.message);
    } catch (error) {
      // console.log(error);
      alert("Error!");
    }
  };

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      for (let i = 0; i < Cart.length; i++) {
        total += Cart[i].price;
      }
      setTotal(total);
    }
  }, [Cart]);

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8010/api/place-order`,
        { order: Cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/order-history");
    } catch (error) {
      alert("Error!");
      // console.log(error);
    }
  };

  return (
    <>
      <div className="px-12 h-auto min-h-screen">
        {!Cart && (
          <div className="h-screen flex items-center justify-center">
            <Loader />
          </div>
        )}
        {Cart && Cart.length === 0 && (
          <div className="h-screen">
            <div className="h-[100%] flex items-center justify-center flex-col">
              <h1 className="text-6xl font-semibold text-zinc-700">
                Empty cart
              </h1>
            </div>
          </div>
        )}
        {Cart && Cart.length > 0 && (
          <>
            <h1 className="text-5xl font-semibold text-zinc-700 mb-8">
              Your cart
            </h1>
            {Cart.map((item, index) => {
              return (
                <div
                  className="bg-zinc-100 w-full my-4 rounded flex flex-row p-4 justify-between items-center "
                  key={index}
                >
                  <img
                    src={item.url}
                    alt=""
                    className="h-[10vh] object-cover"
                  />

                  <div className="w-auto">
                    <h1 className="text-2xl font-semibold text-zinc-700 text-start mt-2 md:mt-0">
                      {item.title}
                    </h1>
                    <p className="text-normal text-zinc-600 mt-2 block">
                      {item.desc.slice(0, 100)}...
                    </p>
                  </div>

                  <div className="mt-4 w-auto flex items-center justify-between">
                    <h2 className="text-3xl font-semibold text-zinc-700 flex">
                      {item.price}$
                    </h2>
                    <button
                      className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12 hover:text-red-500 hover:border-red-500"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="mt-4 w-full flex items-center justify-end">
              <div className="bg-zinc-100 p-4 rounded">
                <h1 className="text-3x1 text-zinc-700 font-semibold">
                  Total Amount
                </h1>

                <div className="mt-3 flex items-center justify-between text-xl text-zinc-700">
                  <h2>{Cart.length} books</h2> <h2>$ {Total}</h2>
                </div>

                <div className="w-[100%] mt-3">
                  <button
                    className="bg-emerald-400 text-white rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-emerald-300"
                    onClick={placeOrder}
                  >
                    Place your order
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
