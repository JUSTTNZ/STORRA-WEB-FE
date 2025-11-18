import React, { useState } from "react";
import {
  contentType,
  multiMediaContent,
  subjectContentData,
  textContent,
} from "../../../data/singlePageData";
import AppButton from "../../../components/form/AppButton";

const SingleProductCont = () => {
  const [activetab, setactiveTab] = useState(contentType[0].title);

  return (
    <div className="w-full text-[#7D7F85] p-4 lg:p-8 overflow-y-scroll">
      <h1 className="w-full font-bold text-black text-[20px] lg:text-2xl mb-8">
        Shapes and Spatial Understanding
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-3">
        <div
          className="lg:w-[80%] flex flex-col gap-2 rounded-lg border-[1px] border-[#ECEDF0] p-2
        "
        >
          <div className="flex items-center justify-between lg:justify-normal lg:max-w-fit gap-10 py-1 px-2 bg-[#F4F5F8] rounded-lg mb-3">
            {contentType?.map((item, i) => (
              <div
                key={i}
                className={`flex gap-1 cursor-pointer ${
                  activetab == item?.title
                    ? "py-1 px-4 bg-white text-black"
                    : ""
                }`}
                onClick={() => setactiveTab(item?.title)}
              >
                <img
                  src={`/src/assets/images/single-course-page-img/${item?.image}`}
                  alt=""
                />
                <span>{item?.title}</span>
              </div>
            ))}
          </div>

          <img
            src="/src/assets/images/single-course-page-img/media-image.svg"
            alt=""
            className="w-full h-full mb-2"
          />

          <div className="flex justify-between">
            <span className=" text-black text-[18px] lg:text-[24px]">
              Identify and Draw Straight Lines - Lesson 1
            </span>
            <img
              src="/src/assets/images/single-course-page-img/download-icon.svg"
              alt=""
            />
          </div>

          <div className="flex items-center justify-between mb-5">
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

          <div className="border-[1px] border-[#F4F5F8] mb-5"></div>

          <div className="">
            {activetab === "Text" && (
              <div className="flex flex-col gap-8">
                {textContent?.map((text, textIndex) => (
                  <div key={textIndex} className="px-6">
                    <h1 className="text-black mb-2 font-bold">{text?.title}</h1>
                    {text?.description?.map((desc, descIndex) => (
                      <li key={descIndex}>{desc}</li>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {activetab === "Audio" && (
              <div className="flex flex-col gap-4">
                {multiMediaContent?.map((media, mediaIndex) => (
                  <div
                    key={mediaIndex}
                    className="w-full lg:w-[80%] flex  items-center gap-3 border-[1px] border-[#ECEDF0] p-3"
                  >
                    <img
                      src={`/src/assets/images/single-course-page-img/${media?.image}`}
                      alt=""
                      className="w-[32px] lg:w-15"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-[16px] lg:text-[20px]">{media?.title}</h1>
                      <span className="text-[14px]">{media?.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activetab === "Video" && (
              <div className="flex flex-col gap-4">
                {multiMediaContent?.map((media, mediaIndex) => (
                  <div
                    key={mediaIndex}
                    className="w-full lg:w-[80%] flex  items-center gap-3 border-[1px] border-[#ECEDF0] p-3"
                  >
                    <img
                      src={`/src/assets/images/single-course-page-img/${media?.image}`}
                      alt=""
                      className="w-[32px] lg:w-15"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-[16px] lg:text-[20px]">{media?.title}</h1>
                      <span className="text-[14px]">{media?.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-[1px] border-[#F4F5F8] my-3"></div>
          <div className="flex justify-between">
            <button className="border-[1px] border-[#7D7F85] rounded-full  px-8 py-2">
              Cancel
            </button>
            <AppButton title="Next Lesson" className={`text-white px-8 py-2`} icon iconSrc="/src/assets/images/single-course-page-img/Arrow-Icons.png" />
          </div>
        </div>

        {/* rightside */}
        <div className="hidden lg:w-[30%] lg:flex flex-col gap-5 bg-[#F4F5F8] rounded-lg p-2 lg:mr-5">
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

export default SingleProductCont;
