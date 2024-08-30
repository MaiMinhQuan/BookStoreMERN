import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader.jsx";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import UserData from "./UserData.jsx";

const AllOrders = () => {
  const [OrderHistory, setOrderHistory] = useState(); //order data
  const [Option, setOption] = useState(-1); //chọn order
  const [Value, setValue] = useState({ status: "" }); //status của order đang được chọn
  const [UserDiv, setUserDiv] = useState("hidden"); //hiện thông tin người đặt
  const [UserDivData, setUserDivData] = useState(); //thông tin người đặt
  const headers = {
    auth: localStorage.getItem("token"),
    id: localStorage.getItem("id"),
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8010/api/get-all-order`,
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
  }, [OrderHistory]);

  const handleSubmitStatus = async (i) => {
    const id = OrderHistory[i]._id;
    try {
      const response = await axios.put(
        `http://localhost:8010/api/update-order-status/${id}`,
        Value,
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Error!");
    }
  };

  return (
    <>
      <div className="px-12 h-auto  min-h-screen">
        {!OrderHistory && (
          <div className="h-screen flex items-center justify-center">
            <Loader />
          </div>
        )}
        {OrderHistory && OrderHistory.length === 0 && (
          <div className="h-screen">
            <div className="h-[100%] flex items-center justify-center flex-col">
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
                All Orders
              </h1>
            </div>

            <div className="text-zinc-900 font-semibold mt-4 w-full rounded py-2 px-4 flex gap-2">
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

              <div className="w-[5%] block ">
                <h1 className="">
                  <FaUser />
                </h1>
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
                        <h1 className="font-semibold">
                          <button
                            className="hover:scale-105 transition-all duration-300"
                            onClick={() => {
                              if (Option == index) setOption(-1);
                              else setOption(index);
                            }}
                          >
                            {item.status === "Order placed" ? (
                              <div className="text-yellow-500">
                                {item.status}
                              </div>
                            ) : item.status === "Cancel" ? (
                              <div className="text-red-500">{item.status}</div>
                            ) : (
                              <div className="text-green-500">
                                {item.status}
                              </div>
                            )}
                          </button>

                          <div
                            className={`${
                              Option !== index && "hidden"
                            } flex mt-4`}
                          >
                            <select
                              name="status"
                              id=""
                              onChange={(event) =>
                                setValue({ status: event.target.value })
                              }
                            >
                              {[
                                "Order placed",
                                "Out for delivery",
                                "Delivered",
                                "Cancel",
                              ].map((item1, index1) => {
                                return (
                                  <option value={item1} key={index1}>
                                    {item1}
                                  </option>
                                );
                              })}
                            </select>
                            <button
                              className="text-green-500 hover:text-pink-600 mx-2"
                              onClick={() => {
                                setOption(-1);
                                handleSubmitStatus(index);
                              }}
                            >
                              <FaCheck />
                            </button>
                          </div>
                        </h1>
                      </div>

                      <div className="w-[5%] block">
                        <button
                          className="text-2xl"
                          onClick={() => {
                            setUserDiv("fixed");
                            setUserDivData(item.user);
                          }}
                        >
                          <FiInfo />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}

            {UserDivData && (
              <UserData
                UserDivData={UserDivData}
                UserDiv={UserDiv}
                setUserDiv={setUserDiv}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AllOrders;
