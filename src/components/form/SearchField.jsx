import React from "react";

const SearchField = ({ placeholder }) => {
  return (
    <div className="flex items-center gap-1 bg-[#F4F5F8] rounded-full w-[330px] h-[48px] px-4">
      <img
        src="/src/assets/images/courses-img/search.png"
        alt=""
        className="w-[24px] h-[24px]"
      />
      <input
        type="text"
        name="search"
        id="search"
        placeholder={placeholder}
        className="placeholder-[#5A5F6B] outline-0 w-full p-2 rounded-full"
      />
    </div>
  );
};

export default SearchField;
