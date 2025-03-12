import React from "react";
import { Link } from "react-router";
import Button from "../common/Button";

const home = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-10">
      <img src="../public/pika.png" alt="logo" />
      <h2 className="text-3xl font-bold font-height-[26px]  text-center text-[#353535]">
        Welcome to Pokédex
      </h2>
      <p>
        The digital encyclopedia created by Professor Oak is an invaluable tool
        to Trainers in the Pokémon world.
      </p>
      <Link to="/list">
        <Button color="bg-[#F22539]" width="w-[131px]" height="h-[44px]"  text="Get started" hoverColor="hover:bg-[#e30c21]" />
      </Link>
    </div>
  );
};

export default home;
