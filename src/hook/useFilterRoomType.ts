import { useState, useEffect } from 'react';
import { getListRoom } from "@/utils/api/receptionist";

const useFilterRoomType = (roomType: any, getListRoom: any) => {
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [roomData, setRoomData] = useState([]);
  
    useEffect(() => {
      const fetchRooms = async () => {
        try {
          const response = await getListRoom();
          setRoomData(response.Data);
        } catch (error) {
          console.error('Error fetching room data:', error);
        }
      };
  
      fetchRooms();
    }, [getListRoom]);
  
    useEffect(() => {
      if (roomType && roomData.length > 0) {
        const filtered: any = roomData.filter((room: any) => room.TypeRoomName === roomType);
        setFilteredRooms(filtered);
      } else {
        setFilteredRooms([]);
      }
    }, [roomType, roomData]);
  
    return filteredRooms;
  };
  
  export default useFilterRoomType;