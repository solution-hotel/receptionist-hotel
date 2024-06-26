// import type { Metadata } from "next";
// import { Poppins } from "next/font/google";
"use client";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/store";
// const poppins = Poppins({ subsets: ["latin"], weight: "100", style: "italic" });

// export const metadata: Metadata = {
//   title: "Hotel Receptionist",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <div>{children}</div>
        </Provider>
      </body>
    </html>
  );
}
