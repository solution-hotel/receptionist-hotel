"use client";
import React, { useState } from "react";
import PopupCleaning from "@/components/PopupCleaning";
import PaginationD from "./../../../components/PaginationD";

const HouseKeeping = () => {
  const [showPopUpCleaning, setShowPopUpCleaning] = useState(false);
  const handleShowPopUpCleaning = (show: boolean) => {
    setShowPopUpCleaning(show);
  };
  return (
    <div className="w-full h-full">
      <div className="flex justify-start gap-4 pt-8 px-4">
        <div className=" bg-slate-50 bg-opacity-90 w-72 h-28 rounded-lg backdrop-blur-lg shadow-lg">
          <div className="mt-4 ml-4">
            <div className="font-bold text-md">SỐ PHÒNG BẨN</div>
            <div className="font-bold text-3xl">0</div>
          </div>
        </div>
        <div className=" bg-slate-50 bg-opacity-90 w-72 h-28 rounded-lg backdrop-blur-lg shadow-lg">
          <div className="mt-4 ml-4">
            <div className="font-bold text-md">SỐ PHÒNG SẠCH</div>
            <div className="font-bold text-3xl">0</div>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md px-4 bg-white my-4">
        <div className="flex gap-6 content-center items-center justify-between border-b-4 relative">
          <div>THÔNG TIN PHÒNG</div>
          <div className="relative flex rounded-lg shadow-sm py-2">
            <input
              type="text"
              id="hs-trailing-button-add-on-with-icon-and-button"
              name="hs-trailing-button-add-on-with-icon-and-button"
              className="py-1 px-4 ps-11 block border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
              <svg
                className="flex-shrink-0 size-4 text-gray-400 dark:text-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <button
              type="button"
              className="py-3 px-4 inline-flex justify-center items-center  text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Tra cứu
            </button>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-4">
          <thead className="text-xs text-gray-700 uppercase bg-blue-500 dark:text-black rounded-lg">
            <tr>
              <th scope="col" className="px-6 py-3">
                STT
              </th>
              <th scope="col" className="px-6 py-3">
                sỐ PHÒNG
              </th>
              <th scope="col" className="px-6 py-3">
                LOẠI PHÒNG
              </th>
              <th scope="col" className="px-6 py-3">
                TRẠNG THÁI KHÁCH Ở
              </th>
              <th scope="col" className="px-6 py-3">
                TRẠNG THÁI PHÒNG
              </th>
              <th scope="col" className="px-6 py-3">
                NV BUỒNG PHÒNG
              </th>
              <th scope="col" className="px-6 py-3">
                TRẠNG THÁI YÊU CẦU
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                1
              </th>
              <td
                className="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                onClick={() => handleShowPopUpCleaning(true)}
              >
                209
              </td>
              <td className="px-6 py-4 text-gray-900">LUXURY</td>
              <td className="px-6 py-4 text-gray-900">ĐANG CÓ KHÁCH SỬ DỤNG</td>
              <td className="px-6 py-4 text-gray-900">BẨN</td>
              <td className="px-6 py-4 text-gray-900">A THÁI</td>
              <td className="px-6 py-4 text-gray-900">ĐANG CHỜ</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                2
              </th>
              <td
                className="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                onClick={() => handleShowPopUpCleaning(true)}
              >
                109
              </td>
              <td className="px-6 py-4 text-gray-900">LUXURY</td>
              <td className="px-6 py-4 text-gray-900">ĐANG CÓ KHÁCH SỬ DỤNG</td>
              <td className="px-6 py-4 text-gray-900">BẨN</td>
              <td className="px-6 py-4 text-gray-900">A THÁI</td>
              <td className="px-6 py-4 text-gray-900">ĐANG CHỜ</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
               3
              </th>
              <td
                className="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                onClick={() => handleShowPopUpCleaning(true)}
              >
                207
              </td>
              <td className="px-6 py-4 text-gray-900">LUXURY</td>
              <td className="px-6 py-4 text-gray-900">ĐANG CÓ KHÁCH SỬ DỤNG</td>
              <td className="px-6 py-4 text-gray-900">BẨN</td>
              <td className="px-6 py-4 text-gray-900">A THÁI</td>
              <td className="px-6 py-4 text-gray-900">ĐANG CHỜ</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                4
              </th>
              <td
                className="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                onClick={() => handleShowPopUpCleaning(true)}
              >
                224
              </td>
              <td className="px-6 py-4 text-gray-900">LUXURY</td>
              <td className="px-6 py-4 text-gray-900">ĐANG CÓ KHÁCH SỬ DỤNG</td>
              <td className="px-6 py-4 text-gray-900">BẨN</td>
              <td className="px-6 py-4 text-gray-900">A THÁI</td>
              <td className="px-6 py-4 text-gray-900">ĐANG CHỜ</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                5
              </th>
              <td
                className="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                onClick={() => handleShowPopUpCleaning(true)}
              >
                108
              </td>
              <td className="px-6 py-4 text-gray-900">LUXURY</td>
              <td className="px-6 py-4 text-gray-900">ĐANG CÓ KHÁCH SỬ DỤNG</td>
              <td className="px-6 py-4 text-gray-900">BẨN</td>
              <td className="px-6 py-4 text-gray-900">A THÁI</td>
              <td className="px-6 py-4 text-gray-900">ĐANG CHỜ</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                6
              </th>
              <td
                className="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                onClick={() => handleShowPopUpCleaning(true)}
              >
                362
              </td>
              <td className="px-6 py-4 text-gray-900">LUXURY</td>
              <td className="px-6 py-4 text-gray-900">ĐANG CÓ KHÁCH SỬ DỤNG</td>
              <td className="px-6 py-4 text-gray-900">BẨN</td>
              <td className="px-6 py-4 text-gray-900">A THÁI</td>
              <td className="px-6 py-4 text-gray-900">ĐANG CHỜ</td>
            </tr>
          </tbody>
        </table>
        <PaginationD />
      </div>
      {showPopUpCleaning && (
        <PopupCleaning handelShowPopUp={handleShowPopUpCleaning} />
      )}
    </div>
  );
};

export default HouseKeeping;
