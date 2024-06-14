import React, { useState, useEffect } from "react";
import { MdWindow, MdBedroomParent } from "react-icons/md";
import { FaWindowClose, FaConciergeBell } from "react-icons/fa";
import { format } from "date-fns";
import { getDetailBooking, paymentBooking } from "@/utils/api/receptionist";
import Swal from "sweetalert2";

const ModelCheckout = ({ handelShowModel, id }) => {
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
    price: 0,
    RoomNumber: "",
    Status: 0,
    CreateAt: "",
  });
  const [bookingItems, setBookingItems] = useState([]);
  const [totalServicePrice, setTotalServicePrice] = useState(0);

  useEffect(() => {
    let isMounted = true; // Flag to check if component is still mounted

    const fetchData = async () => {
      try {
        const data = await getDetailBooking(id);
        console.log("data before save booking", data);
        const bookingDetail = data.Data;

        setBookingData({
          checkinDate: format(
            new Date(bookingDetail.CheckinDate),
            "yyyy-MM-dd"
          ),
          checkoutDate: format(
            new Date(bookingDetail.CheckoutDate),
            "yyyy-MM-dd"
          ),
          roomType: bookingDetail.RoomType.Name,
          firstName: bookingDetail.Guest.FirstName,
          lastName: bookingDetail.Guest.LastName,
          email: bookingDetail.Guest.Email,
          phoneNumber: bookingDetail.Guest.PhoneNumber,
          maximumCapacity: bookingDetail.RoomType.MaximumCapacity,
          numberOfAdults: bookingDetail.RoomType.NumberOfAdults,
          numberOfChildren: bookingDetail.RoomType.NumberOfChildren,
          price: bookingDetail.RoomType.Price,
          RoomNumber: bookingDetail.Room ? bookingDetail.Room.RoomNumber : "",
          Status: bookingDetail.Status,
          CreateAt: bookingDetail.CreateAt,
        });
        setBookingItems(bookingDetail.BookingItems);
        console.log("Booking Items:", bookingDetail.BookingItems);

        const totalServicePrice = bookingDetail.BookingItems.reduce(
          (total, item) => total + item.TotalPrice,
          0
        );
        setTotalServicePrice(totalServicePrice);
      } catch (error) {
        console.error("Error fetching booking detail:", error);
      }
    };

    if (isMounted) {
      fetchData();
      isMounted = false; // Fetch data only once when component mounts
    }

    return () => {
      isMounted = false; // Set isMounted to false on component unmount
    };
  }, [id]); // Only re-run the effect if `id` changes

  // You may need to add useEffect dependencies and return cleanup

  const handleSave = async () => {
    try {
      console.log(bookingData);
      await paymentBooking(id);
      Swal.fire({
        title: "Thành công!",
        text: "Thanh toán phòng thành công.",
        icon: "success",
        confirmButtonText: "OK",
      });
      handelShowModel(false, 0);
    } catch (error) {
      console.error("Lỗi thanh toán:", error);
    }
  };

  const totalPrice = bookingData.price + totalServicePrice;

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto">
      <div className="w-fit absolute h-fit backdrop-filter backdrop-brightness-75 backdrop-blur-md py-8 px-4 top-1 bottom-10 bg-white border-black border-1 rounded-md">
        <div className="flex justify-end mr-4 cursor-pointer">
          <FaWindowClose size={25} onClick={() => handelShowModel(false, 0)} />
        </div>
        <div className="text-center font-bold text-xl">Thanh toán</div>
        <div>
          <div className="flex flex-row items-center gap-1 ml-8">
            <div>
              <MdWindow size={25} />
            </div>
            <div>Thông tin booking</div>
          </div>
          <div className="ml-8 mt-2">
            <div className="flex flex-row items-center">
              <span>Họ và tên</span>
              <span className="ml-24">
                {bookingData.firstName} {bookingData.lastName}
              </span>
            </div>
            <div className="flex flex-row items-center">
              <span>Số điện thoại</span>
              <span className="ml-[72px]">{bookingData.phoneNumber}</span>
            </div>
            <div className="flex flex-row items-center">
              <span>Email</span>
              <span className="ml-32">{bookingData.email}</span>
            </div>
            <div className="flex flex-row items-center">
              <span>Thời gian đặt phòng</span>
              <span className="ml-[22px]">{bookingData.CreateAt}</span>
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
                    {bookingData.RoomNumber}
                  </th>
                  <td className="px-6 py-4">{bookingData.checkinDate}</td>
                  <td className="px-6 py-4">{bookingData.checkoutDate}</td>
                  <td className="px-6 py-4">1</td>
                  <td className="px-6 py-4">{bookingData.price.toFixed(2)}</td>
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
                {bookingItems.length > 0 ? (
                  bookingItems.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-300"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">{item.Item.Name}</td>
                      <td className="px-6 py-4">{item.Item.Price}</td>
                      <td className="px-6 py-4">{item.Quantity}</td>
                      <td className="px-6 py-4 text-right">
                        {item.TotalPrice}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center font-medium text-gray-500 dark:text-gray-400"
                    >
                      Khách hàng không sử dụng dịch vụ gì
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mx-8">
          <div className="px-4 py-4 w-full h-fit flex flex-col border-t border-b border-black bg-[#D9D9D9] bg-opacity-20">
            {totalServicePrice > 0 && (
              <div className="flex justify-end">
                <span className="mr-[55px] font-bold">Tổng tiền dịch vụ</span>
                <span>{totalServicePrice.toFixed(2)} VNĐ</span>
              </div>
            )}
            {bookingData.price > 0 && (
              <div className="flex justify-end">
                <span className="mr-[60px] font-bold">Tổng tiền phòng</span>
                <span>{bookingData.price.toFixed(2)} VNĐ</span>
              </div>
            )}
            {totalPrice > 0 && (
              <div className="flex justify-end">
                <span className="mr-[101px] font-bold">Tổng tiền</span>
                <span>{totalPrice.toFixed(2)} VNĐ</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-4 my-4 mr-8">
          <div>
            <button
              onClick={() => handleSave()}
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Thanh toán
            </button>
          </div>
          <div>
            <button
              onClick={() => handelShowModel(false, 0)}
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

export default ModelCheckout;
