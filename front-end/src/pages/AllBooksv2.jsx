import axios from "axios";
import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard/BookCard.jsx";
import Loader from "../components/Loader/Loader.jsx";
import { FaCheck } from "react-icons/fa";

const AllBooksv2 = () => {
  const [AllData, setAllData] = useState();
  const [GenreData, setGenreData] = useState();
  const [Genre, setGenre] = useState("All");
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8010/api/get-all-books"
        );
        // console.log("Check response: ", response);

        if (response && response.data && response.data.data) {
          setAllData(response.data.data);
          setGenreData(response.data.data);
        }
      } catch (error) {
        alert("Error!");
      }
    };

    fetch();
  }, []);

  const handleGenre = () => {
    if (Genre === "All") {
      setGenreData(AllData);
    } else {
      console.log("Check Genre in function: ", Genre);
      const data = AllData.filter((book) => {
        return book.genre === Genre;
      });
      console.log("Check data genre: ", data);
      setGenreData(data);
    }
  };

  return (
    <>
      {!GenreData && (
        <div className="h-screen bg-white flex items-center justify-center">
          <Loader />
        </div>
      )}
      {GenreData && (
        <div className="h-auto min-h-screen px-12 py-8">
          <div className="flex justify-between">
            <div className="text-3xl text-zinc-700 font-semibold">
              All Books
            </div>
            <div className={"flex mt-4"}>
              <select
                name="status"
                id=""
                className="bg-zinc-100"
                onChange={(event) => setGenre(event.target.value)}
              >
                {[
                  "All",
                  "Fantasy",
                  "Science Fiction",
                  "Action & Adventure",
                  "Romance",
                  "Horror",
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
                onClick={handleGenre}
              >
                <FaCheck />
              </button>
            </div>
          </div>

          <div className="my-8 grid grid-cols-4 gap-4">
            {GenreData.map((item, index) => {
              return (
                <div key={index}>
                  <BookCard data={item} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default AllBooksv2;
