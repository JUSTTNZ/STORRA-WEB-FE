import React from "react";
import { AiOutlineHeart, AiOutlineBook } from "react-icons/ai";
const HomeCard = ({ item, index }) => {
  return (
    <div
      key={index}
      className="w-full p-2 flex flex-col gap-1 border-[1px] border-[#D1D2D5] rounded-md"
    >
      <div className="w-full rounded-md h-[160px] overflow-hidden">
        <img
          src={`/src/assets/images/courses-img/${item?.image}`}
          alt=""
          className="w-full h-full  object-cover"
        />
      </div>
      <span className="mt-1 font-bold text-black text-base line-clamp-1">
        {item?.title}
      </span>
      <span className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
        {item?.description}
      </span>
      <div className="flex justify-between items-center text-sm text-gray-500 mt-auto pt-2">
        <span>{item?.lesson}</span>
      </div>
      <div className="flex justify-between items-center mt-2">
        <button className="bg-[#2D5BFF] w-fit rounded-full text-xs text-white px-6 py-2 hover:bg-[#2347DD] transition-colors duration-200 font-medium">
          Continue
        </button>

        {/* Love Icons */}
        <div className="flex items-center gap-2">
          <AiOutlineHeart className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-200" />
          <AiOutlineBook className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-200" />
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
