export interface Booking {
    id: number;
    Id: number;
    lastName: string;
    LastName: string;
    firstName: string;
    FirstName: string;
    phoneNumber: number;
    PhoneNumber: number;
    typeRoomName: string;
    TypeRoomName: string;
    roomNumber: string;
    RoomNumber: string;
    checkinDate: Date;
    CheckinDate: Date;
    checkoutDate: Date;
    CheckoutDate: Date;
}

export interface BookingFormData {
    checkinDate: string;
    checkoutDate: string;
    roomType: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
}

export interface DataBooking {
    checkinDate: Date;
    checkoutDate: Date;
    roomType: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    Status: number;
}
export interface DataAddBooking {
    firstName: string,
    lastName: string,
    numberOfPeople: number,
    roomType: string,
    phoneNumber: string,
    adults: number,
    quantity: number,
    email: string,
    children: number,
    price: number,
    checkinDate: string,
    checkoutDate: string,
    message: string,
}

export interface DataUpdateBooking {
    checkinDate: string,
    checkoutDate: string,
    roomType: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    maximumCapacity: string,
    numberOfAdults: string,
    numberOfChildren: string,
    price: number,
    RoomNumber: string;
    Status: number,
    Id: number,
    RoomId: any
}

export interface FormDataValidate {
    lastName?: string;
    firstName?: string;
    roomType?: string;
    phoneNumber?: string;
    email?: string;
    checkinDate?: string;
    checkoutDate?: string;
}

export interface ChatType {
   userId: string | undefined;
}