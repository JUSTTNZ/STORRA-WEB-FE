import React from "react";
import AppButton from "../form/AppButton";

const CourseCard = ({ item, index, btn = false }) => {
  return (
    <div
      key={index}
      className="w-full p-2 flex flex-col gap-1 border-[1px] border-[#D1D2D5] rounded-md"
    >
      <div className="w-full rounded-md h-[160px]">
        <img
          src={`/src/assets/images/courses-img/${item?.image}`}
          alt=""
          className="w-full h-full rounded-md object-cover"
        />
      </div>
      <span className="mt-2 font-bold text-black">{item?.title}</span>
      <span className="mb-3">{item?.description}</span>
      <div className="flex justify-between items-center">
        <span>{item?.lesson}</span>
        <span>{item?.progress}</span>
      </div>

      {btn ? (
        (<AppButton title="Start Quiz" className={`text-white px-8 py-2`}/>)
      ) : (
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
          <div
            className="bg-blue-500 h-1.5 rounded-full"
            style={{ width: item?.progress }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
