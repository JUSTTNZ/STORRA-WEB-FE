import React, { useState } from "react";
import logo from "../../assets/images/setting/logo.png";
import vector from "../../assets/images/setting/Vector.png";
import { Link } from "react-router-dom";
import { settingSidebarData } from "../../data/settingSidebarData";

function SettingSideBar() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <aside className="w-[20%] border-2  border-gray-400  flex-col gap-4 hidden lg:flex  bg-white h-screen pt-4">
      <div className="flex flex-row justify-between items-center px-3">
        <Link to="/">
          <img src={logo} alt="setting image logo" />
        </Link>
        <img src={vector} alt="setting image logo" />
      </div>
      <nav className="flex flex-col gap-3 px-4 text-gray-700">
        {settingSidebarData.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              className={`font-medium text-[18px] p-2 rounded-[10px] flex items-center gap-2  ${
                activeTab === index ? "bg-blue-200 text-blue-500" : "w-full"
              }`}
              onClick={() => setActiveTab(index)}
            >
              <Icon className="inline-block mr-2 text-[20px]" />
              <h1>{item.name}</h1>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default SettingSideBar;
