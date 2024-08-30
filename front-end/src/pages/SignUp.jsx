import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [Value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setValue({ ...Value, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (
        Value.username === "" ||
        Value.email === "" ||
        Value.password === "" ||
        Value.address === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:8010/api/sign-up",
          Value
        );
        navigate("/log-in");
        console.log("Check data sign up: ", response);
      }
    } catch (error) {
      alert("Error when sign up");
      console.log("Error when sign up: ", error);
    }
  };

  return (
    <div className="h-auto px-12 py-8 flex items-center justify-center">
      <div className="border border-emerald-500 rounded-lg px-8 py-5 w-2/6">
        <p className="text-zinc-700 text-xl text-center">Sign Up</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-700">
              Username
            </label>

            <input
              type="text"
              className="border border-emerald-500 w-full mt-2 text-zinc-700 p-2 outline-none"
              name="username"
              required
              value={Value.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="" className="text-zinc-700">
              Email
            </label>

            <input
              type="text"
              className="border border-emerald-500 w-full mt-2 text-zinc-700 p-2 outline-none"
              name="email"
              required
              value={Value.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="" className="text-zinc-700">
              Password
            </label>

            <input
              type="password"
              className="border border-emerald-500 w-full mt-2 text-zinc-700 p-2 outline-none"
              name="password"
              required
              value={Value.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="" className="text-zinc-700">
              Address
            </label>
            <input
              type="text"
              className="border border-emerald-500 w-full mt-2 text-zinc-700 p-2 outline-none"
              name="address"
              required
              value={Value.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4">
            <button
              className="w-full bg-emerald-500 text-white font-semibold py-2 rounded hover:bg-emerald-400"
              onClick={handleSubmit}
            >
              Sign up
            </button>
          </div>

          <div className="mt-4">
            <p className="flex items-center justify-center text-zinc-700 font-semibold">
              Or
            </p>
          </div>

          <div className="mt-4">
            <p className="flex items-center justify-center text-zinc-700 font-semibold">
              Already have an account&nbsp;
              <button
                className="hover:text-emerald-500"
                onClick={() => {
                  navigate("/log-in");
                }}
              >
                <u>Log in</u>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
