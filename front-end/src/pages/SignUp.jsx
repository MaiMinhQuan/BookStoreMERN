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
          "http://localhost:8010/api/v1/sign-up",
          Value
        );
        navigate("/log-in");
        console.log("Check data sign up: ", response);
      }
    } catch (error) {
      console.log("Error when sign up: ", error);
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign Up</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Username
            </label>

            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              name="username"
              required
              value={Value.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Email
            </label>

            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              name="email"
              required
              value={Value.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Password
            </label>

            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              name="password"
              required
              value={Value.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Address
            </label>

            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              name="address"
              required
              value={Value.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4">
            <button
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded"
              onClick={handleSubmit}
            >
              Sign up
            </button>
          </div>

          <div className="mt-4">
            <p className="flex items-center justify-center text-zinc-100 font-bold ">
              Or
            </p>
          </div>

          <div className="mt-4">
            <p className="flex items-center justify-center text-zinc-100 font-semibold">
              Already have an account&nbsp;
              <Link to="/login" className="hover:text-blue-500">
                <u>Log in</u>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
