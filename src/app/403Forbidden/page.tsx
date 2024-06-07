"use client"
import React from "react";
import { MdDoNotDisturbOn } from "react-icons/md";
import { useRouter } from "next/navigation";

const FobiddenError = () => {
  const router = useRouter();
  const backToLoginPage = () => {
    router.push("/");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="my-4">
          <div className="flex flex-row items-center justify-center text-[#40A578] text-5xl">
            <span>4</span>
            <span>
              <MdDoNotDisturbOn />
            </span>
            <span>3</span>
          </div>
          <div className="text-xl">Access denied...</div>
          <div className="text-xl">
            You do not have permission to access this page
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={() => backToLoginPage()}
            className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
          >
            Go to Login Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default FobiddenError;
