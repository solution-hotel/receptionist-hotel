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
  updateStatusRoom,
} from "@/utils/api/receptionist";
import { format } from "date-fns";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import { DataUpdateBooking } from "@/utils/types/receptionist";
import {
  getExtraitems,
  getAllRoomType,
  getListRoom,
} from "./../utils/api/receptionist";
import PopupCheckingRoom from "./PopupCheckingRoom";

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
    RoomId: 0,
  });
  const [bookingItems, setBookingItems] = useState([]);
  const [bookingID, setBookingID] = useState<number>(0);
  const [totalServicePrice, setTotalServicePrice] = useState(0);
  const [extraItems, setExtraItems] = useState([]);
  const [showModalCheckout, setShowModalCheckout] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopUpCleaning, setShowPopUpChecking] = useState(false);
  const [roomID, setRoomID] = useState(null);
  const [statusBooking, setStatusBooking] = useState<number>(0);
  const [roomData, setRoomData] = useState([]);
  const [listRoom, setListRoom] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailData, extraItemsData, roomDataResponse, listRoomData] =
          await Promise.all([
            getDetailBooking(id),
            getExtraitems(),
            getAllRoomType(),
            getListRoom(),
          ]);
        setListRoom(listRoomData.Data);
        setRoomData(roomDataResponse.Data);
        if (detailData.Data.Room !== null) {
          setRoomID(detailData.Data.Room.Id);
        }
        setStatusBooking(detailData.Data.Status);
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
          RoomNumber: detailData?.Data?.Room?.RoomNumber || null,
          Status: detailData.Data.Status,
          Id: detailData.Data.Id,
          RoomId: detailData?.Data?.Room?.Id || null,
        });
        setBookingItems(detailData.Data.BookingItems);
        setExtraItems(extraItemsData.Data);

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

  const roomTypeMapping = {
    3: "Standard",
    4: "Single",
    5: "Double",
    6: "Twin",
    7: "Triple",
    8: "Family",
    9: "Presidential",
    10: "Penthouse",
    11: "Bungalow",
    12: "Studio",
    13: "Loft",
    14: "Standard",
    15: "Deluxe",
    16: "Suite",
    17: "Family",
    18: "Executive",
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
        const selectedRoom: any = roomData.find(
          (room: any) => room.id === parseInt(value)
        );
        if (selectedRoom) {
          const newPrice = getRoomPrice(value);
          return {
            ...updatedData,
            price: newPrice,
            maximumCapacity: selectedRoom.maximumCapacity,
            numberOfAdults: selectedRoom.numberOfAdults,
            numberOfChildren: selectedRoom.numberOfChildren,
          } as DataUpdateBooking;
        }
      }

      return updatedData as DataUpdateBooking;
    });
  };

  const filteredRooms = listRoom.filter((room: any) => {
    const selectedRoomTypeId = parseInt(bookingData.roomType);

    switch (selectedRoomTypeId) {
      case 3:
      case 14:
        return room.TypeRoomName === "Standard";
      case 4:
        return room.TypeRoomName === "Single";
      case 5:
        return room.TypeRoomName === "Double";
      case 6:
        return room.TypeRoomName === "Twin";
      case 7:
        return room.TypeRoomName === "Triple";
      case 8:
      case 17:
        return room.TypeRoomName === "Family";
      case 9:
        return room.TypeRoomName === "Presidential";
      case 10:
        return room.TypeRoomName === "Penthouse";
      case 11:
        return room.TypeRoomName === "Bungalow";
      case 12:
        return room.TypeRoomName === "Studio";
      case 13:
        return room.TypeRoomName === "Loft";
      case 15:
        return room.TypeRoomName === "Deluxe";
      case 16:
        return room.TypeRoomName === "Suite";
      case 18:
        return room.TypeRoomName === "Executive";
      default:
        return true;
    }
  });

  const uniqueRooms = Array.from(
    new Set(filteredRooms.map((room: any) => room.RoomNumber))
  ).map((roomNumber) => {
    return filteredRooms.find((room: any) => room.RoomNumber === roomNumber);
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      console.log(bookingData);
      await updateBooking(id, bookingData);
      if (bookingData.Status === 2) {
        await updateStatusRoom(bookingData.RoomId);
      }
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

  const handleShowPopUpChecking = (show: boolean, id: null) => {
    setRoomID(id);
    setShowPopUpChecking(show);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto">
      <div className="w-fit absolute h-fit backdrop-filter backdrop-brightness-75 backdrop-blur-md py-8 top-1 bottom-10 bg-white border-black border-1 z-100 rounded-md">
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
          <div className="mx-4 my-2 px-4 py-4">
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
                      className="border-1 w-28 h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
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
                      className="border-1 w-28 h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
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
                    {roomData.map((room: any) => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
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
                <label htmlFor="numberRoom">Chọn số phòng</label>
                <select
                  name="RoomNumber"
                  value={bookingData.RoomId}
                  onChange={handleChange}
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
                >
                  <option value="" disabled>
                    -- Select Room --
                  </option>

                  {uniqueRooms.length > 0 ? (
                    uniqueRooms.map((room: any) => (
                      <option key={room.Id} value={room.Id}>
                        {room.RoomNumber}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      Không có phòng có sẵn
                    </option>
                  )}

                  {bookingData.RoomNumber &&
                    !uniqueRooms.some(
                      (room: any) => room.Id === bookingData.RoomId
                    ) && (
                      <option value={bookingData.RoomId}>
                        {bookingData.RoomNumber}
                      </option>
                    )}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="status">Trạng thái</label>
                <select
                  value={bookingData.Status}
                  name="Status"
                  id="status"
                  className="border-1 w-full h-fit focus:outline-none px-2 py-3 focus:ring focus:ring-blue-400 rounded-md"
                  onChange={handleChange}
                  disabled={bookingData.Status ? bookingData.Status == 5 : true}
                >
                  <option value="1">Đã xác nhận</option>
                  <option value="2">Check-in</option>
                  <option value="3">Check-out</option>
                  <option value="4">Đã thanh toán</option>
                  <option value="5">Đã hủy</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
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
                  min="2024-06-01"
                  max="2999-12-31"
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
                  min="2024-06-01"
                  max="2999-12-31"
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
          <div className="px-4 py-4 w-full h-fit flex flex-col border-t border-b border-black bg-[#E8E8E8] bg-opacity-20">
            {bookingData.price > 0 && (
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
            {totalPrice > 0 && (
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
              disabled={bookingData.Status ? bookingData.Status == 5 : true}
              type="button"
              onClick={handleSave}
              className={`focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 ${
                bookingData.Status == 5
                  ? "bg-gray-400 text-gray-600"
                  : "text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              }`}
            >
              Lưu
            </button>
          </div>
          <div>
            <button
              disabled={bookingData.Status ? bookingData.Status == 5 : true}
              onClick={() => handleShowModelCheckout(true, bookingData.Id)}
              type="button"
              className={`focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 ${
                bookingData.Status == 5
                  ? "bg-gray-400 text-gray-600"
                  : "text-white bg-[#FBC252] hover:bg-[#FFB100]"
              }`}
            >
              Check-out
            </button>
          </div>
          <div>
            <button
              disabled={bookingData.Status ? bookingData.Status == 5 : true}
              onClick={handleSendMail}
              type="button"
              className={`font-medium rounded-lg text-sm px-5 py-2.5 ${
                bookingData.Status == 5
                  ? "bg-gray-400 text-gray-600"
                  : "text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              }`}
            >
              Gửi email
            </button>
          </div>
          <div>
            <button
              disabled={bookingData.Status ? bookingData.Status == 5 : true}
              onClick={() => handleShowPopUpChecking(true, roomID)}
              type="button"
              className={`font-medium rounded-lg text-sm px-5 py-2.5 ${
                bookingData.Status == 5
                  ? "bg-gray-400 text-gray-600"
                  : "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-[#C38154] dark:text-white dark:hover:bg-[#884A39]"
              }`}
            >
              Y/C kiểm phòng
            </button>
          </div>
          <div>
            <button
              disabled={bookingData.Status ? bookingData.Status === 5 : true}
              type="button"
              className={`font-medium rounded-lg text-sm px-5 py-2.5 ${
                bookingData.Status == 5
                  ? "bg-gray-400 text-gray-600"
                  : "text-white bg-[#FF0000] border border-gray-300 hover:bg-[#EE4E4E]"
              }`}
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
      {showPopUpCleaning && (
        <PopupCheckingRoom
          handelShowPopUp={handleShowPopUpChecking}
          id={roomID}
          status={statusBooking}
        />
      )}
    </div>
  );
};

export default ModelDetail;
