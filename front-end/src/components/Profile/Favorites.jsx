import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard.jsx";
import Loader from "../Loader/Loader.jsx";

const Favorites = () => {
  const headers = {
    id: localStorage.getItem("id"),
    auth: localStorage.getItem("token"),
  };

  const [FavoriteBook, setFavoriteBook] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8010/api/get-favorite-book`,
          { headers }
        );
        // console.log("Check response favorite: ", response);

        if (response && response.data && response.data.data) {
          setFavoriteBook(response.data.data);
        }
      } catch (error) {
        alert("Error!");
      }
    };

    fetch();
  }, [FavoriteBook]);
  return (
    <>
      {!FavoriteBook && (
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
      {FavoriteBook && FavoriteBook.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center ">
            <h1 className="text-6xl font-semibold text-zinc-700">
              No favorite book
            </h1>
          </div>
        </div>
      )}
      <div className="grid grid-cols-4 gap-4">
        {FavoriteBook &&
          FavoriteBook.map((item, index) => {
            return (
              <div key={index}>
                <BookCard data={item} favorite={true} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Favorites;
