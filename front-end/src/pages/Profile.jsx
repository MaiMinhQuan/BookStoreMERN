import React, { useState, useEffect } from "react";
import Sidebar from "../components/Profile/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader/Loader.jsx";

const Profile = () => {
  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });

  const [Profile, setProfile] = useState({});

  const headers = {
    id: localStorage.getItem("id"),
    auth: localStorage.getItem("token"),
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8010/api/get-user-information",
          { headers }
        );
        // console.log("Check user info: ", response.data);
        setProfile(response.data);
      } catch (error) {
        alert("Error!");
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {!Profile && (
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
      {Profile && (
        <div className="px-12 flex flex-row h-auto py-8 gap-4 text-white">
          <div className="w-1/6">
            <Sidebar data={Profile} />
          </div>

          <div className="w-5/6">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
