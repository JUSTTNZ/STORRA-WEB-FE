import React, { useEffect, useState } from "react";
import progressBar from "../../assets/images/home-img/progressBar.png";
import completedBar from "../../assets/images/home-img/completedBar.png";
import libraryBar from "../../assets/images/home-img/libraryBar.png";
import leftArrow from "../../assets/images/home-img/leftArrow.png";

function ProgressSection() {
  // 💙 state to control animated progress
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = 45; // target progress percent
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < target) return prev + 1;
        clearInterval(interval);
        return target;
      });
    }, 25); // speed of animation (lower = faster)
  }, []);

  return (
    <section className=" p-6 w-full mt-4">
      {/* Title */}

      <h2 className=" font-bold text-gray-800 mb-6 text-[20px] md:text-[24px]">
        Your Progress
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1️⃣ In Progress */}
        <div className="md:col-span-2 col-span-2 lg:col-span-1 border-gray-200 bg-gray-50 rounded-xl border py-5 px-2  flex flex-col gap-4 ">
          <div className="flex justify-between flex-row items-end  ">
            <div className="leading-3  border-red-400">
              <img className="" src={progressBar} alt="progressbar" />
              <h3 className="text-[#131313] font-semibold text-lg mt-2  item-[16px]">
                In Progress
              </h3>
              <p className="text-gray-500 text-sm">
                Nigeria People and Culture
              </p>
            </div>

            <button className="rounded-[100px] w-[122px] flex justify-center items-center font-[400] bg-blue-400 h-[22px] text-[12px] whitespace-nowrap  ">
              Resume Lesson
            </button>
          </div>

          <span className="text-[10px] flex  justify-end ">{progress}%</span>
          {/* Animated Progress Bar */}
          <div className="w-full bg-gray-200  rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        {/* responsive grid */}

        {/* 2️⃣ Completed */}
        <div className="bg-gray-50 rounded-xl py-5 px-2 border border-gray-200 col-span-1 md:col-span-1   flex flex-col justify-between">
          <div>
            <img src={completedBar} alt="completedBar" />
            <h3 className="text-[#131313] font-semibold text-lg   mt-2 item-[16px]">
              Completed
            </h3>
            <p className="text-gray-500 text-sm">
              You’ve completed <span className="font-medium">2 courses</span>
            </p>
          </div>
          <button className="relative flex justify-between items-center pl-[5px] rounded-[100px] w-[102px] font-[400] bg-[#b5ffae] text-[#148d00] h-[22px] text-[12px] whitespace-nowrap  ">
            Next course
            <img
              className="absolute top-[3px] right-2  "
              src={leftArrow}
              alt="guidance_left-arrow"
            />
          </button>
        </div>

        {/* 3️⃣ My Library */}
        <div className="bg-gray-50 rounded-xl py-5 px-2 border border-gray-200 flex flex-col justify-between">
          <div>
            <img src={libraryBar} alt="libraryBar" />
            <h3 className="text-[#131313] font-semibold text-lg   mt-2 item-[16px]">
              My Library
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              Saved and favorite content
            </p>
          </div>
          <div className="flex gap-2 ">
            <button className="rounded-[100px] w-[102px] flex justify-center items-center  text-[#d93d3d] bg-[#ffd8d8] h-[22px] text-[12px] whitespace-nowrap  ">
              Saved Content
            </button>
            <button className="rounded-[100px] w-[102px]  flex justify-center items-center  text-[#d93d3d] bg-[#ffd8d8] h-[22px] text-[12px] whitespace-nowrap  ">
              Favorite Content
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProgressSection;
