import React from "react";
import Button from "./Button";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <p className="text-3xl font-bold font-height-[26px] text-[#353535]">
        Uh-oh! 
      </p>
      <p>You look lost on your journey!</p>
      <Link to="/">
        <Button
          color="bg-[#F22539]"
          width="w-[155px]"
          height="h-[44px]"
          hoverColor="hover:bg-[#e30c21]"
          text="Go back home"
        />
      </Link>
    </div>
  );
};

export default NotFound;
