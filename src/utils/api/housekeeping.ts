export const baseurl = 'https://api-pnv.bluejaypos.vn';

export const getListRoom = async (
  page: number
) => {
  const url = `${baseurl}/room/list?housekeeping=&roomType=&floor=&status=&orderBy=&page=${page}&limit=${6}`;

  const response = await fetch(url, {
    method:'GET',
    headers: {
        'Content-Type': 'application/json',
    }
})
const data = await response.json();
return data;
};

export const getListHouseKeeping = async () => {
  const url = `${baseurl}/housekeeping/getall`;

  const response = await fetch(url, {
    headers: {
      "Content-Type" : "application/json",
    },
    method:"GET"
  })
  
  const data = await response.json();
  return data
}

export const assignHousekeepingToRoom = async (roomId: number, employeeId: number) => {
  const url = ` ${baseurl}/housekeeping/assignclean`

  const response = await fetch(url, {
    headers: {
      "Content-Type" : "application/json",
    },
    method:"POST",
    body: JSON.stringify({ RoomId: roomId, EmployeeId: employeeId})
  })

  const data = await response.json();
  console.log("data response of assign HK", data)
  return data;
}

export const getDetailRoom = async (id: number) => {
  const url = `${baseurl}/room/${id}`

  const response = await fetch(url, {
    method:"GET",
    headers: {
      "Content-Type" : "application/json"
    }
  })

  const data = await response.json()
  return data
}