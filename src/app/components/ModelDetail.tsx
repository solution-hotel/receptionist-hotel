import React, { useState } from "react";
import { MdWindow, MdOutlineAddBox } from "react-icons/md";
import { FaWindowClose, FaConciergeBell } from "react-icons/fa";
import ModelCheckout from "./ModelCheckout";

const ModelDetail = ({
  handelShowModel,
}: {
  handelShowModel: (show: boolean) => void;
}) => {
  const [showModalCheckout, setShowModalCheckout] = useState(false);
  const handleShowModelCheckout = (show: boolean) => {
    setShowModalCheckout(show);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center my-4 overflow-y-auto">
      <div className="w-fit absolute h-fit backdrop-filter backdrop-brightness-75 backdrop-blur-md py-8 px-4 top-1 bottom-10 bg-white border-black border-1">
        <div className="flex justify-end mr-4 cursor-pointer">
          <FaWindowClose size={25} onClick={() => handelShowModel(false)} />
        </div>
        <div className="text-center font-bold">THÔNG TIN CHI TIẾT BOOKING</div>
        <div>
          <div className="flex flex-row items-center gap-1 ml-8">
            <div>
              <MdWindow size={25} />
            </div>
            <div className="font-bold">Thông tin booking</div>
          </div>
          <div className="mx-4 my-4 px-4 py-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex flex-col flex-grow">
                    <label htmlFor="" className="font-bold">
                      Họ
                    </label>
                    <input
                      value={"Nguyen"}
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
                      value={"Huu Thang"}
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
                  value={"2"}
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
                  value={"Luxury"}
                    type="text"
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
                  value={"09319020102"}
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
                  value={"1"}
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
                  value={"1"}
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
                    value={"thangnguyen@gmail.com"}
                    type="email"
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
                    value={"1"}
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
                    value={"499,000 VNĐ"}
                    type="text"
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
                  defaultValue="2024-06-09"
                  value="2024-06-09"
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
                  defaultValue="2024-06-24"
                  value="2024-06-24"
                  type="date"
                  name=""
                  id=""
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                />
              </div>
            </div>
            {/* <div>
              <div className="grid grid-cols-1">
                <label htmlFor="">Lời nhắn</label>
                <textarea
                  id=""
                  name=""
                  rows={4}
                  cols={50}
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                />
              </div>
            </div> */}
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center gap-1 ml-8 my-4">
            <div>
              <FaConciergeBell size={25} />
            </div>
            <div className="font-bold">Các dịch vụ đã sử dụng</div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-8">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-black">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#F3E07B] dark:text-black">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    N.O
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Dịch vụ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Đơn giá
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số lượng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tổng tiền
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-300">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black"
                  >
                    1
                  </th>
                  <td className="px-6 py-4">Nước ngọt</td>
                  <td className="px-6 py-4">12,000</td>
                  <td className="px-6 py-4">2</td>
                  <td className="px-6 py-4">24,00</td>
                  <td className="px-6 py-4 text-right">
                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                      Sửa
                    </a>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                      Xóa
                    </a>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-300">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    2
                  </th>
                  <td className="px-6 py-4">Bánh tráng</td>
                  <td className="px-6 py-4">25,000</td>
                  <td className="px-6 py-4">2</td>
                  <td className="px-6 py-4">50,000</td>
                  <td className="px-6 py-4 text-right">
                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                      Sửa
                    </a>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                      Xóa
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center my-4">
          <MdOutlineAddBox size={30} />
        </div>
        <div className="mx-8">
          <div className="px-4 py-4 w-full h-fit flex flex-col border-t border-b border-black bg-[#D9D9D9] bg-opacity-20">
            <div className="flex justify-end">
              <span className="mr-[60px] font-bold">Tổng tiền phòng</span>
              <span className="font-bold">500,000 VNĐ</span>
            </div>
            <div className="flex justify-end">
              <span className="mr-[55px] font-bold">Tổng tiền dịch vụ</span>
              <span className="font-bold">100,000 VNĐ</span>
            </div>
            <div className="flex justify-end">
              <span className="mr-[100px] font-bold">Tổng tiền</span>
              <span className="font-bold">1,500,000 VNĐ</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 my-4">
          <div>
            <button
              onClick={() => handleShowModelCheckout(true)}
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Check-out
            </button>
          </div>
          <div>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Gửi email
            </button>
          </div>
          <div>
            <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
            >
              Y/C kiểm phòng
            </button>
          </div>
          <div>
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
      {showModalCheckout && (
        <ModelCheckout handelShowModel={handleShowModelCheckout} />
      )}
    </div>
  );
};

export default ModelDetail;
