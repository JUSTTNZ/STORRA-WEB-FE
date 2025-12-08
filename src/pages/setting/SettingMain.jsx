import React, { useState } from "react";
import settingAvatar from "../../assets/images/setting/student.png";

function SettingMain() {
  const [location, setLocation] = useState(
    "UTC+0:00 Western European Time (Portugal)"
  );
  return (
    <section className="w-full h-screen pb-8 overflow-y-auto ">
      <div className="flex flex-col items-center w-[80%]   mx-auto py-4 gap-4 lg:gap-5 h-screen">
        {/* HEADER */}
        <header className="self-start text-gray-600">
          {" "}
          <h1 className="font-bold text-[20px]">Project Management</h1>{" "}
          <p className="font-medium text-[14px]">
            Manage your personal information and account details
          </p>{" "}
        </header>

        {/* FLEX BODY */}
        <div className="flex w-full h-fit lg:h-[90vh] border-2 border-gray-200 gap-4 rounded-[10px] flex-wrap p-4">
          {/* FLEX 1 */}
          <div className="flex-1  lg:border-r-2 border-gray-300 space-y-2 p-2 text-gray-600">
            {/* 1st section */}

            <div className="border-b-2 border-gray-300 pb-4 mb-2">
              <h1 className="font-semibold">Profile Information</h1>
              <small className="font-mono text-[12px] text-gray-400">
                Full Name
              </small>
              <div className="flex  items-center justify-between">
                <span className="font-medium text-[15px]">Alex Johnson</span>
                <button className="border-2 border-gray-300 rounded-[7px] px-1">
                  Edit
                </button>
              </div>
            </div>
            {/* 2nd section */}
            <div className="border-b-2 border-gray-300 pb-4 mb-2 flex flex-col gap-2 ">
              <small className="font-mono text-[12px] text-gray-400">
                Email Address
              </small>
              <div className="flex  items-center justify-between">
                <span className="font-medium text-[15px]">
                  Alexjohnson@gmail.com
                </span>
                <button className="border-2 border-gray-300 rounded-[7px] px-1">
                  Edit
                </button>
              </div>
            </div>

            {/* 3rd section */}

            <div className="border-b-2 border-gray-300 pb-4 mb-2">
              <small className="font-mono text-[12px] text-gray-400">
                Phone Number
              </small>
              <div className="flex  items-center justify-between">
                <span className="font-medium text-[15px]">+1 555-0123</span>
                <button className="border-2 border-gray-300 rounded-[7px] px-1">
                  Edit
                </button>
              </div>
            </div>

            {/* 4th section */}
            <div className=" pb-4 mb-2">
              <small className="font-mono text-[12px] text-gray-400">
                Edit Password <br />{" "}
                <span className="font-medium text-[15px]">************</span>
              </small>
              <div className="flex flex-col items-start justify-between">
                <span className="font-medium text-[15px]">change actions</span>
                <button className="border-2 border-gray-300 rounded-[7px] px-1">
                  Change
                </button>
              </div>
            </div>
          </div>

          {/* fLEX 2 */}
          <div className="flex-1">
            <div className="p-2 text-gray-600 space-y-2">
              <h1 className="font-semibold">Profile Picture</h1>
              <div className="flex items-center justify-between border-2 border-gray-300 p-4 rounded-[10px]">
                <img
                  src={settingAvatar}
                  alt="Profile"
                  className="w-[100px] h-[100px] border-3 border-gray-400 rounded-full mb-2"
                />

                <button className="border-2 border-gray-300 rounded-[7px] px-1 ">
                  Upload New Picture
                </button>
              </div>
            </div>
            <div className="mt-2 text-gray-600">
              <h1 className="font-semibold">Time Zone</h1>
              <div className="flex flex-col gap-2 mt-5  ">
                <label className="font-mono font-medium text-[15px] text-gray-800">
                  Time Zone
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border  border-gray-300 rounded-lg px-3 sm:px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm sm:text-base flex-1 sm:flex-initial"
                >
                  <option>UTC-5:00 Eastern Time (US & Canada ) </option>
                  <option>UTC+1:00 West Africa Time (Nigeria)</option>
                  <option>UTC-3:00 Argentina Time (Argentina)</option>
                  <option>UTC+0:00 Western European Time (Portugal)</option>
                </select>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <footer className="self-start border-t-2  border-gray-300 pt-4 w-[95%] mx-auto flex flex-col">
            <h5 className="mb-2 font-medium text-[18px]">Account Actions</h5>
            <div className="flex gap-4 items-center ">
              <button className="bg-blue-200 text-gray-500 px-4 py-2 rounded-md">
                Save Changes
              </button>
              <span>Delete Account</span>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}

export default SettingMain;
