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
      const response = await axios.get(
        `http://localhost:8010/api/v1/get-book-from-cart`,
        { headers }
      );

      if (response && response.data && response.data.data) {
        setCart(response.data.data);
      }
    };

    fetch();
  }, [Cart]);

  const removeFromCart = async (bookid) => {
    try {
      const response = await axios.put(
        `http://localhost:8010/api/v1/remove-book-from-cart/${bookid}`,
        {},
        { headers }
      );
      console.log("Check response remove cart: ", response);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
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
      console.log("Check cart: ", Cart);
      const response = await axios.post(
        `http://localhost:8010/api/v1/place-order`,
        { order: Cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/order-history");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-zinc-900 px-12 h-screen">
        {!Cart && (
          <div className="h-screen bg-zinc-900 flex items-center justify-center">
            <Loader />
          </div>
        )}
        {Cart && Cart.length === 0 && (
          <div className="h-screen">
            <div className="h-[100%] flex items-center justify-center flex-col">
              <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
                Empty cart
              </h1>
            </div>
          </div>
        )}
        {Cart && Cart.length > 0 && (
          <>
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              Your cart
            </h1>
            {Cart.map((item, index) => {
              return (
                <div
                  className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
                  key={index}
                >
                  <img
                    src={item.url}
                    alt=""
                    className="h-[20vh] md:h-[10vh] object-cover"
                  />

                  <div className="w-full md:w-auto">
                    <h1 className="text-2xl font-semibold text-zinc-100 text-start mt-2 md:mt-0">
                      {item.title}
                    </h1>
                    <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                      {item.desc.slice(0, 100)}...
                    </p>
                    <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                      {item.desc.slice(0, 65)}...
                    </p>
                    <p className="text-normal text-zinc-300 mt-2 block md:block">
                      {item.desc.slice(0, 100)}...
                    </p>
                  </div>

                  <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                    <h2 className="text-3xl font-semibold text-zinc-100 flex">
                      {item.price}$
                    </h2>
                    <button
                      className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="mt-4 w-full flex items-center justify-end">
              <div className="p-4 bg-zinc-800 rounded">
                <h1 className="text-3x1 text-zinc-200 font-semibold">
                  Total Amount
                </h1>

                <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                  <h2>{Cart.length} books</h2> <h2>$ {Total}</h2>
                </div>

                <div className="w-[100%] mt-3">
                  <button
                    className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc"
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
