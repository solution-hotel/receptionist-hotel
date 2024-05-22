
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import SidebarProvider from "../components/SidebarContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const poppins = Poppins({ subsets: ["latin"], weight: "100", style: "italic" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex">
            <div>
              <Sidebar />
            </div>
            <div className="w-full">
              <div>
                <Navbar />
              </div>
              <div>{children}</div>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
