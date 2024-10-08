import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
    genre: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    auth: localStorage.getItem("token"),
    bookid: id,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8010/api/get-book-by-id/${id}`
        );
        console.log("Check response: ", response.data.data);

        if (response && response.data && response.data.data) {
          setData(response.data.data);
        }
      } catch (error) {
        alert("Error!");
      }
    };

    fetch();
  }, []);

  const handleOnChangeData = (event) => {
    const { name, value } = event.target;
    setData({ ...Data, [name]: value });
    console.log("Check data add book:", Data);
  };

  const handleSubmit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === "" ||
        Data.genre === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.put(
          "http://localhost:8010/api/update-book",
          Data,
          { headers }
        );

        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
          genre: "",
        });
        alert(response.data.message);
        navigate(`/view-book-details/${id}`);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-[100%] p-4">
      <h1 className="text-5xl font-semibold text-zinc-700 mb-8">Update Book</h1>

      <div className="p-4 rounded">
        <div>
          <label htmlFor="" className="text-zinc-900">
            Image URL
          </label>
          <input
            type="text"
            className="border border-emerald-500 w-full mt-2 text-zinc-900 p-2 outline-none"
            name="url"
            required
            value={Data.url}
            onChange={handleOnChangeData}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-900">
            Title of book
          </label>
          <input
            type="text"
            className="border border-emerald-500 w-full mt-2 text-zinc-900 p-2 outline-none"
            name="title"
            required
            value={Data.title}
            onChange={handleOnChangeData}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-900">
            Author of book
          </label>
          <input
            type="text"
            className="border border-emerald-500 w-full mt-2 text-zinc-900 p-2 outline-none"
            name="author"
            required
            value={Data.author}
            onChange={handleOnChangeData}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-900">
            Language
          </label>
          <input
            type="text"
            className="border border-emerald-500 w-full mt-2 text-zinc-900 p-2 outline-none"
            name="language"
            required
            value={Data.language}
            onChange={handleOnChangeData}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-900">
            Genre
          </label>
          <input
            type="text"
            className="border border-emerald-500 w-full mt-2 text-zinc-900 p-2 outline-none"
            placeholder="Fantasy, Science Fiction, Action & Adventure, Romance, Horror"
            name="genre"
            required
            value={Data.genre}
            onChange={handleOnChangeData}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="" className="text-zinc-900">
            Price
          </label>
          <input
            type="text"
            className="border border-emerald-500 w-full mt-2 text-zinc-900 p-2 outline-none"
            name="price"
            required
            value={Data.price}
            onChange={handleOnChangeData}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="" className="text-zinc-900">
            Description
          </label>
          <textarea
            type="text"
            className="border border-emerald-500 w-full mt-2 text-zinc-900 p-2 outline-none"
            name="desc"
            required
            value={Data.desc}
            onChange={handleOnChangeData}
          />
        </div>

        <button
          className="mt-4 px-3 bg-emerald-500 text-white font-semibold py-2 rounded hover:bg-emerald-400 transition-all duration-300"
          onClick={handleSubmit}
        >
          Update book
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
