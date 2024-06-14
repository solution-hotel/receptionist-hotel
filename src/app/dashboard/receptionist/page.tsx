"use client";

import Button from "antd/es/button/button";
import React, { useState, useEffect, useMemo } from "react";
import ModelAdd from "../../../components/ModelAdd";
import ModelDetail from "@/components/ModelDetail";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import PaginationD from "./../../../components/PaginationD";
import { listBooking } from "@/utils/api/receptionist";
import { Booking } from "@/utils/types/receptionist";
import ClipLoader from "react-spinners/ClipLoader";

export default function Receptionist({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // const dataUser = useSelector((state: RootState) => state.userlogin.login);
  const [useID, setUseID] = useState<number>(0);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typeDate, setTypeDate] = useState(0);
  const handleShowModelAdd = (show: boolean) => {
    setShowModalAdd(show);
  };
  const [showModalDetail, setShowModalDetail] = useState(false);
  const handleShowModelDetail = (show: boolean, id: number) => {
    setUseID(id);
    setShowModalDetail(show);
  };
  const handleDataUpdate = () => {
    setDataUpdated((prev) => !prev);
  };

  const pageString = Array.isArray(searchParams["page"])
    ? searchParams["page"][0]
    : searchParams["page"] ?? "1";

  const page = parseInt(pageString, 10);

  const formatDate = (dateString: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [dataListBooking, setDataListBooking] = useState<Booking[]>([]);

  const handleSearchClick = () => {
    setSearch(searchInput);
  };

  useEffect(() => {
    const fetchData = async (search: string) => {
      try {
        setLoading(true);
        const data = await listBooking(
          null,
          null,
          search,
          null,
          null,
          null,
          typeDate,
          page,
          6
        );
        if (data.Data && data.Data.length > 0) {
          setDataListBooking(data.Data);
          setNoResults(false);
        } else {
          setDataListBooking([]);
          setNoResults(true);
        }
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching booking data:", error);
        setNoResults(true);
        setLoading(false);
      }
    };

    fetchData(search);
  }, [showModalDetail, dataUpdated, typeDate, page, search]);

  return (
    <div className="w-full h-full">
      {loading && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <ClipLoader color="#36d7b7" />
        </div>
      )}
      <div className="flex justify-around gap-4 pt-8">
        <div className=" bg-slate-50 bg-opacity-90 w-72 h-28 rounded-lg backdrop-blur-lg shadow-lg">
          <div className="mt-4 ml-4">
            <div className="text-md">Đặt phòng chờ nhận trong ngày</div>
            <div className="font-bold text-3xl">0</div>
          </div>
        </div>
        <div className=" bg-slate-50 bg-opacity-90 w-72 h-28 rounded-lg backdrop-blur-lg shadow-lg">
          <div className="mt-4 ml-4">
            <div className="text-md">Đặt phòng chờ trả trong ngày</div>
            <div className="font-bold text-3xl">0</div>
          </div>
        </div>
        <div className=" bg-slate-50 bg-opacity-90 w-72 h-28 rounded-lg backdrop-blur-lg shadow-lg">
          <div className="mt-4 ml-4">
            <div className="text-md">Phòng đang sử dụng</div>
            <div className="font-bold text-3xl">0</div>
          </div>
        </div>
        <div className=" bg-slate-50 bg-opacity-90 w-72 h-28 rounded-lg backdrop-blur-lg shadow-lg">
          <div className="mt-4 ml-4">
            <div className="text-md">Phòng trống</div>
            <div className="font-bold text-3xl">0</div>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md px-4 bg-white my-4">
        <div className="flex gap-6 content-center items-center justify-around border-b-4 relative">
          <div className="flex gap-8 text-sm">
            <div>
              <div
                style={{
                  color: typeDate === 0 ? "blue" : "black",
                  cursor: "pointer",
                }}
                onClick={() => setTypeDate(0)}
              >
                TẤT CẢ
              </div>
            </div>
            <div>
              <div
                style={{
                  color: typeDate === 1 ? "blue" : "black",
                  cursor: "pointer",
                }}
                onClick={() => setTypeDate(1)}
              >
                ĐẶT PHÒNG CHỜ NHẬN TRONG NGÀY
              </div>
            </div>
            <div>
              <div
                style={{
                  color: typeDate === 2 ? "blue" : "black",
                  cursor: "pointer",
                }}
                onClick={() => setTypeDate(2)}
              >
                ĐẶT PHÒNG CHỜ TRẢ TRONG NGÀY
              </div>
            </div>
          </div>
          <div>
            <button
              className="bg-[#418DFF] text-white py-3 px-4 w-fit h-fit flex justify-center items-center rounded-md hover:bg-blue-700"
              onClick={() => handleShowModelAdd(true)}
            >
              Thêm đặt phòng
            </button>
          </div>
          <div>
            <div className="relative flex rounded-lg shadow-sm py-2">
              <input
                type="text"
                id="hs-trailing-button-add-on-with-icon-and-button"
                name="hs-trailing-button-add-on-with-icon-and-button"
                placeholder="Tìm kiếm"
                onChange={(e) => setSearchInput(e.target.value)}
                className="py-1 px-4 ps-11 block border-gray-900 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
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
                onClick={handleSearchClick}
                className="py-3 px-4 inline-flex justify-center items-center  text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Tra cứu
              </button>
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-4">
          <thead className="text-xs text-white uppercase bg-blue-500 rounded-lg">
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
            {dataListBooking.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  Không có kết quả trả về
                </td>
              </tr>
            ) : (
              dataListBooking.map((booking, index) => (
                <tr
                  key={booking.id || booking.Id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-200 border-b"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {(page - 1) * 6 + index + 1}
                  </th>
                  <td
                    className="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                    onClick={() =>
                      handleShowModelDetail(true, booking.id || booking.Id)
                    }
                  >
                    {booking.id || booking.Id}
                  </td>
                  <td className="px-6 py-4 text-gray-900">{`${
                    booking.lastName || booking.LastName || "Bùi"
                  } ${booking.firstName || booking.FirstName || "Hoàn"}`}</td>
                  <td className="px-6 py-4 text-gray-900">
                    {booking.phoneNumber || booking.PhoneNumber || "0931990829"}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {booking.typeRoomName || booking.TypeRoomName || "Standard"}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {booking.roomNumber || booking.RoomNumber || "102"}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {formatDate(booking.checkinDate || booking.CheckinDate)}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {formatDate(booking.checkoutDate || booking.CheckoutDate)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <PaginationD />
      </div>
      {showModalAdd && <ModelAdd handelShowModel={handleShowModelAdd} />}
      {showModalDetail && useID !== null && (
        <ModelDetail
          handelShowModel={handleShowModelDetail}
          id={useID}
          onUpdate={handleDataUpdate}
        />
      )}
    </div>
  );
}
