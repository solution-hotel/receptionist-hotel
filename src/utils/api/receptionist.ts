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

export const logoutApi = async (token) => {
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

export const listBooking = async (fromDay: Date, toDay: Date | null, findText: string | null, roomType: number | null, roomDetail: number | null, status: number | null, typeDate: number | null, page: string, limit: number	
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
    return data;
  } catch (error) {
    console.error('Error fetching booking detail:', error);
    throw error; 
  }
};

export const addBooking = async (formData) => {
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
    console.log("Booking created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const updateBooking = async (id, formData) => {
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

export const cancelBooking = async (id) => {
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

