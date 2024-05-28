import React from "react";
import { MdClose } from "react-icons/md";

const ModelAdd = ({
  handelShowModel,
}: {
  handelShowModel: (show: boolean) => void;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-fit absolute h-fit backdrop-filter backdrop-brightness-75 backdrop-blur-md justify-center pt-8 pb-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-black border-1">
        <div className="flex justify-end mr-4 cursor-pointer">
          <MdClose size={25} onClick={() => handelShowModel(false)} />
        </div>
        <div className="text-center font-bold text-xl">THÊM BOOKING</div>
        <div className="mx-4 my-4 px-4 py-4 border-black border-1">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex flex-col flex-grow">
                  <label htmlFor="" className="font-bold">
                    Họ
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border-1 w-24 h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                    //   className="flex-grow py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-black dark:focus:ring-neutral-600"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <label htmlFor="" className="font-bold">
                    Tên
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border-1 w-24 h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 justify-end"
                    //   className="flex-grow px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-black dark:focus:ring-neutral-600"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="" className="font-bold">
                  Số lượng người
                </label>
                <input
                  type="number"
                  name=""
                  id=""
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="" className="font-bold">
                  Loại Phòng
                </label>
                <input
                  type="email"
                  name=""
                  id=""
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col mb-4">
                <label htmlFor="" className="font-bold">
                  Số điện thoại
                </label>
                <input
                  type="number"
                  name=""
                  id=""
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="" className="font-bold">
                  Người lớn
                </label>
                <input
                  type="number"
                  name=""
                  id=""
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="" className="font-bold">
                  Số lượng
                </label>
                <input
                  type="number"
                  name=""
                  id=""
                  defaultValue={1}
                  disabled={true}
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col mb-4">
                <label htmlFor="" className="font-bold">
                  Email
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  className="border-1 w-ull h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="" className="font-bold">
                  Trẻ em
                </label>
                <input
                  type="number"
                  name=""
                  id=""
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="" className="font-bold">
                  Giá
                </label>
                <input
                  type="email"
                  name=""
                  id=""
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex flex-col">
              <label htmlFor="" className="font-bold">
                Ngày nhận phòng
              </label>
              <input
                type="date"
                name=""
                id=""
                className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-bold">
                Ngày trả phòng
              </label>
              <input
                type="date"
                name=""
                id=""
                className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
              />
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1">
              <label htmlFor="" className="font-bold">
                Lời nhắn
              </label>
              <textarea
                placeholder="NHẬP LỜI NHẮN CỦA BẠN TẠI ĐÂY ..."
                id=""
                name=""
                rows={4}
                cols={50}
                className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-center">
          <div>
            <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-white dark:text-black dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
              onClick={() => handelShowModel(false)}
            >
              Hủy
            </button>
          </div>
          <div>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Đặt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelAdd;
