import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, favorite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    auth: localStorage.getItem("token"),
    bookid: data._id,
  };

  const handleRemoveFromFavorite = async () => {
    const response = await axios.put(
      `http://localhost:8010/api/remove-book-from-favorite`,
      {},
      { headers }
    );
    // console.log("Check response remove favorite: ", response);
    alert(response.data.message);
  };

  return (
    <div className="border border-emerald-400 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-100 rounded flex items-center justify-center">
          <img src={data.url} alt="" className="h-[25vh]" />
        </div>

        <h2 className="mt-4 text-2xl text-zinc-700 font-semibold">
          {data.title}
        </h2>

        <p className="mt-2 text-xl text-emerald-500">by {data.author}</p>

        <p className="mt-4 text-xl text-zinc-700 font-semibold">
          {data.price}$
        </p>
      </Link>
      {favorite === true && (
        <button
          className="px-4 py-2 rounded border border-emerald-500 text-emerald-500 mt-4 hover:bg-emerald-500 hover:text-white"
          onClick={handleRemoveFromFavorite}
        >
          Remove from favorite
        </button>
      )}
    </div>
  );
};

export default BookCard;
