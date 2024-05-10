import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { MdArrowDropDown } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="flex justify-end px-4 items-center mx-4 my-4 gap-2">
      <div>
        <BsPersonCircle size={`${1.5}rem`} />
      </div>
      <div>Control Nguyen</div>
      <div>
        <MdArrowDropDown size={`${3}rem`} />
      </div>
    </div>
  );
};

export default Navbar;
