"use client";

import Button from "antd/es/button/button";
import React, { useState } from "react";
import ModelAdd from "../../../components/ModelAdd";
import ModelDetail from "@/components/ModelDetail";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import PaginationD from "./../../../components/PaginationD";

export default function Receptionist({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const dataUser = useSelector((state: RootState) => state.userlogin.login);
  console.log("data user after login", dataUser);

  const [showModalAdd, setShowModalAdd] = useState(false);
  const handleShowModelAdd = (show: boolean) => {
    setShowModalAdd(show);
  };
  const [showModalDetail, setShowModalDetail] = useState(false);
  const handleShowModelDetail = (show: boolean) => {
    setShowModalDetail(show);
  };
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "5";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  // const listData = data.slice(start, end);

  return (
    <div className="w-full h-full">
      <div className="flex justify-around gap-4 pt-8">
        <div className=" bg-slate-50 bg-opacity-90 w-72 h-28 rounded-lg backdrop-blur-lg shadow-lg">
          <div className="mt-4 ml-4">
            <div className="font-bold text-md">
              Đặt phòng chờ nhận trong ngày
            </div>
            <div className="font-bold text-3xl">0</div>
          </div>
        </div>
        <div className=" bg-slate-50 bg-opacity-90 w-72 h-28 rounded-lg backdrop-blur-lg shadow-lg">
          <div className="mt-4 ml-4">
            <div className="font-bold text-md">
              Đặt phòng chờ trả trong ngày
            </div>
            <div className="font-bold text-3xl">0</div>
          </div>
        </div>
        <div className=" bg-slate-50 bg-opacity-90 w-72 h-28 rounded-lg backdrop-blur-lg shadow-lg">
          <div className="mt-4 ml-4">
            <div className="font-bold text-md">Phòng đang sử dụng</div>
            <div className="font-bold text-3xl">0</div>
          </div>
        </div>
        <div className=" bg-slate-50 bg-opacity-90 w-72 h-28 rounded-lg backdrop-blur-lg shadow-lg">
          <div className="mt-4 ml-4">
            <div className="font-bold text-md">Phòng trống</div>
            <div className="font-bold text-3xl">0</div>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md px-4 bg-white my-4">
        <div className="flex gap-6 content-center items-center justify-center border-b-4 relative">
          <div className="flex gap-8 text-sm">
            <div className="text-right">
              <div>ĐẶT PHÒNG CHỜ NHẬN TRONG NGÀY</div>
              <div className="absolute top-0 left-0 right-0 h-16 w-72 border-b-4 border-black"></div>
            </div>
            <div>
              <div>ĐẶT PHÒNG CHỜ TRẢ TRONG NGÀY</div>
            </div>
            <div>
              <div>PHÒNG ĐANG SỬ DỤNG</div>
            </div>
          </div>
          <div>
            <Button
              className="bg-[#418DFF] text-white py-3 px-4 w-fit h-fit  flex justify-center items-center"
              onClick={() => handleShowModelAdd(true)}
            >
              Thêm Booking
            </Button>
          </div>
          <div>
            <div className="relative flex rounded-lg shadow-sm py-2">
              <input
                type="text"
                id="hs-trailing-button-add-on-with-icon-and-button"
                name="hs-trailing-button-add-on-with-icon-and-button"
                className="py-1 px-4 ps-11 block border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-10 ps-4">
                <svg
                  className="flex-shrink-0 size-4 text-gray-400"
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
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-4">
          <thead className="text-xs text-gray-700 uppercase bg-blue-500 rounded-lg">
            <tr>
              <th scope="col" className="px-6 py-3">
                STT
              </th>
              <th scope="col" className="px-6 py-3">
                MÃ BOOKING
              </th>
              <th scope="col" className="px-6 py-3">
                KHÁCH HÀNG
              </th>
              <th scope="col" className="px-6 py-3">
                SỐ ĐIỆN THOẠI
              </th>
              <th scope="col" className="px-6 py-3">
                LOẠI PHÒNG
              </th>
              <th scope="col" className="px-6 py-3">
                SỐ PHÒNG
              </th>
              <th scope="col" className="px-6 py-3">
                NGÀY NHẬN PHÒNG
              </th>
              <th scope="col" className="px-6 py-3">
                NGÀY TRẢ PHÒNG
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                1
              </th>
              <td
                className="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                onClick={() => handleShowModelDetail(true)}
              >
                7414
              </td>
              <td className="px-6 py-4 text-gray-900">Nguyen Huu Thang</td>
              <td className="px-6 py-4 text-gray-900">09319020102</td>
              <td className="px-6 py-4 text-gray-900">Luxury</td>
              <td className="px-6 py-4 text-gray-900">209</td>
              <td className="px-6 py-4 text-gray-900">06/09/2024</td>
              <td className="px-6 py-4 text-gray-900">24/09/2024</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                2
              </th>
              <td className="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                2912
              </td>
              <td className="px-6 py-4 text-gray-900">Bien Nguyen</td>
              <td className="px-6 py-4 text-gray-900">09319020102</td>
              <td className="px-6 py-4 text-gray-900">Luxury</td>
              <td className="px-6 py-4 text-gray-900">209</td>
              <td className="px-6 py-4 text-gray-900">06/09/2024</td>
              <td className="px-6 py-4 text-gray-900">24/09/2024</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                3
              </th>
              <td className="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                1562
              </td>
              <td className="px-6 py-4 text-gray-900">Kim Tra</td>
              <td className="px-6 py-4 text-gray-900">09319020102</td>
              <td className="px-6 py-4 text-gray-900">Luxury</td>
              <td className="px-6 py-4 text-gray-900">209</td>
              <td className="px-6 py-4 text-gray-900">06/09/2024</td>
              <td className="px-6 py-4 text-gray-900">24/09/2024</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                4
              </th>
              <td className="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                7521
              </td>
              <td className="px-6 py-4 text-gray-900">Tran Quoc Huu</td>
              <td className="px-6 py-4 text-gray-900">09319020102</td>
              <td className="px-6 py-4 text-gray-900">Luxury</td>
              <td className="px-6 py-4 text-gray-900">209</td>
              <td className="px-6 py-4 text-gray-900">06/09/2024</td>
              <td className="px-6 py-4 text-gray-900">24/09/2024</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                5
              </th>
              <td className="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                9821
              </td>
              <td className="px-6 py-4 text-gray-900">A Quang</td>
              <td className="px-6 py-4 text-gray-900">09319020102</td>
              <td className="px-6 py-4 text-gray-900">Luxury</td>
              <td className="px-6 py-4 text-gray-900">209</td>
              <td className="px-6 py-4 text-gray-900">06/09/2024</td>
              <td className="px-6 py-4 text-gray-900">24/09/2024</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                6
              </th>
              <td className="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                9221
              </td>
              <td className="px-6 py-4 text-gray-900">A Thi</td>
              <td className="px-6 py-4 text-gray-900">09319012102</td>
              <td className="px-6 py-4 text-gray-900">Standard</td>
              <td className="px-6 py-4 text-gray-900">229</td>
              <td className="px-6 py-4 text-gray-900">06/09/2024</td>
              <td className="px-6 py-4 text-gray-900">24/09/2024</td>
            </tr>
          </tbody>
        </table>
        <PaginationD />
      </div>
      {showModalAdd && <ModelAdd handelShowModel={handleShowModelAdd} />}
      {showModalDetail && (
        <ModelDetail handelShowModel={handleShowModelDetail} />
      )}
    </div>
  );
}
