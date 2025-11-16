"use client";

import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useSideBarStore } from "@/store/Sidebar/SideBar.store";

export const DashboardWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isSidebarCollapsed = useSideBarStore(
    (state) => state.isSidebarCollapsed
  );
  const isDarkMode = useSideBarStore((state) => state.isDarkMode);
  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};
