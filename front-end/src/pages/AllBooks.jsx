import axios from "axios";
import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard/BookCard.jsx";
import Loader from "../components/Loader/Loader.jsx";

const AllBooks = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8010/api/v1/get-all-books"
      );
      // console.log("Check response: ", response);

      if (response && response.data && response.data.data) {
        setData(response.data.data);
      }
    };

    fetch();
  }, []);

  return (
    <>
      {!Data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
      {Data && (
        <div className="bg-zinc-900 h-auto min-h-screen px-12 py-8">
          <h4 className="text-3xl text-yellow-100">All Books</h4>
          <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Data.map((item, index) => {
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

export default AllBooks;
