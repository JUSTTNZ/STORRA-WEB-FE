import React from "react";
import SettingNavbar from "./SettingNavbar";
import SettingSideBar from "./SettingSideBar";
import SettingMain from "./SettingMain";

function Setting() {
  return (
    <div className="fixed inset-0  w-full h-screen flex   bg-[#A7A3A3]/1   backdrop-blur-xl ">
      <SettingSideBar />

      <main className="lg:w-[80%] h-screen w-full flex flex-col">
        <SettingNavbar />
        <SettingMain />
      </main>
    </div>
  );
}

export default Setting;
