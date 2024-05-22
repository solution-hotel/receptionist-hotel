import React from "react";
import { MdWindow, MdOutlineAddBox, MdBedroomParent } from "react-icons/md";
import { FaWindowClose, FaConciergeBell } from "react-icons/fa";

const ModelCheckout = ({
  handelShowModel,
}: {
  handelShowModel: (show: boolean) => void;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center my-4 overflow-y-auto">
      <div className="w-fit absolute h-fit backdrop-filter backdrop-brightness-75 backdrop-blur-md py-8 px-4 top-1 bottom-10 bg-white border-black border-1">
        <div className="flex justify-end mr-4 cursor-pointer">
          <FaWindowClose size={25} onClick={() => handelShowModel(false)} />
        </div>
        <div className="text-center font-bold">THANH TOÁN</div>
        <div>
          <div className="flex flex-row items-center gap-1 ml-8">
            <div>
              <MdWindow size={25} />
            </div>
            <div>Thông tin booking</div>
          </div>
          <div className="ml-8 mt-8">
            <div className="flex flex-row items-center">
              <span>Họ và tên</span>
              <span className="ml-24">Nguyen Huu Thang</span>
            </div>
            <div className="flex flex-row items-center">
              <span>Số điện thoại</span>
              <span className="ml-[72px]">0932 092 092</span>
            </div>
            <div className="flex flex-row items-center">
              <span>Email</span>
              <span className="ml-32">thangnguyen@gmail.com</span>
            </div>
            <div className="flex flex-row items-center">
              <span>Thời gian đặt phòng</span>
              <span className="ml-[22px]">9:42 PM 13/04/2024</span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center gap-1 ml-8 my-4">
            <div>
              <MdBedroomParent size={25} />
            </div>
            <div>Thông tin phòng</div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-8">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-black">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#F3E07B] dark:text-black">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Tên phòng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ngày nhận phòng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ngày trả phòng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số lượng phòng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Giá
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-300">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black"
                  >
                    Phòng 209
                  </th>
                  <td className="px-6 py-4">17/04/2024</td>
                  <td className="px-6 py-4">20/04/2024</td>
                  <td className="px-6 py-4">1</td>
                  <td className="px-6 py-4">240,00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex flex-row items-center gap-1 ml-8 my-4">
            <div>
              <FaConciergeBell size={25} />
            </div>
            <div>Các dịch vụ đã sử dụng</div>
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mx-8">
          <div className="px-4 py-4 w-full h-fit flex flex-col border-t border-b border-black bg-[#D9D9D9] bg-opacity-20">
            <div className="flex justify-end">
              <span className="mr-[60px] font-bold">Tổng tiền phòng</span>
              <span>500,000 VNĐ</span>
            </div>
            <div className="flex justify-end">
              <span className="mr-[55px] font-bold">Tổng tiền dịch vụ</span>
              <span>100,000 VNĐ</span>
            </div>
            <div className="flex justify-end">
              <span className="mr-[101px] font-bold">Tổng tiền</span>
              <span>1,500,000 VNĐ</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 my-4 mr-8">
          <div>
            <button
              onClick={() => handelShowModel(false)}
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
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelCheckout;
