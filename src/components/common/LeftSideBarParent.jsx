import { Link } from "react-router-dom";
import { leftSideBarParentData } from "../../data/parent-data/leftSideBarParent";
import { useState } from "react";

const LeftSideBarParent = () => {
  const [activetab, setactivetab] = useState("Dashboard");

  return (
    <div className="hidden w-[17%] bg-[#F4F5F8] lg:flex flex-col border-r-[1px] border-[#D1D2D5] gap-5 p-3">
      <div className="w-full flex justify-between items-center">
        <img
          src="/src/assets/images/courses-img/logo.png"
          alt=""
          className="w-[80px] h-[80px]"
        />
        <img
          src="/src/assets/images/courses-img/Vector.png"
          alt=""
          className="w-[24px] h-[24px]"
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        {leftSideBarParentData.map((item, index) => (
          <Link
            to={item?.url}
            key={index}
            className={`flex gap-4 text-[#5A5F6B] ${
              activetab === item?.title ? "bg-[#2D5BFF] text-white" : ""
            } hover:bg-[#2D5BFF] hover:text-white p-3 rounded-md`}
            onClick={() => setactivetab(item?.title)}
          >
            <img
              src={`/src/assets/images/courses-img/${item?.image}`}
              alt=""
              className="text-[#5A5F6B] w-[24px] h-[24px] hover:text-white"
            />
            <span className="text-[16px]">{item?.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeftSideBarParent;
