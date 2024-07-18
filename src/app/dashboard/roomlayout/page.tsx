"use client";
import React, { useState, useEffect } from "react";
import { getListRoom } from "../../../utils/api/housekeeping";
import { Room } from "../../../utils/types/housekeeping";
import ClipLoader from "react-spinners/ClipLoader";
import PopupCleaning from "./../../../components/PopupCleaning";
import { FcAlarmClock } from "react-icons/fc";
import { Tooltip } from "react-tooltip";
import { FcCheckmark } from "react-icons/fc";

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
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [noDataFound, setNoDataFound] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString()
  );

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

  const filterRooms = (data: Room[], filters: string[]) => {
    if (filters.length === 0) {
      return data; // Return all rooms if no filters are selected
    }

    // Define filter conditions with explicit typing
    const filterConditions: { [key: string]: (room: Room) => boolean } = {
      clean: (room: Room) => room.Status === 1,
      dirty: (room: Room) => room.Status !== 1,
      occupied: (room: Room) => room.BookingId !== null,
      vacant: (room: Room) => room.BookingId === null,
    };

    // Apply filters
    return data.filter((room) => {
      return filters.every((filter) => {
        const condition = filterConditions[filter] as (room: Room) => boolean;
        return condition(room);
      });
    });
  };

  useEffect(() => {
    const filterAndSortData = () => {
      let filteredData = [...listRoom]; // Always start with the original data

      // Apply room filters
      if (selectedFilters.length > 0) {
        filteredData = filterRooms(filteredData, selectedFilters);
      }

      // Sort and filter based on attribute
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
  }, [filterAttribute, selectedFilters, listRoom]);

  const handleFilterChange = (attribute: string) => {
    setFilterAttribute(attribute);
  };

  const handleRoomFilter = (type: string) => {
    // Check if the filter is "all"
    if (type === "all") {
      setSelectedFilters([]); // Reset selected filters
      setFilterType(""); // Reset filter type to show all rooms
      return;
    }

    // Otherwise, handle filter selection normally
    const index = selectedFilters.indexOf(type);

    if (index === -1) {
      // Filter not found in selectedFilters, add it
      setSelectedFilters([...selectedFilters, type]);
    } else {
      // Filter found in selectedFilters, remove it
      const updatedFilters = [...selectedFilters];
      updatedFilters.splice(index, 1);
      setSelectedFilters(updatedFilters);
    }
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

  const getTooltipContent = (status: any, lastName: any, firstName: any) => {
    switch (status) {
      case 3:
        return `Đang chờ xác nhận từ ${lastName} ${firstName}`;
      case 4:
        return `${lastName} ${firstName} đã xác nhận dọn phòng`;
      case 5:
        return `${lastName} ${firstName} đang dọn phòng`;
      default:
        return "";
    }
  };
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
      <div className="flex space-x-4 mb-4 mt-4 relative">
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
          Lọc Theo Khu Vực
        </button>
        <div className="absolute top-0 right-0 mr-4">
          <div className="px-4 py-2 bg-white rounded shadow-lg text-lg font-bold text-gray-600">
            Ngày {currentDate}
          </div>
        </div>
      </div>

      <div className="top-2 left-2 flex space-x-2 justify-center mt-8 mb-8">
        {/* Tất cả */}
        <div
          className={`flex gap-4 items-center cursor-pointer ${
            selectedFilters.length === 0 ? "text-[#2457C5] font-bold" : ""
          }`}
          onClick={() => handleRoomFilter("all")}
        >
          <div className="text-sm mr-16">Tất cả</div>
        </div>
        {/* Phòng sạch */}
        <div
          className={`flex gap-4 items-center cursor-pointer ${
            selectedFilters.includes("clean") ? "text-[#2457C5] font-bold" : ""
          }`}
          onClick={() => handleRoomFilter("clean")}
        >
          <div className="relative w-[30px] h-[30px] bg-green-600 bg-opacity-50 rounded-[10px] flex items-center justify-center">
            {selectedFilters.includes("clean") && (
              <FcCheckmark className="absolute w-[30px] h-[30px]" />
            )}
          </div>
          <div className="text-sm">Phòng sạch</div>
        </div>
        {/* Phòng bẩn */}
        <div
          className={`flex gap-4 items-center cursor-pointer ${
            selectedFilters.includes("dirty") ? "text-[#2457C5] font-bold" : ""
          }`}
          onClick={() => handleRoomFilter("dirty")}
        >
          <div className="relative w-[30px] h-[30px] bg-yellow-800 bg-opacity-40 rounded-[10px] flex items-center justify-center">
            {selectedFilters.includes("dirty") && (
              <FcCheckmark className="absolute w-[30px] h-[30px]" />
            )}
          </div>
          <div className="text-sm">Phòng bẩn</div>
        </div>
        {/* Đang có khách */}
        <div
          className={`flex gap-4 items-center cursor-pointer ${
            selectedFilters.includes("occupied")
              ? "text-[#2457C5] font-bold"
              : ""
          }`}
          onClick={() => handleRoomFilter("occupied")}
        >
          <div className="relative w-[40px] h-[10px] bg-red-600 bg-opacity-80 rounded-tl-[10px] rounded-tr-[10px] flex items-center justify-center">
            {selectedFilters.includes("occupied") && (
              <FcCheckmark className="absolute w-[30px] h-[30px]" />
            )}
          </div>
          <div className="text-sm">Đang có khách sử dụng</div>
        </div>
        {/* Phòng trống */}
        <div
          className={`flex gap-4 items-center cursor-pointer ${
            selectedFilters.includes("vacant") ? "text-[#2457C5] font-bold" : ""
          }`}
          onClick={() => handleRoomFilter("vacant")}
        >
          <div className="relative w-[40px] h-[10px] bg-blue-600 bg-opacity-70 rounded-tl-[10px] rounded-tr-[10px] flex items-center justify-center">
            {selectedFilters.includes("vacant") && (
              <FcCheckmark className="absolute w-[30px] h-[30px]" />
            )}
          </div>
          <div className="text-sm">Phòng trống</div>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <ClipLoader color="#36d7b7" />
        </div>
      )}
      <div className="overflow-x-auto">
        {noResults ? (
          <p>Không tìm thấy dữ liệu phòng.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-500 border-collapse">
            <thead className="bg-[#04AA6D] text-white">
              <tr>
                <th className="py-2 px-4 border-b border-r border-gray-500">
                  {filterAttribute === "Floor" ? "Khu Vực" : "Loại Phòng"}
                </th>
                <th className="py-2 px-4 border-b border-r border-gray-500">
                  Số Phòng
                </th>
                <th className="py-2 px-4 border-b border-gray-500 text-center">
                  Số Lượng Phòng
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedData).length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-4 px-4 text-center">
                    Không có dữ liệu phòng thỏa mãn điều kiện lọc.
                  </td>
                </tr>
              ) : (
                Object.keys(groupedData).map((key) => (
                  <tr key={key}>
                    <td className="py-2 px-4 border-b border-r border-gray-500 font-bold">
                      {filterAttribute === "Floor" ? `Khu vực ${key}` : key}
                    </td>
                    <td className="py-8 px-8 border-b border-r border-gray-500 relative">
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
                          >
                            {room.Status >= 3 && room.Status <= 5 && (
                              <>
                                <FcAlarmClock
                                  data-tip
                                  data-for={`tooltip-${room.Id}`}
                                  data-tooltip-id={`tooltip-${room.Id}`}
                                  className="absolute w-[20px] h-[20px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                />
                                <Tooltip id={`tooltip-${room.Id}`} place="top">
                                  {getTooltipContent(
                                    room.Status,
                                    room.LastName,
                                    room.FirstName
                                  )}
                                </Tooltip>
                              </>
                            )}
                          </div>
                          <span>{room.RoomNumber}</span>
                        </span>
                      ))}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-500 text-center">
                      {groupedData[key].length}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      {showPopUpCleaning && (
        <PopupCleaning handelShowPopUp={handleShowPopUpCleaning} id={roomID} />
      )}
    </div>
  );
};

export default RoomLayout;
