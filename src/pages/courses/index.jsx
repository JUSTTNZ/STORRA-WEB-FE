import React, { useState } from "react";
import { courseCardData, courseCompletedData } from "../../data/course";
import CourseCard from "../../components/course/CourseCard";

const CoursePage = () => {
  // State to track which type is active
  const [type, setType] = useState("ongoing");

  return (
    <div className="w-full p-5 text-[#7D7F85] overflow-x-hidden">
      <h1 className="text-black mb-2 font-bold text-[32px]">Courses</h1>

      {/* Filter toggle */}
      <div className="flex items-center gap-4 p-1 rounded-md bg-[#F4F5F8] max-w-fit mb-8 cursor-pointer">
        <div
          onClick={() => setType("ongoing")}
          className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
            type === "ongoing"
              ? "text-[#2D5BFF] bg-white shadow-sm"
              : "text-[#7D7F85]"
          }`}
        >
          Ongoing (5)
        </div>

        <div
          onClick={() => setType("completed")}
          className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
            type === "completed"
              ? "text-[#2D5BFF] bg-white shadow-sm"
              : "text-[#7D7F85]"
          }`}
        >
          Completed (4)
        </div>
      </div>

      {/* Card Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {type === "ongoing"
          ? courseCardData.map((item, index) => (
              <CourseCard key={index} item={item} index={index} />
            ))
          : courseCompletedData.map((item, index) => (
              <CourseCard key={index} item={item} index={index} btn />
            ))}``
      </div>
    </div>
  );
};

export default CoursePage;
