import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader.jsx";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const headers = {
    id: localStorage.getItem("id"),
    auth: localStorage.getItem("token"),
  };

  const [OrderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:8010/api/v1/get-order-history`,
        { headers }
      );

      if (response && response.data && response.data.data) {
        setOrderHistory(response.data.data);
      }
    };

    fetch();
  }, []);
  console.log("Check orderHistory: ", OrderHistory);
  return (
    <>
      <div className="bg-zinc-900 px-12 h-auto">
        {!OrderHistory && (
          <div className="h-screen bg-zinc-900 flex items-center justify-center">
            <Loader />
          </div>
        )}
        {OrderHistory && OrderHistory.length === 0 && (
          <div className="h-screen">
            <div className="h-[100%] flex items-center justify-center flex-col">
              <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
                No Order History
              </h1>
            </div>
          </div>
        )}
        {OrderHistory && OrderHistory.length > 0 && (
          <>
            <div className="p-0 md:p-4 text-zinc-100">
              <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
                Your Order History
              </h1>
            </div>

            <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
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
              <div className="w-none md:w-[5%] hidden md:block ">
                <h1 className="">Mode</h1>
              </div>
            </div>

            {OrderHistory.map((item, index) => {
              return (
                <div
                  className="w-full rounded  py-2 px-4 bg-zinc-800 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer"
                  key={index}
                >
                  {item && item.book && (
                    <>
                      <div className="w-[3%]">
                        <h1 className="text-center">{index + 1}</h1>
                      </div>
                      <img
                        src={item.url}
                        alt=""
                        className="h-[20vh] md:h-[10vh] object-cover"
                      />

                      <div className="w-[22%]">
                        <Link
                          className="hover:text-blue-300"
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

                      <div className="w-none md:w-[5%] hidden md:block">
                        <h1 className="text-sm text-zinc-400">COD</h1>
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
