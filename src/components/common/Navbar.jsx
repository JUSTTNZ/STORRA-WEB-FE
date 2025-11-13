import React from "react";
import SearchField from "../form/SearchField";

const Navbar = () => {
  return (
    <div className="hidden w-full lg:flex gap-10 py-2 border-b-[1px] border-[#D1D2D5] justify-end pr-10">
      <SearchField placeholder="Search anything..." />

      {/* notification side section */}
      <div className="flex gap-4">
        <div className="flex items-center justify-center h-[50px] w-[50px] rounded-full bg-[#F4F5F8]">
          <img
            src="/src/assets/images/courses-img/notification.png"
            alt=""
            className="w-[24px]"
          />
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <img
              src="/src/assets/images/courses-img/student.png"
              alt=""
              className="w-[40px]"
            />
          </div>

          <div className="flex gap-2 items-start">
            <div className="flex flex-col">
              <span className="text-16px">Jemimah Bature</span> <span className="text-14px">Student</span>
            </div>
            <img src="/src/assets/icons/arrow-down.svg" alt="" className="w-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
