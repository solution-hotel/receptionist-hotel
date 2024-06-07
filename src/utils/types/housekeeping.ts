export interface Room {
    Id: number;
    RoomNumber: string;
    TypeRoomName: string;
    BookingId?: number | null;
    status: number;
    LastName: string;
    FirstName: string;
  }