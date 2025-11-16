"use client";

import { useSideBarStore } from "@/store/Sidebar/SideBar.store";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";
import SideBarLink from "./SideBarLink/SideBarLink";

export const Sidebar = () => {
  const isSidebarCollapsed = useSideBarStore(
    (state) => state.isSidebarCollapsed
  );
  const setIsSidebarCollapsed = useSideBarStore(
    (state) => state.setIsSidebarCollapsed
  );

  const linksSidebar = [
    {
      href: "/dashboard",
      icon: Layout,
      label: "Dashboard",
    },
    { href: "/inventory", icon: Archive, label: "Inventory" },
    {
      href: "/products",
      icon: Clipboard,
      label: "Products",
    },
    {
      href: "/users",
      icon: User,
      label: "Users",
    },
    {
      href: "/settings",
      icon: SlidersHorizontal,
      label: "Settings",
    },
    {
      href: "/expenses",
      icon: CircleDollarSign,
      label: "Expenses",
    },
  ];

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <span>image</span>
        {/* image */}
        <h1
          className={`${
            isSidebarCollapsed ? "hidden" : "block"
          } font-extrabold text-2xl`}
        >
          OSSTOCK
        </h1>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={setIsSidebarCollapsed}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className="grow mt-8">
        {linksSidebar.map((link) => (
          <SideBarLink
            href={link.href}
            icon={link.icon}
            key={link.href}
            label={link.label}
            isCollapsed={isSidebarCollapsed}
          />
        ))}
      </div>

      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 OsloStock
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
