"use client";
import { ReactNode, createContext, useState } from "react";

const initialValue = {
  isCollapsedSidebar: false,
  toggleSidebarCollappseHandle: () => {},
};

export const SidebarContext = createContext(initialValue);

interface Props {
  children: ReactNode | ReactNode[];
}

const SidebarProvider = ({ children }: Props) => {
  const [isCollapsedSidebar, setIsCollappseSidebar] = useState<boolean>(false);

  const toggleSidebarCollappseHandle = () => {
    setIsCollappseSidebar((prev) => !prev);
  };

  return (
    <SidebarContext.Provider
      value={{ isCollapsedSidebar, toggleSidebarCollappseHandle }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
