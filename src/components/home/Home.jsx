import React from "react";
import { Link } from "react-router";

const home = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-10">
      <img src="../src/assets/pika.png" alt="logo" />
      <h2 className="text-3xl font-bold font-height-[26px]  text-center text-[#353535]">
        Welcome to Pokédex
      </h2>
      <p>
        The digital encyclopedia created by Professor Oak is an invaluable tool
        to Trainers in the Pokémon world.
      </p>
      <Link to="/list">
        <button className="bg-[#F22539] py-[11px] px-[20px] rounded-[60px] text-white font-bold hover:bg-[#e30c21] transition-all duration-200 hover:cursor-pointer">
          Get started
        </button>
      </Link>
    </div>
  );
};

export default home;
