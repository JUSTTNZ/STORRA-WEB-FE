import React, { useState } from "react";
import { subjectContentData } from "../../../data/student-data/singlePageData";

const SingleProductPage = () => {
  const [activetab, setactiveTab] = useState("about");

  return (
    <div className="w-full text-[#7D7F85] p-4 lg:p-8 overflow-y-scroll">
      <h1 className="w-full font-bold text-black text-[20px] lg:text-2xl mb-8">
        Shapes and Spatial Understanding
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-3">
        <div className="lg:w-[80%] flex flex-col gap-2">
          <img
            src="/src/assets/images/single-course-page-img/shapes.svg"
            alt=""
            className="w-full h-full mb-2"
          />

          <div className="flex items-center justify-between mb-10">
            <div className="flex">
              <div className="flex items-center gap-2 border-r-[1px] border-r-[#D1D2D5] pr-3">
                <img
                  src="/src/assets/images/single-course-page-img/reviews.svg"
                  alt=""
                  className="w-14 lg:w-18"
                />
                <span className="text-[14px]">3.1</span>
              </div>
              <div className="flex items-center gap-2 pl-3">
                <img
                  src="/src/assets/images/single-course-page-img/mdi_users-group.svg"
                  alt=""
                />
                <span className="text-[14px]">124</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="/src/assets/images/single-course-page-img/solar_calendar-linear.svg"
                alt=""
                className="w-4 lg:w-6"
              />
              <span className="text-[10px] lg:text-[14px]">
                Last updated July, 2025
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span
              onClick={() => setactiveTab("about")}
              className={`${
                activetab == "about" ? "text-[#2D5BFF]" : null
              } cursor-pointer`}
            >
              About
            </span>
            <span
              onClick={() => setactiveTab("faq")}
              className={`${
                activetab == "faq" ? "text-[#2D5BFF]" : null
              } cursor-pointer`}
            >
              FAQ
            </span>
            <span
              onClick={() => setactiveTab("reviews")}
              className={`${
                activetab == "reviews" ? "text-[#2D5BFF]" : null
              } cursor-pointer`}
            >
              Reviews
            </span>
          </div>

          <div>
            {activetab == "about" ? (
              <p>
                Shapes and spatial understanding are fundamental concept that
                helps us understand the world around us. Shapes are the basic
                building blocks of objects and spatial understaning involves how
                those objects are positioned, arranged and related to each other
                in space.
              </p>
            ) : activetab == "faq" ? (
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                totam labore ullam architecto quibusdam quaerat, suscipit autem
                repellat, esse delectus minus. Sed sit sequi natus fugit dolorem
                necessitatibus vero qui.
              </p>
            ) : activetab == "reviews" ? (
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Distinctio unde nesciunt neque!
              </p>
            ) : null}
          </div>
        </div>

        {/* rightside */}
        <div className="lg:w-[30%] flex flex-col gap-5 bg-[#F4F5F8] rounded-lg p-2 lg:mr-5">
          <h3 className="text-black font-bold text-[20px]">Subject content</h3>
          <div className="flex flex-col h-full gap-7 bg-white rounded-lg p-3">
            {subjectContentData?.map((item, index) => (
              <div key={index} className="flex gap-4">
                <input type="radio" className="w-5" />
                <div>
                  <h3 className="text-black text-[14px]">{item?.title}</h3>
                  <span className="text-[14px]">{item?.lesson}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
