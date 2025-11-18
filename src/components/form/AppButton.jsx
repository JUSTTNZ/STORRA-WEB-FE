import React from "react";

const AppButton = ({
  title,
  icon = false,
  iconSrc = "",
  iconClass = "",
  rounded = "rounded-full", 
  className = "",
}) => {
  return (
    <button
      className={`flex items-center gap-2 bg-[#2D5BFF] max-w-fit ${rounded} ${className}`}
    >
      <span>{title}</span>

      {icon && (
        <img
          src={iconSrc}
          alt=""
          className={`object-contain ${iconClass}`}
        />
      )}
    </button>
  );
};

export default AppButton;
