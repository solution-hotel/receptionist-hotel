"use client";
import React, { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { getListHouseKeeping, getDetailRoom } from "@/utils/api/housekeeping";
import { assignHousekeepingToRoomToCheck } from "@/utils/api/receptionist";

import Swal from "sweetalert2";
import { ListHousekeeping, DetailRoom } from "@/utils/types/housekeeping";

const PopupCheckingRoom = ({
  handelShowPopUp,
  id,
  status,
}: {
  handelShowPopUp: (show: boolean, id: any) => void;
  id: any;
  status: number;
}) => {
  const [selectedTask, setSelectedTask] = useState("");
  const [dataListHouseKeeping, setDatalistHouseKeeping] = useState<
    ListHousekeeping[]
  >([]);
  const [noResults, setNoResults] = useState(false);
  const [housekeepingID, setHouseKeepingID] = useState<number>(0);
  const [dataDetailRoom, setDataDetailRoom] = useState<DetailRoom>({
    Data: {},
  });

  const handleSubmit = async () => {
    try {
      await assignHousekeepingToRoomToCheck(id, housekeepingID);
      Swal.fire({
        title: "Thành công!",
        text: "Đã giao nhiệm vụ kiểm phòng thành công.",
        icon: "success",
        confirmButtonText: "OK",
      });
      handelShowPopUp(false, 0);
    } catch (error) {
      console.error("Error assigning housekeeping to room:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListHouseKeeping();
        const dataRoom = await getDetailRoom(id);
        console.log("data data detail Room before saving", dataRoom);
        setDataDetailRoom(dataRoom);
        console.log("data response housekeeping", data);

        if (data.Data && data.Data.length > 0) {
          setDatalistHouseKeeping(data.Data);
          setNoResults(false);
        } else {
          setDatalistHouseKeeping([]);
          setNoResults(true);
        }
      } catch (error) {
        console.error("Error fetching booking data:", error);
        setNoResults(true);
      }
    };

    fetchData();
  }, [id, noResults]);

  const roomData = dataDetailRoom?.Data ?? {};
  console.log("-----------------");
  console.log("data data detail Room after saving", dataDetailRoom);
  return (
    <div className="rounded-lg absolute backdrop-filter backdrop-brightness-75 backdrop-blur-md justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="w-[800px] h-6/6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-end mr-4 pt-4">
          <FaWindowClose size={25} onClick={() => handelShowPopUp(false, 0)} />
        </div>
        <div className="my-4 text-black font-bold text-xl flex justify-center">
          Yêu cầu kiểm phòng
        </div>
        <div className="w-full px-8 flex flex-col justify-center space-y-4">
          <div className="flex">
            <span className="mr-4 font-bold">Số phòng:</span>
            <span>{roomData.RoomNumber ? roomData.RoomNumber : ""}</span>
          </div>
          <div className="flex">
            <span className="mr-4 font-bold">Loại phòng:</span>
            <span>{roomData.RoomName ? roomData.RoomName : ""}</span>
          </div>
          <div className="flex">
            <span className="mr-4 font-bold">Tầng:</span>
            <span>{roomData.Floor ? roomData.Floor : ""}</span>
          </div>
          {/* <div className="flex">
            <span className="mr-4 font-bold">Trạng thái phòng:</span>
            <span>
              {roomData.status === 1 || roomData.status === 6
                ? "Phòng sạch"
                : roomData.status &&
                  roomData.status >= 2 &&
                  roomData.status <= 5
                ? "Phòng bẩn"
                : "Trạng thái không xác định"}
            </span>
          </div> */}
        </div>
        <div className="w-full px-8 flex flex-col justify-center mt-4">
          {status >= 2 && status <= 3 && (
            <>
              <select
                id="task-select"
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
                className="mb-4 p-2 rounded border"
              >
                <option value="">Chọn tác vụ</option>
                <option value="cleaning">Kiểm phòng</option>
              </select>

              <div
                id="cleaning-select"
                className={`mb-4 flex flex-col ${
                  selectedTask === "cleaning" ? "" : "hidden"
                }`}
              >
                <label
                  htmlFor="cleaning-person"
                  className="mr-2 text-black font-bold"
                >
                  Chọn người kiểm phòng:
                </label>
                <select
                  onChange={(e) => setHouseKeepingID(Number(e.target.value))}
                  id="cleaning-person"
                  className="p-2 rounded border"
                >
                  <option value="">Chọn người dọn phòng</option>
                  {dataListHouseKeeping.map((housekeeping) => (
                    <option key={housekeeping.Id} value={housekeeping.Id}>
                      {housekeeping.FirstName} {housekeeping.LastName}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-row justify-around py-8">
          <div>
            <button
              onClick={handleSubmit}
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Gửi
            </button>
          </div>
          <div>
            <button
              onClick={() => handelShowPopUp(false, 0)}
              type="button"
              className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupCheckingRoom;
