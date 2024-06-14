import { DataBooking, DataAddBooking, DataUpdateBooking } from "@/utils/types/receptionist"
import { log } from "console";
const baseurl = 'https://api-pnv.bluejaypos.vn';
// const baseurl = 'http://192.168.10.70:83';

export const loginApi = async (email:string, password:string) => {
    const url = `${baseurl}/auth/login`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  
    if (!response.ok) {
      throw new Error(`Failed to login: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  };

export const logoutApi = async (token: string) => {
  const url = `${baseurl}/auth/logout`;
  console.log("data token", token)
  console.log("type of token",typeof token)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
  });

  const data = await response.json();
  return data;
}

export const getProfile = async (token: string | null | undefined) => {
    const url = `${baseurl}/auth/profile`;

    const response = await fetch(url, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export const listBooking = async (fromDay: Date | null, toDay: Date | null, findText: string | null, roomType: number | null, roomDetail: number | null, status: number | null, typeDate: number, page: number, limit: number	
) => {
  const url = `${baseurl}/booking/list?fromDay=${fromDay}&toDay=${toDay? toDay.toISOString() : ""}&findText=${encodeURIComponent(findText ?? "")}&roomType=${roomType}&roomDetail=${roomDetail}&status=${status}&typeDate=${typeDate}&page=${page}&limit=${limit}`;

  const response = await fetch(url, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
  })
    const data = await response.json();
    console.log("Data response of list booking",data);
    
    return data;
}

export const getDetailBooking = async (id: number) => {
  const url = `${baseurl}/booking/${id}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch booking detail');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching booking detail:', error);
    throw error; 
  }
};

export const addBooking = async (formData: DataAddBooking) => {
  const url = `${baseurl}/booking/create`;

  const bookingData = {
    CheckinDate: formData.checkinDate,
    CheckoutDate: formData.checkoutDate,
    RoomTypeId: formData.roomType,
    FirstName: formData.firstName,
    LastName: formData.lastName,
    Email: formData.email,
    PhoneNumber: formData.phoneNumber,
  };
  console.log("data ưadd", bookingData)
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error("Failed to create booking");
    }

    const result = await response.json();
    console.log("Booking created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const updateBooking = async (id : number, formData: DataUpdateBooking) => {
  const url = `${baseurl}/booking/update?id=${id}`
  const bookingData = {
    CheckinDate: formData.checkinDate,
    CheckoutDate: formData.checkoutDate,
    RoomTypeId: formData.roomType,
    FirstName: formData.firstName,
    LastName: formData.lastName,
    Email: formData.email,
    PhoneNumber: formData.phoneNumber,
    Status: formData.Status
  };
  console.log("ID", id);
  console.log("This is the data of updated", bookingData);
  try {
    const response = await fetch(url,{
      method:'PATCH',
      headers :{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = response.json();
    return data

  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

export const cancelBooking = async (id: number) => {
  const url = `${baseurl}/booking/cancel?id=${id}`;

  const response = await fetch(url, {
      method:'PUT',
      headers: {
          'Content-Type': 'application/json',
      }
  })
  if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

export const sendMailBooking = async (email: string, name: string, bookingId: number) => {
  const url = `${baseurl}/api/email/send`;

  const body = {
    ToEmail: email,
    CustomerName: name,
    BookingDetails: bookingId
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(body)
  });

  const data = await response.json();
  return data;
}

export const paymentBooking = async (id: number) => {
    const url = `${baseurl}/payment?id=${id}`
    
    const response = await fetch (url, {
      headers : {
        "Content-Type" : "application/json"
      },
      method: "POST"
    })

    const data = await response.json();
    return data
}

export const getExtraitems = async () => {
  const url = `${baseurl}/extraitems/getall`

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "GET"
  })

  const data = await response.json();
  return data
}