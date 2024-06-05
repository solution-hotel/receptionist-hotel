import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { addBooking } from "@/utils/api/receptionist";

const ModelAdd = ({
  handelShowModel,
}: {
  handelShowModel: (show: boolean) => void;
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    numberOfPeople: 0,
    roomType: "",
    phoneNumber: "",
    adults: 0,
    quantity: 1,
    email: "",
    children: 0,
    price: "",
    checkinDate: "",
    checkoutDate: "",
    message: "",
  });

  const getRoomPrice = (roomTypeId) => {
    switch (roomTypeId) {
      case "3":
        return 250;
      case "4":
        return 80;
      case "5":
        return 120;
      case "6":
        return 110;
      case "7":
        return 150;
      case "8":
        return 200;
      default:
        return 0;
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "roomType") {
      const newPrice = getRoomPrice(value);
      setFormData({ ...formData, price: newPrice });
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const result = await addBooking(formData);
      console.log("Form Data Submitted: ", result);
      handelShowModel(false);
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };
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
                  <label htmlFor="firstName" className="font-bold">
                    Họ
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border-1 w-24 h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <label htmlFor="lastName" className="font-bold">
                    Tên
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border-1 w-24 h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 justify-end"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="numberOfPeople" className="font-bold">
                  Số lượng người
                </label>
                <input
                  type="number"
                  name="numberOfPeople"
                  value={formData.numberOfPeople}
                  onChange={handleChange}
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="roomType" className="font-bold">
                  Loại Phòng
                </label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                >
                  <option value="">Chọn loại phòng</option>
                  <option value="3">Standard</option>
                  <option value="4">Single</option>
                  <option value="5">Double</option>
                  <option value="6">Twin</option>
                  <option value="7">Triple</option>
                  <option value="8">Family</option>
                </select>
              </div>
            </div>
            <div>
              <div className="flex flex-col mb-4">
                <label htmlFor="phoneNumber" className="font-bold">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="adults" className="font-bold">
                  Người lớn
                </label>
                <input
                  type="number"
                  name="adults"
                  value={formData.adults}
                  onChange={handleChange}
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="quantity" className="font-bold">
                  Số lượng
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  disabled={true}
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col mb-4">
                <label htmlFor="email" className="font-bold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="children" className="font-bold">
                  Trẻ em
                </label>
                <input
                  type="number"
                  name="children"
                  value={formData.children}
                  onChange={handleChange}
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
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
                    formData.price
                      ? `${formData.price},000 VNĐ`
                      : formData.price
                  }
                  onChange={handleChange}
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex flex-col">
              <label htmlFor="checkinDate" className="font-bold">
                Ngày nhận phòng
              </label>
              <input
                type="date"
                name="checkinDate"
                value={formData.checkinDate}
                onChange={handleChange}
                className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="checkoutDate" className="font-bold">
                Ngày trả phòng
              </label>
              <input
                type="date"
                name="checkoutDate"
                value={formData.checkoutDate}
                onChange={handleChange}
                className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400"
              />
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1">
              <label htmlFor="message" className="font-bold">
                Lời nhắn
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="NHẬP LỜI NHẮN CỦA BẠN TẠI ĐÂY ..."
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
              onClick={handleSubmit}
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
