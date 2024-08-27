import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard.jsx";

const Favorites = () => {
  const headers = {
    id: localStorage.getItem("id"),
    auth: localStorage.getItem("token"),
  };

  const [FavoriteBook, setFavoriteBook] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:8010/api/v1/get-favorite-book`,
        { headers }
      );
      console.log("Check response favorite: ", response);

      if (response && response.data && response.data.data) {
        setFavoriteBook(response.data.data);
      }
    };

    fetch();
  }, [FavoriteBook]);
  return (
    <div className="grid grid-cols-4 gap-4">
      {FavoriteBook && FavoriteBook.length === 0 && <>No favorite book</>}
      {FavoriteBook &&
        FavoriteBook.map((item, index) => {
          return (
            <div key={index}>
              <BookCard data={item} favorite={true} />
            </div>
          );
        })}
    </div>
  );
};

export default Favorites;
