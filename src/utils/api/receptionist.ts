// const baseurl = 'https://api-pnv.bluejaypos.vn';
const baseurl = 'http://192.168.10.70:83';

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
    console.log("data response",data)
    return data;
  };

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


export const listBooking = async () => {
    const url = `${baseurl}/auth/login`;

    const response = await fetch(url, {
        method:'',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const data = await response.json();
    return data;
}

