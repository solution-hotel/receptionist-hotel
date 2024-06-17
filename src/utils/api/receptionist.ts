import { DataBooking, DataAddBooking, DataUpdateBooking } from "@/utils/types/receptionist"
import { log } from "console";
const baseurl = 'https://api-pnv.bluejaypos.vn';
// const baseurl = 'http://192.168.10.70:83';

export const loginApi = async (email: string, password: string) => {
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
  console.log("type of token", typeof token)
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
    method: 'GET',
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
  const url = `${baseurl}/booking/list?fromDay=${fromDay}&toDay=${toDay ? toDay.toISOString() : ""}&findText=${encodeURIComponent(findText ?? "")}&roomType=${roomType}&roomDetail=${roomDetail}&status=${status}&typeDate=${typeDate}&page=${page}&limit=${limit}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const data = await response.json();
  console.log("Data response of list booking", data);

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

export const updateBooking = async (id: number, formData: DataUpdateBooking) => {
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
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
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
    method: 'PUT',
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
    BookingDetails: `
    <!DOCTYPE HTML
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>

  <style type="text/css">
    @media only screen and (min-width: 620px) {
      .u-row {
        width: 600px !important;
      }

      .u-row .u-col {
        vertical-align: top;
      }

      .u-row .u-col-100 {
        width: 600px !important;
      }

    }

    @media (max-width: 620px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }

      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }

      .u-row {
        width: 100% !important;
      }

      .u-col {
        width: 100% !important;
      }

      .u-col>div {
        margin: 0 auto;
      }
    }

    body {
      margin: 0;
      padding: 0;
    }

    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }

    p {
      margin: 0;
    }

    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }

    * {
      line-height: inherit;
    }

    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }

    table,
    td {
      color: #000000;
    }

    #u_body a {
      color: #0000ee;
      text-decoration: underline;
    }

    @media (max-width: 480px) {
      #u_content_heading_2 .v-container-padding-padding {
        padding: 20px 10px 27px !important;
      }

      #u_content_heading_3 .v-container-padding-padding {
        padding: 51px 10px 50px !important;
      }

      #u_content_text_1 .v-container-padding-padding {
        padding: 10px !important;
      }

      #u_content_button_1 .v-container-padding-padding {
        padding: 10px !important;
      }

      #u_content_button_1 .v-size-width {
        width: 80% !important;
      }

      #u_content_text_2 .v-container-padding-padding {
        padding: 10px 10px 40px !important;
      }
    }
  </style>
  <link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css">
</head>

<body class="clean-body u_body"
  style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ecf0f1;color: #000000">
  <table id="u_body"
    style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ecf0f1;width:100%"
    cellpadding="0" cellspacing="0">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <div class="u-row-container"
            style="padding: 0px;background-image: url('images/image-5.png');background-repeat: no-repeat;background-position: center top;background-color: transparent">
            <div class="u-row"
              style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
              <div
                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <div class="u-col u-col-100"
                  style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;">
                    <div
                      style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                      <table id="u_content_heading_2" style="font-family:'Raleway',sans-serif;" role="presentation"
                        cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:130px 10px 27px 43px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <h1
                                style="margin: 0px; color: #ffffff; line-height: 0%; text-align: left; word-wrap: break-word; font-size: 20px; font-weight: 400;">
                                <span><span style="line-height: 0px;"><span style="line-height: 0px;"><span
                                        style="line-height: 0px;"><span style="line-height: 0px;"><span
                                            style="line-height: 0px;"><span style="line-height: 0px;"><span
                                                style="line-height: 0px;"><span style="line-height: 0px;"><span
                                                    style="line-height: 0px;"><span style="line-height: 0px;"><span
                                                        style="line-height: 0px;"><span style="line-height: 0px;"><span
                                                            style="line-height: 0px;"><span
                                                              style="line-height: 0px;"><span
                                                                style="line-height: 0px;"><span
                                                                  style="line-height: 0px;">Xin
                                                                  chào!</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span>
                              </h1>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table id="u_content_heading_3" style="font-family:'Raleway',sans-serif;" role="presentation"
                        cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:51px 10px 50px 43px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <h1
                                style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 24px; font-weight: 400;">
                                <span style="line-height: 33.6px;"><span style="line-height: 33.6px;"><strong>Bạn đã đặt
                                      phòng <br />thành công tại <b style="color: #2e86de;">BlueHouse</b><br />Chi tiết đặt phòng bên
                                      dưới.</strong></span></span>
                              </h1>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table id="u_content_text_1" style="font-family:'Raleway',sans-serif;" role="presentation"
                        cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:10px 43px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <div style="font-size: 14px; line-height: 160%; text-align: left; word-wrap: break-word;">
                                <p style="line-height: 160%;">Xin chào <b><i>${name}!</i></b></p>
                                <p style="line-height: 160%;"> </p>
                                <p style="line-height: 160%;">Cảm ơn bạn đã đặt lịch với BlueHouse Vietnam.</p>
                                <p style="line-height: 160%;">Để xem chi tiết thông tin đặt phòng, vui lòng click vào
                                  button bên dưới.</p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table id="u_content_button_1" style="font-family:'Raleway',sans-serif;" role="presentation"
                        cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 10px 43px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <div align="left">
                                <a href="https://client-hotel.netlify.app/?id=${bookingId}" target="_blank" class="v-button v-size-width"
                                  style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #2e86de; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:60%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                  <span style="display:block;padding:10px 20px;line-height:120%;">Nhấn để xem chi tiết
                                    thông tin đặt phòng</span>
                                </a>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table id="u_content_text_2" style="font-family:'Raleway',sans-serif;" role="presentation"
                        cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:10px 43px 30px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <div style="font-size: 14px; line-height: 160%; text-align: left; word-wrap: break-word;">
                                <p style="line-height: 160%;">Chúng tôi hy vọng rằng bạn sẽ có những trải nghiệm tốt
                                  nhất khi đến với BlueHouse. </p>
                                <p style="line-height: 160%;">Chúc quý khách có một kỳ nghĩ vui vẻ!</p>
                                <p style="line-height: 160%;"> </p>
                                <p style="line-height: 160%;">Trân trọng,</p>
                                <p style="line-height: 160%;"><b>BlueHouse Vietnam</b></p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
    `
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

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
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