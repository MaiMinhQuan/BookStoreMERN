import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-[75vh] flex flex-row">
      <div className="w-3/6 flex flex-col items-start justify-center">
        <h1 className="text-6xl font-semibold text-emerald-500 drop-shadow-2xl">
          Discover Endless Source Of Knowledge
        </h1>

        <p className="mt-4 text-xl text-zinc-700">
          "A book is a garden, an orchard, a storehouse, a party, a company by
          the way, a counselor, a multitude of counselors." – Charles Baudelaire
        </p>
        <div className="mt-8 ">
          <Link
            to={"/all-books"}
            className="text-emerald-500 text-2xl font-semibold border border-emerald-500 px-10 py-3 hover:bg-emerald-500 hover:text-white rounded-full"
          >
            Discover Books
          </Link>
        </div>
      </div>

      <div className="w-3/6 h-[100%] flex items-center justify-center">
        <img src="/hero.png" alt="/hero" />
      </div>
    </div>
  );
};

export default Hero;
