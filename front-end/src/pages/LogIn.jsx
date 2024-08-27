import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth.js";
import { useDispatch } from "react-redux";

const LogIn = () => {
  const [Value, setValue] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setValue({ ...Value, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (Value.username === "" || Value.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:8010/api/v1/log-in",
          Value
        );
        // console.log("Check data when log in: ", response);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        navigate("/profile");
      }
    } catch (error) {
      console.log("Error when log in: ", error);
    }
  };

  return (
    <div className="h-[83vh] bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Log In</p>
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
            <button
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded"
              onClick={handleSubmit}
            >
              Log in
            </button>
          </div>

          <div className="mt-4">
            <p className="flex items-center justify-center text-zinc-100 font-semibold">
              Don't have an account&nbsp;
              <Link to="/login" className="hover:text-blue-500">
                <u>Sign up</u>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
