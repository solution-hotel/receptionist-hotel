"use client";
import React, { useState, useEffect } from "react";
import { getListRoom } from "../../../utils/api/housekeeping";
import { Room } from "../../../utils/types/housekeeping";
import ClipLoader from "react-spinners/ClipLoader";
import PopupCleaning from "./../../../components/PopupCleaning";

const RoomLayout = () => {
  const [listRoom, setDataListRoom] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [roomID, setRoomID] = useState<number>(0);
  const [showPopUpCleaning, setShowPopUpCleaning] = useState(false);
  const [numberDirty, setNumberDirty] = useState<number>(0);
  const [numberClean, setNumberClean] = useState<number>(0);
  const [filterAttribute, setFilterAttribute] = useState<string>("Floor");
  const [filterType, setFilterType] = useState("");
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(listRoom);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleShowPopUpCleaning = (show: boolean, id: number) => {
    setRoomID(id);
    setShowPopUpCleaning(show);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const room = await getListRoom(1, 1000);

        let cleanCount = 0;
        let dirtyCount = 0;

        room.Data.forEach((room: any) => {
          if (room.Status >= 2 && room.Status <= 6) {
            dirtyCount++;
          } else if (room.Status === 1) {
            cleanCount++;
          }
        });

        setNumberClean(cleanCount);
        setNumberDirty(dirtyCount);

        console.log("data response", room);

        if (room.Data && room.Data.length > 0) {
          setDataListRoom(room.Data);
          setNoResults(false);
        } else {
          setDataListRoom([]);
          setNoResults(true);
        }
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching booking data:", error);
        setNoResults(true);
      }
    };

    fetchData();
  }, [noResults]);

  const filterRooms = (type: string, data: Room[]) => {
    switch (type) {
      case "clean":
        return data.filter((room) => room.Status === 1);
      case "dirty":
        return data.filter((room) => room.Status !== 1);
      case "occupied":
        return data.filter((room) => room.BookingId);
      case "vacant":
        return data.filter((room) => !room.BookingId);
      default:
        return data;
    }
  };

  useEffect(() => {
    const filterAndSortData = () => {
      let filteredData = [...listRoom];

      if (filterType && filterType !== "all") {
        filteredData = filterRooms(filterType, filteredData);
      }

      switch (filterAttribute) {
        case "TypeRoomName":
          filteredData = filteredData
            .filter((room) => room.TypeRoomName !== null)
            .sort((a, b) => a.TypeRoomName.localeCompare(b.TypeRoomName));
          break;
        case "Floor":
          filteredData = filteredData
            .filter((room) => room.Floor !== null)
            .sort((a, b) => a.Floor.localeCompare(b.Floor));
          break;
        default:
          break;
      }

      setFilteredRooms(filteredData);
    };

    filterAndSortData();
  }, [filterAttribute, filterType, listRoom]);

  const handleFilterChange = (attribute: string) => {
    setFilterAttribute(attribute);
  };

  const handleRoomFilter = (type: string) => {
    setFilterType(type);
    setSelectedFilter(type);
  };

  const groupByAttribute = (data: Room[], attribute: string) => {
    return data.reduce((acc, item) => {
      const key = item[attribute as keyof Room] as string;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {} as { [key: string]: Room[] });
  };

  const groupedData = groupByAttribute(filteredRooms, filterAttribute);
  return (
    <div className="p-4">
      <div className="flex justify-start gap-4">
        <div className=" bg-slate-50 bg-opacity-90 w-72 h-28 rounded-lg backdrop-blur-lg shadow-lg">
          <div className="mt-4 ml-4">
            <div className="text-md">Số phòng bẩn</div>
            <div className="font-bold text-3xl">{numberDirty}</div>
          </div>
        </div>
        <div className=" bg-slate-50 bg-opacity-90 w-72 h-28 rounded-lg backdrop-blur-lg shadow-lg">
          <div className="mt-4 ml-4">
            <div className="text-md">Số phòng sạch</div>
            <div className="font-bold text-3xl">{numberClean}</div>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 mb-4 mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => handleFilterChange("TypeRoomName")}
        >
          Lọc Theo Loại Phòng
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => handleFilterChange("Floor")}
        >
          Lọc Theo Tầng
        </button>
      </div>

      <div className="top-2 left-2 flex space-x-2 justify-center mt-8 mb-8">
        {/* Tất cả*/}
        <div
          className={`flex gap-4 items-center cursor-pointer`}
          onClick={() => handleRoomFilter("all")}
        >
          {/* <div className="w-[40px] h-[10px] bg-blue-600 bg-opacity-70 rounded-tl-[10px] rounded-tr-[10px]"></div> */}
          <div
            className={`text-sm ${
              selectedFilter === "all" ? "text-[#2457C5] font-bold" : ""
            }`}
          >
            Tất cả
          </div>
        </div>
        <div
          className={`flex gap-4 items-center cursor-pointer`}
          onClick={() => handleRoomFilter("clean")}
        >
          <div className="w-[30px] h-[30px] bg-green-600 bg-opacity-50 rounded-[10px]"></div>
          <div
            className={`text-sm ${
              selectedFilter === "clean" ? "text-[#2457C5] font-bold" : ""
            }`}
          >
            Phòng sạch
          </div>
        </div>
        {/* Phòng bẩn */}
        <div
          className={`flex gap-4 items-center cursor-pointer`}
          onClick={() => handleRoomFilter("dirty")}
        >
          <div className="w-[30px] h-[30px] bg-yellow-800 bg-opacity-40 rounded-[10px]"></div>
          <div
            className={`text-sm ${
              selectedFilter === "dirty" ? "text-[#2457C5] font-bold" : ""
            }`}
          >
            Phòng bẩn
          </div>
        </div>
        {/* Đang có khách */}
        <div
          className={`flex gap-4 items-center cursor-pointer`}
          onClick={() => handleRoomFilter("occupied")}
        >
          <div className="w-[40px] h-[10px] bg-red-600 bg-opacity-80 rounded-tl-[10px] rounded-tr-[10px]"></div>
          <div
            className={`text-sm ${
              selectedFilter === "occupied" ? "text-[#2457C5] font-bold" : ""
            }`}
          >
            Đang có khách sử dụng
          </div>
        </div>
        {/* Phòng trống */}
        <div
          className={`flex gap-4 items-center cursor-pointer`}
          onClick={() => handleRoomFilter("vacant")}
        >
          <div className="w-[40px] h-[10px] bg-blue-600 bg-opacity-70 rounded-tl-[10px] rounded-tr-[10px]"></div>
          <div
            className={`text-sm ${
              selectedFilter === "vacant" ? "text-[#2457C5] font-bold" : ""
            }`}
          >
            Phòng trống
          </div>
        </div>
      </div>


      {loading && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <ClipLoader color="#36d7b7" />
        </div>
      )}
      {noResults ? (
        <p>No results found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-500 border-collapse">
            <thead className="bg-[#04AA6D] text-white">
              <tr>
                <th className="py-2 px-4 border-b border-r border-gray-500">
                  {filterAttribute === "Floor" ? "Tầng" : "Loại Phòng"}
                </th>
                <th className="py-2 px-4 border-b border-gray-500">Số Phòng</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedData).map((key) => (
                <tr key={key}>
                  <td className="py-2 px-4 border-b border-r border-gray-500 font-bold">
                    {filterAttribute === "Floor" ? `Tầng ${key}` : key}
                  </td>
                  <td className="py-8 px-8 border-b border-gray-500">
                    {groupedData[key].map((room, index) => (
                      <span
                        onClick={() => handleShowPopUpCleaning(true, room.Id)}
                        key={room.Id}
                        className={`mr-2 ${
                          index > 0 ? "ml-2" : ""
                        } relative w-[400px] h-[400px] px-4 py-4 rounded-[10px] cursor-pointer ${
                          room.Status === 1
                            ? "bg-green-600 bg-opacity-50"
                            : "bg-yellow-800 bg-opacity-40"
                        }`}
                      >
                        <div
                          className={`absolute top-[0.2px] left-[0.4px] w-[57px] h-[10px] rounded-tl-[10px] rounded-tr-[10px] ${
                            room.BookingId
                              ? "bg-red-600 bg-opacity-80"
                              : "bg-blue-600 bg-opacity-70"
                          }`}
                        ></div>
                        <span>{room.RoomNumber}</span>
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}



      {showPopUpCleaning && (
        <PopupCleaning handelShowPopUp={handleShowPopUpCleaning} id={roomID} />
      )}
    </div>
  );
};

export default RoomLayout;
