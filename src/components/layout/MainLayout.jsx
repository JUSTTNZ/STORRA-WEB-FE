import React, { useState } from "react";
import LeftSideBar from "../common/LeftSideBar";
import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";

const MainLayout = () => {
  return (
    <div className="w-screen h-screen flex">
      <LeftSideBar />
      <div className="flex flex-col w-full lg:w-[83%]">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
