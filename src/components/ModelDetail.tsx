import React, { useState, useEffect } from "react";
import { MdWindow, MdOutlineAddBox } from "react-icons/md";
import { FaWindowClose, FaConciergeBell } from "react-icons/fa";
import ModelCheckout from "./ModelCheckout";
import {
  getDetailBooking,
  updateBooking,
  cancelBooking,
} from "@/utils/api/receptionist";
import { format } from "date-fns";
import ClipLoader from "react-spinners/ClipLoader";

const ModelDetail = ({
  handelShowModel,
  id,
}: {
  handelShowModel: (show: boolean) => void;
  id: number;
}) => {
  const [bookingData, setBookingData] = useState({
    checkinDate: "",
    checkoutDate: "",
    roomType: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    maximumCapacity: "",
    numberOfAdults: "",
    numberOfChildren: "",
    price: "",
    RoomNumber: "",
    Status: "",
  });
  const [showModalCheckout, setShowModalCheckout] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDetailBooking(id);
        console.log("data before save booking", data);
        setBookingData({
          checkinDate: data.Data.CheckinDate,
          checkoutDate: data.Data.CheckoutDate,
          roomType: data.Data.RoomType.Name,
          firstName: data.Data.Guest.FirstName,
          lastName: data.Data.Guest.LastName,
          email: data.Data.Guest.Email,
          phoneNumber: data.Data.Guest.PhoneNumber,
          maximumCapacity: data.Data.RoomType.MaximumCapacity,
          numberOfAdults: data.Data.RoomType.NumberOfAdults,
          numberOfChildren: data.Data.RoomType.NumberOfChildren,
          price: data.Data.RoomType.Price,
          RoomNumber: data.Data.Room ? data.Data.Room.RoomNumber || "" : "",
          Status: data.Data.Status,
        });
        console.log("data booking", data);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching booking detail:", error);
      }
    };

    if (!isDataLoaded) {
      fetchData();
    }
  }, [id, isDataLoaded]);

  const getRoomPrice = (roomTypeName) => {
    switch (roomTypeName) {
      case "Standard":
        return 250;
      case "Single":
        return 80;
      case "Double":
        return 120;
      case "Twin":
        return 110;
      case "Triple":
        return 150;
      case "Family":
        return 200;
      default:
        return 0;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const convertValue = name === "Status" ? parseInt(value) : value;
    if (name === "roomType") {
      const newPrice = getRoomPrice(value);
      setBookingData({ ...bookingData, price: newPrice });
    }
    setBookingData((prevData) => ({ ...prevData, [name]: convertValue }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateBooking(id, bookingData);
      alert("Booking updated successfully");
      handelShowModel(false, 0);
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Error updating booking");
    }
  };

  const handleCancel = async () => {
    try {
      await cancelBooking(id);
      alert("Booking canceled successfully");
      handelShowModel(false, 0);
    } catch (error) {
      console.error("Error canceling booking: ", error);
      alert("Error canceling booking");
    }
  };

  const handleShowModelCheckout = (show: boolean) => {
    setShowModalCheckout(show);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center my-4 overflow-y-auto z-100">
      <div className="w-fit absolute h-fit backdrop-filter backdrop-brightness-75 backdrop-blur-md py-8 px-4 top-1 bottom-10 bg-white border-black border-1 z-100">
        <div className="flex justify-end mr-4 cursor-pointer">
          <FaWindowClose size={25} onClick={() => handelShowModel(false, 0)} />
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
                    <label htmlFor="lastName" className="font-bold">
                      Họ
                    </label>
                    <input
                      value={bookingData.lastName}
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="border-1 w-24 h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <label htmlFor="firstName" className="font-bold">
                      Tên
                    </label>
                    <input
                      value={bookingData.firstName}
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="border-1 w-24 h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="maximumCapacity" className="font-bold">
                    Số lượng người
                  </label>
                  <input
                    value={bookingData.maximumCapacity}
                    type="number"
                    name="maximumCapacity"
                    id="maximumCapacity"
                    className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="roomType" className="font-bold">
                    Loại Phòng
                  </label>
                  <select
                    name="roomType"
                    value={bookingData.roomType}
                    onChange={handleChange}
                    className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                  >
                    <option value="">Chọn loại phòng</option>
                    <option value="Standard">Standard</option>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Twin">Twin</option>
                    <option value="Triple">Triple</option>
                    <option value="Family">Family</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="phoneNumber" className="font-bold">
                    Số điện thoại
                  </label>
                  <input
                    value={bookingData.phoneNumber}
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="numberOfAdults" className="font-bold">
                    Người lớn
                  </label>
                  <input
                    value={bookingData.numberOfAdults}
                    type="number"
                    name="numberOfAdults"
                    id="numberOfAdults"
                    className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="quantity" className="font-bold">
                    Số lượng
                  </label>
                  <input
                    value={1}
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                    disabled={true}
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="email" className="font-bold">
                    Email
                  </label>
                  <input
                    value={bookingData.email}
                    type="email"
                    name="email"
                    id="email"
                    className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="numberOfChildren" className="font-bold">
                    Trẻ em
                  </label>
                  <input
                    value={bookingData.numberOfChildren}
                    type="number"
                    name="numberOfChildren"
                    id="numberOfChildren"
                    className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="price" className="font-bold">
                    Giá
                  </label>
                  <input
                    disabled
                    type="text"
                    name="price"
                    value={
                      bookingData.price
                        ? `${bookingData.price},000 VNĐ`
                        : bookingData.price
                    }
                    onChange={handleChange}
                    className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex flex-col">
                <label htmlFor="numberRoom" className="font-bold">
                  Số phòng
                </label>
                <input
                  value={bookingData.RoomNumber || ""}
                  type="text"
                  name="RoomNumber"
                  id="numberRoom"
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="status" className="font-bold">
                  Trạng thái
                </label>
                <select
                  value={bookingData.Status}
                  name="Status"
                  id="status"
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                  onChange={handleChange}
                  disabled={bookingData.Status ? bookingData.Status == 4 : true}
                >
                  <option value="0">Chưa xác nhận</option>
                  <option value="1">Đã xác nhận</option>
                  <option value="2">Đã check-in</option>
                  <option value="3">Đã check-out</option>
                  <option value="4">Đã hủy</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex flex-col">
                <label htmlFor="checkinDate" className="font-bold">
                  Ngày nhận phòng
                </label>
                <input
                  value={
                    bookingData.checkinDate
                      ? format(new Date(bookingData.checkinDate), "yyyy-MM-dd")
                      : ""
                  }
                  type="date"
                  name="checkinDate"
                  id="checkinDate"
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="checkoutDate" className="font-bold">
                  Ngày trả phòng
                </label>
                <input
                  value={
                    bookingData.checkoutDate
                      ? format(new Date(bookingData.checkoutDate), "yyyy-MM-dd")
                      : ""
                  }
                  type="date"
                  name="checkoutDate"
                  id="checkoutDate"
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                  onChange={handleChange}
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
              className="text-white bg-[#FF0000] border border-gray-300 hover:bg-[#EE4E4E] font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={handleCancel}
            >
              Hủy Booking
            </button>
          </div>
          <div>
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={handleSave}
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
