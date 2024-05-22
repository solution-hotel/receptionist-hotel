"use client";

import Link from "next/link";
import React, { useState, useContext } from "react";
import { MdPersonPin, MdPersonOutline, MdArrowBackIos } from "react-icons/md";
import Image from "next/image";
import { SidebarContext } from "./SidebarContext";

const sidebarItems = [
  {
    name: "Lễ Tân",
    href: "/dashboard/receptionist",
    icon: MdPersonPin,
  },
  {
    name: "Buồng Phòng",
    href: "/dashboard/housekeeping",
    icon: MdPersonOutline,
  },
];

const Sidebar = () => {
  const { isCollapsedSidebar, toggleSidebarCollappseHandle } =
    useContext(SidebarContext);
  const [selectedItem, setSelectedItem] = useState("Lễ Tân");

  const handleItemClick = (name: string) => {
    setSelectedItem(name);
  };

  return (
    <div className="sidebar__wrapper">
      <button className="btn" onClick={toggleSidebarCollappseHandle}>
        <MdArrowBackIos />
      </button>
      <aside className="sidebar" data-collapse={isCollapsedSidebar}>
        <div className="sidebar__top">
          <Image
            width={80}
            height={80}
            src="/next.svg"
            className="sidebar__logo"
            alt={""}
          />
        </div>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href, icon: Icon }) => (
            <li
              className="sidebar__item"
              key={name}
              onClick={() => handleItemClick(name)}
            >
              <Link
                href={href}
                className={`sidebar__link ${
                  selectedItem === name ? "selected" : ""
                }`}
              >
                <span
                  className={`sidebar__icon ${
                    selectedItem === name ? "selected" : ""
                  }`}
                >
                  <Icon></Icon>
                </span>
                <span className="sidebar__name">{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
