"use client";
import React, { useEffect, useState, useRef } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { MdArrowDropDown, MdLogout } from "react-icons/md";
import { getProfile } from "./../utils/api/receptionist";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { UserProfile } from "../utils/types/user";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/store/reducers/userloginReducer";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const dispatch = useDispatch();
  const router = useRouter();
  const dataUser = useSelector((state: RootState) => state.userlogin.login);
  const token = dataUser?.token;
  const [userProfile, setUserProfile] = useState<UserProfile | null>();
  const getData = async () => {
    try {
      console.log("Fetching user profile...");
      const user = await getProfile(token);
      setUserProfile(user.Data);
      console.log("Data user login:", user.Data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  const handleLogout = () => {
    console.log("Logging out...");
    dispatch(logoutUser());
    router.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  useEffect(() => {
    if (token) {
      getData();
    }
  }, [token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="w-full flex justify-between px-4 items-center gap-2 border-b border-black bg-[#F9F8F8] relative">
      <div className="font-bold text-[#2457C5]">BLUE HOUSE</div>
      <div className="flex flex-row items-center">
        <div className="mr-2">
          <BsPersonCircle size={`${1.5}rem`} />
        </div>
        <div>
          {userProfile ? (
            <>
              {userProfile.LastName} {userProfile.FirstName}
            </>
          ) : (
            "Loading..."
          )}
        </div>
        <div className="relative flex items-center">
          <button onClick={toggleDropdown} className="flex items-center">
            <MdArrowDropDown size={`${3}rem`} />
          </button>
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-5 top-10 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg z-50"
            >
              <button
                className="w-full flex items-center px-4 py-2 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <MdLogout size={`${1.5}rem`} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
