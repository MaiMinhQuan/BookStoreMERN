import React from "react";
import Hero from "../components/Home/Hero.jsx";
import RecentlyAdded from "../components/Home/RecentlyAdded.jsx";
const Home = () => {
  return (
    <div className="text-zinc-900 px-10 py-8">
      <Hero />
      <RecentlyAdded />
    </div>
  );
};

export default Home;
