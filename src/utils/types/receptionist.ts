export interface Booking {
    id: number;
    lastName: string;
    firstName: string;
    phoneNumber: string;
    typeRoomName: string;
    roomNumber: string;
    checkinDate: Date;
    checkoutDate: Date;
}


export interface BookingFormData {
    checkinDate: string;
    checkoutDate: string;
    roomType: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }