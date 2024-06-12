export interface Room {
    Id: number;
    RoomNumber: string;
    TypeRoomName: string;
    BookingId?: number | null;
    Status: number;
    LastName: string;
    FirstName: string;
  }

export interface ListHousekeeping {
  Id: number;
  FirstName: string;
  LastName: string;
}
export interface DetailRoom {
  Data: {
    roomNumber?: string;
    roomName?: string;
    floor?: string;
    status?: number;
  };
}