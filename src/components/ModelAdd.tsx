import React, { useState, ChangeEvent, ChangeEventHandler } from "react";
import { MdClose } from "react-icons/md";
import { FaWindowClose, FaConciergeBell } from "react-icons/fa";
import { addBooking } from "@/utils/api/receptionist";
import Swal from "sweetalert2";
import { FormDataValidate } from "@/utils/types/receptionist";

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
    price: 0,
    checkinDate: "",
    checkoutDate: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormDataValidate>>({});
  const validateForm = () => {
    const newErrors: Partial<FormDataValidate> = {};

    if (!formData.lastName) newErrors.lastName = "Họ là bắt buộc";
    if (!formData.firstName) newErrors.firstName = "Tên là bắt buộc";
    if (!formData.roomType) newErrors.roomType = "Loại phòng là bắt buộc";
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Số điện thoại là bắt buộc";
    } else if (!/^\d{10,11}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ";
    }
    if (!formData.email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.checkinDate)
      newErrors.checkinDate = "Ngày nhận phòng là bắt buộc";
    if (!formData.checkoutDate)
      newErrors.checkoutDate = "Ngày trả phòng là bắt buộc";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getRoomPrice = (roomTypeId: string) => {
    switch (roomTypeId) {
      case "3":
        return Number(250);
      case "4":
        return Number(80);
      case "5":
        return Number(120);
      case "6":
        return Number(110);
      case "7":
        return Number(150);
      case "8":
        return Number(200);
      case "9":
          return Number(500);
      case "10":
          return Number(1000);
      case "11":
          return Number(800);
      case "12":
          return Number(180);
      case "13":
          return Number(250);
      case "14":
          return Number(100);
      case "15":
          return Number(150);
      case "16":
          return Number(250);
      case "17":
          return Number(200);
      case "18":
          return Number(300);
      default:
        return Number(0);
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

  const handleSelectChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
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
    if (validateForm()) {
      try {
        const result = await addBooking(formData);
        console.log("Form Data Submitted: ", result);
        Swal.fire({
          title: "Thành công!",
          text: "Đặt phòng thành công.",
          icon: "success",
          confirmButtonText: "OK",
        });
        handelShowModel(false);
      } catch (error) {
        console.error("Lỗi khi gửi form: ", error);
        Swal.fire({
          title: "Lỗi!",
          text: "Đặt phòng không thành công. Vui lòng thử lại.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-fit absolute h-fit backdrop-filter backdrop-brightness-75 backdrop-blur-md justify-center pt-8 pb-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-black border-1 rounded-md">
        <div className="flex justify-end mr-4 cursor-pointer top-0">
          <FaWindowClose size={25} onClick={() => handelShowModel(false)} />
        </div>
        <div className="text-center font-semibold text-xl">Thêm đặt phòng</div>
        <div className="mx-4 my-4 px-4 py-4 border-black border-1">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex flex-col flex-grow">
                  <label htmlFor="lastName">Họ</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border-1 w-28 h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
                  />
                  {errors.lastName && (
                    <span className="text-red-500">{errors.lastName}</span>
                  )}
                </div>
                <div className="flex flex-col flex-grow">
                  <label htmlFor="firstName">Tên</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border-1 w-28 h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 justify-end rounded-md"
                  />
                  {errors.firstName && (
                    <span className="text-red-500">{errors.firstName}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="roomType">Loại Phòng</label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleSelectChange}
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
                >
                  <option value="">Chọn loại phòng</option>
                  <option value="3">Standard</option>
                  <option value="4">Single</option>
                  <option value="5">Double</option>
                  <option value="6">Twin</option>
                  <option value="7">Triple</option>
                  <option value="8">Family</option>
                  <option value="9">Presidential</option>
                  <option value="10">Penthouse</option>
                  <option value="11">Bungalow</option>
                  <option value="12">Studio</option>
                  <option value="13">Loft</option>
                  <option value="14">Standard</option>
                  <option value="15">Deluxe</option>
                  <option value="16">Suite</option>
                  <option value="17">Family</option>
                  <option value="18">Executive</option>
                </select>
                {errors.roomType && (
                  <span className="text-red-500">{errors.roomType}</span>
                )}
              </div>
            </div>
            <div>
              <div className="flex flex-col mb-4">
                <label htmlFor="phoneNumber">Số điện thoại</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
                />
                {errors.phoneNumber && (
                  <span className="text-red-500">{errors.phoneNumber}</span>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="quantity">Số lượng</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  disabled={true}
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col mb-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="price">Giá</label>
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
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex flex-col">
              <label htmlFor="checkinDate">Ngày nhận phòng</label>
              <input
                type="date"
                name="checkinDate"
                value={formData.checkinDate}
                onChange={handleChange}
                min="2024-06-01" max="2024-12-31"
                className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
              />
              {errors.checkinDate && (
                <span className="text-red-500">{errors.checkinDate}</span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="checkoutDate">Ngày trả phòng</label>
              <input
                type="date"
                name="checkoutDate"
                value={formData.checkoutDate}
                onChange={handleChange}
                min="2024-06-01" max="2024-12-31"
                className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
              />
              {errors.checkoutDate && (
                <span className="text-red-500">{errors.checkoutDate}</span>
              )}
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1">
              <label htmlFor="message">Lời nhắn</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Nhập lời nhắn của bạn tại đây ..."
                rows={4}
                cols={50}
                className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-center">
          <div>
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={handleSubmit}
            >
              Lưu
            </button>
          </div>
          <div>
            <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-white dark:text-black dark:border-gray-200 dark:hover:bg-gray-200 dark:hover:border-gray-200"
              onClick={() => handelShowModel(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelAdd;
