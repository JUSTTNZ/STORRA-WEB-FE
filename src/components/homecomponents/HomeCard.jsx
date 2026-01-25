import React from "react";
import { AiOutlineHeart, AiOutlineBook } from "react-icons/ai";

const HomeCard = ({ item, index }) => {
  return (
    <div
      key={index}
      className="card-shimmer w-full p-2 flex flex-col gap-1 border border-[var(--secondary-200)] dark:border-[var(--border-color)] rounded-md bg-white dark:bg-[var(--card-background)] transition-colors duration-200"
    >
      <div className="w-full rounded-md h-[160px] overflow-hidden bg-[var(--secondary-100)] dark:bg-[var(--secondary-700)]">
        <img
          src={item?.image}
          alt={item?.title || "Course image"}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="mt-1 font-bold text-[var(--secondary-900)] dark:text-[var(--text)] text-base line-clamp-1">
        {item?.title}
      </span>
      <span className="text-sm text-[var(--secondary-500)] dark:text-[var(--text-muted)] line-clamp-2 min-h-[40px]">
        {item?.description}
      </span>
      <div className="flex justify-between items-center text-sm text-[var(--secondary-400)] dark:text-[var(--caption-color)] mt-auto pt-2">
        <span>{item?.lesson}</span>
      </div>
      <div className="flex justify-between items-center mt-2">
        <button className="bg-[var(--primary-400)] dark:bg-[var(--primary)] w-fit rounded-full text-xs text-white px-6 py-2 hover:bg-[var(--primary-500)] dark:hover:bg-[var(--primary-hover)] transition-colors duration-200 font-medium">
          Continue
        </button>

        {/* Love Icons */}
        <div className="flex items-center gap-2">
          <AiOutlineHeart className="w-5 h-5 text-[var(--secondary-300)] dark:text-[var(--secondary-400)] hover:text-red-500 cursor-pointer transition-colors duration-200" />
          <AiOutlineBook className="w-5 h-5 text-[var(--secondary-300)] dark:text-[var(--secondary-400)] hover:text-[var(--primary-400)] dark:hover:text-[var(--primary)] cursor-pointer transition-colors duration-200" />
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
