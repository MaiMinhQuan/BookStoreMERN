import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader.jsx";

const Settings = () => {
  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    auth: localStorage.getItem("token"),
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8010/api/v1/get-user-information`,
          { headers }
        );

        setProfileData(response.data);
        setValue({ address: response.data.address });
      } catch (error) {
        alert("Error!");
      }
    };

    fetch();
  }, []);

  const handleOnChangeAddress = (event) => {
    const { name, value } = event.target;
    setValue({ ...Value, [name]: value });
  };

  const handleSubmitAddress = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8010/api/v1/update-address",
        Value,
        { headers }
      );
      // console.log(response);
      alert(response.data.message);
    } catch (error) {
      alert("Error!");
    }
  };

  return (
    <>
      {!ProfileData && (
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}

      {ProfileData && (
        <div className="h-[100%] p-4 text-zinc-700">
          <h1 className="text-5xl font-semibold text-zinc-700 mb-8">
            Settings
          </h1>
          <div className="flex gap-12">
            <div className="">
              <label htmlFor="" className="font-semibold">
                Username
              </label>

              <p className="border border-emerald-500 p-2 rounded mt-2">
                {ProfileData.username}
              </p>
            </div>

            <div className="">
              <label htmlFor="" className="font-semibold">
                Email
              </label>

              <p className="border border-emerald-500 p-2 rounded mt-2">
                {ProfileData.email}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col ">
            <label htmlFor="" className="font-semibold">
              Address
            </label>
            <textarea
              className="border border-emerald-500 p-2 rounded mt-2 rounded"
              rows="5"
              placeholder="Address"
              name="address"
              value={Value.address}
              onChange={handleOnChangeAddress}
            />
          </div>

          <div className="mt-4 flex justify-end ">
            <button
              className="bg-emerald-400 text-zinc-100 font-semibold px-3 py-2 rounded hover:bg-emerald-500 transition-all duration-300"
              onClick={handleSubmitAddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
