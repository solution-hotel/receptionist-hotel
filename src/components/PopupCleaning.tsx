"use client";
import React from "react";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";

const PopupCleaning = ({
  handelShowPopUp,
}: {
  handelShowPopUp: (show: boolean) => void;
}) => {
  const [selectedTask, setSelectedTask] = useState("");
  return (
    <div className="rounded-lg absolute backdrop-filter backdrop-brightness-75 backdrop-blur-md justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="w-[800px] h-80 bg-gradient-to-b from-[#4AB0FA] to-[#F5C6C6] opacity-80 rounded-lg shadow-lg">
        <div className="flex justify-end mr-4 pt-4">
          <FaWindowClose size={25} onClick={() => handelShowPopUp(false)} />
        </div>
        <div className="my-4 text-white font-bold text-xl flex justify-center">
          YÊU CẦU KIỂM/DỌN PHÒNG
        </div>
        <div className="w-full px-8 flex flex-col justify-center">
          <select
            id="task-select"
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            className="mb-4 p-2 rounded border"
          >
            <option value="">Chọn tác vụ</option>
            <option value="inspection">Kiểm phòng</option>
            <option value="cleaning">Dọn phòng</option>
            <option value="both">Kiểm phòng và Dọn phòng</option>
          </select>
          <div
            id="inspection-select"
            className={`mb-4 flex flex-col ${
              selectedTask === "inspection" ? "" : "hidden"
            }`}
          >
            <label
              htmlFor="inspection-person"
              className="mr-2 text-black font-bold"
            >
              Chọn người kiểm phòng:
            </label>
            <select id="inspection-person" className="p-2 rounded border">
              {/* Các tùy chọn người kiểm phòng */}
            </select>
          </div>

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
              Chọn người dọn phòng:
            </label>
            <select id="cleaning-person" className="p-2 rounded border">
              {/* Các tùy chọn người dọn phòng */}
            </select>
          </div>
          {selectedTask === "both" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1 flex flex-col">
                <label
                  htmlFor="inspection-person"
                  className="mr-2 text-black font-bold"
                >
                  Chọn người kiểm phòng:
                </label>
                <select id="inspection-person" className="p-2 rounded border">
                  {/* Các tùy chọn người kiểm phòng */}
                </select>
              </div>
              <div className="col-span-1 flex flex-col">
                <label
                  htmlFor="cleaning-person"
                  className="mr-2 text-black font-bold"
                >
                  Chọn người dọn phòng:
                </label>
                <select id="cleaning-person" className="p-2 rounded border">
                  {/* Các tùy chọn người dọn phòng */}
                </select>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-row justify-around my-8">
          <div>
            <button
              onClick={() => handelShowPopUp(false)}
              type="button"
              className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
            >
              Hủy
            </button>
          </div>
          <div>
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupCleaning;
