import React, {
  ChangeEvent,
  useState,
  useEffect,
  ChangeEventHandler,
} from "react";
import { MdWindow, MdOutlineAddBox } from "react-icons/md";
import { FaWindowClose, FaConciergeBell } from "react-icons/fa";
import ModelCheckout from "./ModelCheckout";
import {
  getDetailBooking,
  updateBooking,
  cancelBooking,
  sendMailBooking,
} from "@/utils/api/receptionist";
import { format } from "date-fns";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import { DataUpdateBooking } from "@/utils/types/receptionist";
import { getExtraitems } from "./../utils/api/receptionist";

const ModelDetail = ({
  handelShowModel,
  id,
  onUpdate,
}: {
  handelShowModel: (show: boolean, id: number) => void;
  id: number;
  onUpdate: () => void;
}) => {
  const [bookingData, setBookingData] = useState<DataUpdateBooking>({
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
    price: 0,
    RoomNumber: "",
    Status: 0,
    Id: 0,
  });
  const [bookingItems, setBookingItems] = useState([]);
  const [bookingID, setBookingID] = useState<number>(0);
  const [totalServicePrice, setTotalServicePrice] = useState(0);
  const [extraItems, setExtraItems] = useState([]);
  const [showModalCheckout, setShowModalCheckout] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailData, extraItemsData] = await Promise.all([
          getDetailBooking(id),
          getExtraitems(),
        ]);

        console.log("Data before save booking", detailData);
        setBookingData({
          checkinDate: format(
            new Date(detailData.Data.CheckinDate),
            "yyyy-MM-dd"
          ),
          checkoutDate: format(
            new Date(detailData.Data.CheckoutDate),
            "yyyy-MM-dd"
          ),
          roomType: detailData.Data.RoomType.Id,
          firstName: detailData.Data.Guest.FirstName,
          lastName: detailData.Data.Guest.LastName,
          email: detailData.Data.Guest.Email,
          phoneNumber: detailData.Data.Guest.PhoneNumber,
          maximumCapacity: detailData.Data.RoomType.MaximumCapacity,
          numberOfAdults: detailData.Data.RoomType.NumberOfAdults,
          numberOfChildren: detailData.Data.RoomType.NumberOfChildren,
          price: detailData.Data.RoomType.Price,
          RoomNumber: detailData.Data.Room
            ? detailData.Data.Room.RoomNumber || ""
            : "",
          Status: detailData.Data.Status,
          Id: detailData.Data.Id,
        });
        setBookingItems(detailData.Data.BookingItems);
        setExtraItems(extraItemsData.Data);

        console.log("Booking Items:", detailData.Data.BookingItems);
        const totalServicePrice = detailData.Data.BookingItems.reduce(
          (total: number, item: { TotalPrice: number }) =>
            total + item.TotalPrice,
          0
        );
        setTotalServicePrice(totalServicePrice);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching booking detail:", error);
      }
    };

    if (!isDataLoaded) {
      fetchData();
    }
  }, [id, isDataLoaded]);

  const totalPrice = bookingData.price + totalServicePrice;

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
      default:
        return Number(0);
    }
  };

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   const convertValue = name === "Status" ? parseInt(value) : value;
  //   if (name === "roomType") {
  //     const newPrice = getRoomPrice(value);
  //     setBookingData({ ...bookingData, price: newPrice });
  //   }
  //   setBookingData((prevData) => ({ ...prevData, [name]: convertValue }));
  // };

  // const handleSelectChange: ChangeEventHandler<
  //   HTMLInputElement | HTMLSelectElement
  // > = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "roomType") {
  //     const newPrice = getRoomPrice(value);
  //     setBookingData({ ...bookingData, price: newPrice });
  //   }
  //   setBookingData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let convertValue: string | number | Date = value;

    if (name === "Status") {
      convertValue = parseInt(value);
    } else if (name === "checkinDate" || name === "checkoutDate") {
      convertValue = format(new Date(value), "yyyy-MM-dd");
    }

    setBookingData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: convertValue,
      };

      if (name === "roomType") {
        const newPrice = getRoomPrice(value);
        return { ...updatedData, price: newPrice } as DataUpdateBooking;
      }

      return updatedData as DataUpdateBooking;
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      console.log(bookingData);
      await updateBooking(id, bookingData);
      Swal.fire({
        title: "Thành công!",
        text: "Cập nhật đặt phòng thành công.",
        icon: "success",
        confirmButtonText: "OK",
      });
      handelShowModel(false, 0);
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleSendMail = async () => {
    setLoading(true);
    try {
      await sendMailBooking(
        bookingData.email,
        bookingData.firstName + " " + bookingData.lastName,
        id
      );
      Swal.fire({
        title: "Thành công!",
        text: "Gửi email đặt phòng thành công.",
        icon: "success",
        confirmButtonText: "OK",
      });
      handelShowModel(false, 0);
    } catch (error) {
      console.error("Error send mail booking:", error);
      Swal.fire({
        title: "Thất bại!",
        text: "Gửi email đặt phòng thất bại. Vui lòng thử lại sau.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      await cancelBooking(id);
      Swal.fire({
        title: "Thành công!",
        text: "Hủy đặt phòng thành công.",
        icon: "success",
        confirmButtonText: "OK",
      });
      handelShowModel(false, 0);
    } catch (error) {
      console.error("Error canceling booking: ", error);
    }
  };

  const handleShowModelCheckout = (show: boolean, id: number) => {
    setBookingID(id);
    setShowModalCheckout(show);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center my-4 overflow-y-auto z-100">
      <div className="w-fit absolute h-fit backdrop-filter backdrop-brightness-75 backdrop-blur-md py-8 px-4 top-1 bottom-10 bg-white border-black border-1 z-100 rounded-md">
        <div className="flex justify-end mr-4 cursor-pointer">
          <FaWindowClose size={25} onClick={() => handelShowModel(false, 0)} />
        </div>
        <div className="text-center font-bold text-lg">
          Thông tin chi tiết đặt phòng
        </div>
        <div>
          <div className="flex flex-row items-center gap-1 ml-8">
            <div>
              <MdWindow size={25} />
            </div>
            <div className="font-semibold">Thông tin booking</div>
          </div>
          <div className="mx-4 my-4 px-4 py-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex flex-col flex-grow">
                    <label htmlFor="lastName">Họ</label>
                    <input
                      value={bookingData.lastName}
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="border-1 w-24 h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <label htmlFor="firstName">Tên</label>
                    <input
                      value={bookingData.firstName}
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="border-1 w-24 h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="maximumCapacity">Số lượng người</label>
                  <input
                    value={bookingData.maximumCapacity}
                    type="number"
                    name="maximumCapacity"
                    id="maximumCapacity"
                    className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="roomType">Loại Phòng</label>
                  <select
                    name="roomType"
                    value={bookingData.roomType}
                    onChange={handleChange}
                    className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
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
                  <label htmlFor="phoneNumber">Số điện thoại</label>
                  <input
                    value={bookingData.phoneNumber}
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="numberOfAdults">Người lớn</label>
                  <input
                    value={bookingData.numberOfAdults}
                    type="number"
                    name="numberOfAdults"
                    id="numberOfAdults"
                    className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="quantity">Số lượng</label>
                  <input
                    value={1}
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
                    disabled={true}
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="email">Email</label>
                  <input
                    value={bookingData.email}
                    type="email"
                    name="email"
                    id="email"
                    className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="numberOfChildren">Trẻ em</label>
                  <input
                    value={bookingData.numberOfChildren}
                    type="number"
                    name="numberOfChildren"
                    id="numberOfChildren"
                    className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="price">Giá</label>
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
                    className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex flex-col">
                <label htmlFor="numberRoom">Số phòng</label>
                <input
                  value={bookingData.RoomNumber || "102"}
                  type="text"
                  name="RoomNumber"
                  id="numberRoom"
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="status">Trạng thái</label>
                <select
                  value={bookingData.Status}
                  name="Status"
                  id="status"
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
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
                <label htmlFor="checkinDate">Ngày nhận phòng</label>
                <input
                  value={
                    bookingData.checkinDate
                      ? format(new Date(bookingData.checkinDate), "yyyy-MM-dd")
                      : ""
                  }
                  type="date"
                  name="checkinDate"
                  id="checkinDate"
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="checkoutDate">Ngày trả phòng</label>
                <input
                  value={
                    bookingData.checkoutDate
                      ? format(new Date(bookingData.checkoutDate), "yyyy-MM-dd")
                      : ""
                  }
                  type="date"
                  name="checkoutDate"
                  id="checkoutDate"
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
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
                {bookingItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      Chưa sử dụng dịch vụ nào
                    </td>
                  </tr>
                ) : (
                  bookingItems.map((bookingItem: any, i) => {
                    const item = extraItems.find(
                      (item: any) => item.id === bookingItem.ItemId
                    );

                    if (!item) {
                      return null;
                    }

                    return (
                      <tr
                        key={i}
                        className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-300"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black"
                        >
                          {i + 1}
                        </th>
                        <td className="px-6 py-4">{(item as any)?.name}</td>
                        <td className="px-6 py-4">{(item as any)?.price}</td>
                        <td className="px-6 py-4">{bookingItem.Quantity}</td>
                        <td className="px-6 py-4 text-right">
                          {bookingItem.TotalPrice}
                        </td>
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
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center my-4">
          <MdOutlineAddBox size={30} />
        </div>
        <div className="mx-8">
          <div className="px-4 py-4 w-full h-fit flex flex-col border-t border-b border-black bg-[#E8E8E8              ] bg-opacity-20">
            {bookingData.price && (
              <div className="flex justify-end">
                <span className="mr-[100px] font-bold">Tiền phòng</span>
                <span className="font-bold">{`${bookingData.price},000 VNĐ`}</span>
              </div>
            )}
            {totalServicePrice > 0 && (
              <div className="flex justify-end">
                <span className="mr-[95px] font-bold">Tiền dịch vụ</span>
                <span className="font-bold">{`${totalServicePrice},000 VNĐ`}</span>
              </div>
            )}
            {totalPrice && (
              <div className="flex justify-end">
                <span className="mr-[100px] font-bold">Tổng tiền</span>
                <span className="font-bold">{`${totalPrice},000 VNĐ`}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-4 my-4">
          <div>
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={handleSave}
            >
              Lưu
            </button>
          </div>
          <div>
            <button
              onClick={() => handleShowModelCheckout(true, bookingData.Id)}
              type="button"
              className="focus:outline-none text-white bg-[#FBC252] hover:bg-[#FFB100] font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Check-out
            </button>
          </div>
          <div>
            <button
              onClick={handleSendMail}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Gửi email
            </button>
          </div>
          <div>
            <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-[#C38154] dark:text-white dark:hover:bg-[#884A39]"
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
        </div>
      </div>
      {showModalCheckout && (
        <ModelCheckout
          handelShowModel={handleShowModelCheckout}
          id={bookingID}
        />
      )}
    </div>
  );
};

export default ModelDetail;
