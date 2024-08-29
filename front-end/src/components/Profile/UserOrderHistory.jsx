import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader.jsx";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const headers = {
    id: localStorage.getItem("id"),
    auth: localStorage.getItem("token"),
  };

  const [OrderHistory, setOrderHistory] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8010/api/v1/get-order-history`,
          { headers }
        );

        if (response && response.data && response.data.data) {
          setOrderHistory(response.data.data);
        }
      } catch (error) {
        alert("Error!");
      }
    };

    fetch();
  }, []);
  console.log("Check order history: ", OrderHistory);
  return (
    <>
      <div className="px-12 h-auto min-h-screen">
        {!OrderHistory && (
          <div className="h-screen flex items-center justify-center">
            <Loader />
          </div>
        )}
        {OrderHistory && OrderHistory.length === 0 && (
          <div className="h-screen">
            <div className="h-[100%] flex flex-col items-center justify-center ">
              <h1 className="text-6xl font-semibold text-zinc-700">
                No Order History
              </h1>
            </div>
          </div>
        )}
        {OrderHistory && OrderHistory.length > 0 && (
          <>
            <div className="p-4">
              <h1 className="text-5xl font-semibold text-zinc-700 mb-8">
                Your Order History
              </h1>
            </div>

            <div className="text-black font-semibold mt-4 w-full rounded py-2 px-4 flex gap-2 ">
              <div className="w-[3%]">
                <h1 className="text-center">No</h1>
              </div>
              <div className="w-[22%] ">
                <h1 className="">Books</h1>
              </div>
              <div className="w-[45%] ">
                <h1 className="">Description</h1>
              </div>
              <div className="w-[9%] ">
                <h1 className="">Price</h1>
              </div>
              <div className="w-[16%] ">
                <h1 className="">Status</h1>
              </div>

              <div className="w-[5%] block">
                <h1 className="">Mode</h1>
              </div>
            </div>

            {OrderHistory.map((item, index) => {
              return (
                <div
                  className="text-zinc-900 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-100 hover:cursor-pointer"
                  key={index}
                >
                  {item && item.book && (
                    <>
                      <div className="w-[3%]">
                        <h1 className="text-center">{index + 1}</h1>
                      </div>

                      <div className="w-[22%]">
                        <Link
                          className="hover:text-emerald-400"
                          to={`/view-book-details/${item.book._id}`}
                        >
                          {item.book.title}
                        </Link>
                      </div>

                      <div className="w-[45%]">
                        <h1 className="">{item.book.desc.slice(0, 50)}...</h1>
                      </div>

                      <div className="w-[9%]">
                        <h1 className="">{item.book.price}</h1>
                      </div>

                      <div className="w-[16%]">
                        <h1 className="font-semibold text-green-500">
                          {item.status === "Order placed" ? (
                            <div className="text-yellow-500">{item.status}</div>
                          ) : item.status === "Cancel" ? (
                            <div className="text-red-500">{item.status}</div>
                          ) : (
                            item.status
                          )}
                        </h1>
                      </div>

                      <div className="w-[5%] hidden md:block">
                        <h1 className="text-sm text-zinc-900">COD</h1>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default UserOrderHistory;
