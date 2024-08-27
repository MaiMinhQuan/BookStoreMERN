import axios from "axios";
import React, { useState, useEffect } from "react";
import BookCard from "../BookCard/BookCard.jsx";
import Loader from "../Loader/Loader.jsx";

const RecentlyAdded = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8010/api/v1/get-recent-books"
      );
      // console.log("Check response: ", response);

      if (response && response.data && response.data.data) {
        setData(response.data.data);
      }
    };

    fetch();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-100">Recently Added Books</h4>
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {!Data && (
          <div className="flex items-center justify-center my-8">
            <Loader />
          </div>
        )}
        {Data &&
          Data.map((item, index) => {
            return (
              <div key={index}>
                <BookCard data={item} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RecentlyAdded;
