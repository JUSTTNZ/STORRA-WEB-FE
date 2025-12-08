import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { FaBars as Menu, FaTimes as Close } from "react-icons/fa";
import {
  FaHome,
  FaFolderOpen,
  FaCog,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";

export default function SettingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <>
      <div className="border-b-2 w-full p-4 h-[10vh] border-gray-100 text-gray-700 flex items-center gap-2">
        <FiSettings className="inline-block mr-2 text-[22px]" />
        <h1 className="font-medium text-[22px]">Settings</h1>
        <Menu
          onClick={() => setIsOpen(true)}
          className="lg:hidden ml-auto text-[22px] cursor-pointer text-gray-600 hover:bg-gray-100 rounded-lg transition-colors "
        />
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <nav
        className={`lg:hidden fixed top-0 left-0 w-[70%] sm:w-[50%] h-screen bg-white z-50 flex flex-col p-4 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <Close
            onClick={() => setIsOpen(false)}
            className="text-[22px] cursor-pointer  text-gray-600 hover:bg-gray-100 rounded-lg  transition-colors"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-2">
          <a
            href="#"
            onClick={() => setActiveTab("Profile")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "Profile"
                ? "text-blue-600 bg-blue-50 font-semibold"
                : "text-gray-700 hover:bg-gray-10"
            }`}
          >
            <FaHome size={20} />
            <span>Profile</span>
          </a>
          <a
            href="#"
            onClick={() => setActiveTab("Notification")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "Notification"
                ? "text-blue-600 bg-blue-50 font-semibold"
                : "text-gray-700 hover:bg-gray-10"
            }`}
          >
            <FaFolderOpen size={20} />
            <span>Notification</span>
          </a>
          <a
            href="#"
            onClick={() => setActiveTab("Security")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "Security"
                ? "text-blue-600 bg-blue-50 font-semibold"
                : "text-gray-700 hover:bg-gray-10"
            }`}
          >
            <FaCog size={20} />
            <span>Security</span>
          </a>
          <a
            href="#"
            onClick={() => setActiveTab("App Config")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "App Config"
                ? "text-blue-600 bg-blue-50 font-semibold"
                : "text-gray-700 hover:bg-gray-10"
            }`}
          >
            <FaBell size={20} />
            <span>App Config</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-auto"
          >
            <FaSignOutAlt size={20} />
            <span>Logout</span>
          </a>
        </div>
      </nav>
    </>
  );
}

{
  /*import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { FaBars as Menu, FaTimes as Close } from "react-icons/fa";

export default function SettingNavbar() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;
  return (
    <div className="border-b-2 w-full p-4 h-[10vh] border-grey-100 text-gray-700 flex  items-center gap-2">
      <FiSettings className="inline-block mr-2 text-[22px] " />
      <h1 className="font-medium text-[22px] ">Settings</h1>

      {isOpen ? (
        <Menu
          // onClick={() => setIsOpen(false)}
          className="lg:hidden ml-auto  text-[22px] cursor-pointer text-gray-600 hover:bg-gray-100 rounded-lg transition-colors "
        />
      ) : (
        <close onClick={() => setIsOpen(false)} className="text-[22px]" />
      )}

      {/* Navbar
      {isOpen && (
        <nav className="lg:hidden fixed top-0 left-0 w-[50%] h-screen bg-white z-50 flex flex-col  p-4  animate-[slideIn_0.3s_ease-out] ">
          <div className="flex items-center justify-between mb-8"> hellow</div>{" "}
        </nav>
      )}
    </div>
  );
}
#*/
}
