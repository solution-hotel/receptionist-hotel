import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { MdArrowDropDown } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between px-4 items-center gap-2 border-b border-black bg-[#F9F8F8]">
      <div className="font-bold text-[#2457C5]">BLUE HOUSE</div>
      <div className="flex flex-row items-center">
        <div className="mr-2">
          <BsPersonCircle size={`${1.5}rem`} />
        </div>
        <div>Tran Nguyen</div>
        <div>
          <MdArrowDropDown size={`${3}rem`} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
