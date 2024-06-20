import { DataBooking, DataAddBooking, DataUpdateBooking } from "@/utils/types/receptionist"
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
    console.log('====================================');
    console.log("data response of detail booking",data);
    console.log('====================================');
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
    RoomTypeId: parseInt(formData.roomType),
    FirstName: formData.firstName,
    LastName: formData.lastName,
    Email: formData.email,
    RoomId: parseInt(formData.RoomNumber),
    PhoneNumber: formData.phoneNumber,
    Status: formData.Status
  }
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
    Body: bookingId
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


export const assignHousekeepingToRoomToCheck = async (roomId: number, employeeId: number) => {
  const url = ` ${baseurl}/housekeeping/assigncheck`;
  const response = await fetch(url, {
    headers: {
      "Content-Type" : "application/json",
    },
    method:"POST",
    body: JSON.stringify({ RoomId: roomId, EmployeeId: employeeId})
  })

  const data = await response.json();
  console.log("data response of assign HK to check the room", data)
  return data;
}


export const getAllRoomType = async () => {
  const url = `${baseurl}/roomtype/getall`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    },
    method:"GET"
  })

  const data = await response.json();
  return data
}


export const getListRoom = async () => {
  const url = `${baseurl}/room/list?housekeeping=&roomType=&floor=&status=&orderBy=&page=${1}&limit=${1000}`;

  const response = await fetch(url, {
    method:'GET',
    headers: {
        'Content-Type': 'application/json',
    }
})
const data = await response.json();
return data;
};