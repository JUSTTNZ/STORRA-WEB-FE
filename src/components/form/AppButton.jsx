import React from "react";

const AppButton = ({title, icon=false}) => {
  return (
    <button className="flex items-center gap-2 bg-[#2D5BFF] max-w-fit rounded-full text-[12px] text-white px-8 py-2">
      <span>{title}</span>
      {icon && (<img src="/src/assets/images/single-course-page-img/Arrow-Icons.png" alt="" />)}
    </button>
  );
};

export default AppButton;
