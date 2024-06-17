"use client";
import React, { useState, useEffect } from "react";
import PopupCleaning from "../../../components/PopupCleaning";
import PaginationD from "./../../../components/PaginationD";
import { getListRoom } from "../../../utils/api/housekeeping";
import { Room } from "../../../utils/types/housekeeping";
import ClipLoader from "react-spinners/ClipLoader";

const HouseKeeping = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [showPopUpCleaning, setShowPopUpCleaning] = useState(false);
  const [dataListRoom, setDataListRoom] = useState<Room[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [roomID, setRoomID] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const handleShowPopUpCleaning = (show: boolean, id: number) => {
    setRoomID(id);
    setShowPopUpCleaning(show);
  };

  const page = Array.isArray(searchParams["page"])
    ? searchParams["page"][0]
    : searchParams["page"] ?? "1";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getListRoom(parseInt(page));

        console.log("data response", data);

        if (data.Data && data.Data.length > 0) {
          setDataListRoom(data.Data);
          setNoResults(false);
        } else {
          setDataListRoom([]);
          setNoResults(true);
        }
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching booking data:", error);
        setNoResults(true);
      }
    };

    fetchData();
  }, [page, noResults]);
  return (
    <div className="w-full h-full">
      {loading && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <ClipLoader color="#36d7b7" />
        </div>
      )}
      <div className="flex justify-start gap-4 pt-8 px-4">
        <div className=" bg-slate-50 bg-opacity-90 w-72 h-28 rounded-lg backdrop-blur-lg shadow-lg">
          <div className="mt-4 ml-4">
            <div className="text-md">Số phòng bẩn</div>
            <div className="font-bold text-3xl">0</div>
          </div>
        </div>
        <div className=" bg-slate-50 bg-opacity-90 w-72 h-28 rounded-lg backdrop-blur-lg shadow-lg">
          <div className="mt-4 ml-4">
            <div className="text-md">Số phòng sạch</div>
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
        <table className="w-full text-sm text-left rtl:text-right my-4">
          <thead className="text-xs text-white uppercase bg-blue-500 rounded-lg">
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
            {dataListRoom.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  Không có kết quả trả về
                </td>
              </tr>
            ) : (
              dataListRoom.map((room, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-200 border-b"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {(parseInt(page) - 1) * 6 + index + 1}
                  </th>
                  <td
                    onClick={() => handleShowPopUpCleaning(true, room.Id)}
                    className="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                  >
                    {room.RoomNumber}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {room.TypeRoomName}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {room.BookingId ? "Đang có khách sử dụng" : "Phòng trống"}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {room.Status >= 2 && room.Status <= 5
                      ? "Phòng bẩn"
                      : room.Status === 1 || room.Status === 6
                      ? "Phòng sạch"
                      : "Trạng thái không xác định"}
                  </td>
                  {room.BookingId !== 1 && (
                    <>
                      <td className="px-6 py-4 text-gray-900">
                        {`${room.LastName} ${room.FirstName}`}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {room.Status === 3
                          ? "Chờ xác nhận"
                          : room.Status === 4
                          ? "Đã xác nhận"
                          : room.Status === 5
                          ? "Đang kiểm tra"
                          : room.Status === 6
                          ? "Hoàn thành"
                          : null}
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <PaginationD />
      </div>
      {showPopUpCleaning && (
        <PopupCleaning handelShowPopUp={handleShowPopUpCleaning} id={roomID} />
      )}
    </div>
  );
};

export default HouseKeeping;
