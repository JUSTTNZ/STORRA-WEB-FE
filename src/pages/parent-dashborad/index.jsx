import React, { useState } from "react";
import {
  notifications,
  quiz,
  recentActivity,
  seeAll,
  students,
  studentStat,
  subjectFocus,
} from "../../data/parent-data/dashboardParent";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const [activetab, setactiveTab] = useState("See All");

  return (
    <div className="w-full h-full bg-[#F4F5F8] text-[#7D7F85] p-4 lg:p-[24px] overflow-y-scroll">
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h1 className="w-full font-bold text-black text-[20px] lg:text-[32px]">
            Overview
          </h1>
          <p className="text-[16px]">
            Here's how your learners are doing today?
          </p>
        </div>

        <div className="flex items-center gap-2">
          {students.map((item, i) => (
            <Link key={i} to="/" className="flex flex-col">
              <div
                className={`w-[42px] h-[40px] rounded-full border-[1px] border-[#E0E1E5] flex items-center justify-center`}
              >
                <img
                  src={`/src/assets/images/parent-dashboard-img/${item?.image}`}
                  alt=""
                  className=""
                />
              </div>
              <span>{item?.userName}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-3">
        {/* leftside */}
        <div className="lg:w-[70%] flex flex-col gap-[40px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-2">
            {studentStat.map((item, i) => (
              <div
                key={i}
                className="bg-white flex flex-col justify-between h-[207px] p-4"
              >
                <div className="flex flex-col items-start">
                  <img
                    src={`/src/assets/images/parent-dashboard-img/${item?.image}`}
                    alt=""
                    className="w-[24px]"
                  />
                  <h1 className="text-[16px] text-black">{item?.title}</h1>
                  <span className="text-[14px]">{item?.desc}</span>
                </div>

                <div>
                  {item?.position === 0 ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-full flex gap-2 items-center">
                        <img
                          src="/src/assets/images/parent-dashboard-img/samuel.png"
                          alt=""
                          className="w-[24px] h-[24px]"
                        />
                        <span className="text-[12px]">Samuel</span>
                        <div className="w-full h-1.5 bg-[#F4F5F8] rounded-lg">
                          <div className="bg-[#2D5BFF] h-full w-[60%] rounded-lg"></div>
                        </div>
                      </div>
                      <div className="w-full flex gap-2 items-center">
                        <img
                          src="/src/assets/images/parent-dashboard-img/jeriel.png"
                          alt=""
                          className="w-[24px] h-[24px]"
                        />
                        <span className="text-[12px]">Jeriel</span>
                        <div className="w-full h-1.5 bg-[#F4F5F8] rounded-lg">
                          <div className="bg-[#2D5BFF] h-full w-[40%] rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {item?.position === 1 ? (
                    <div>
                      <img
                        src="/src/assets/images/parent-dashboard-img/green-piechart.png"
                        alt=""
                      />
                    </div>
                  ) : null}
                  {item?.position === 2 ? (
                    <div>
                      <img
                        src="/src/assets/images/parent-dashboard-img/black-piechart.png"
                        alt=""
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 h-full">
            <h1 className="font-bold text-black text-[20px] mb-4">
              Notifications
            </h1>

            <div className="bg-[#F4F5F8] text-[16px] flex gap-14 p-1 mb-4">
              {notifications.map((item) => (
                <div
                  key={item}
                  className={`${
                    activetab === item
                      ? "cursor-pointer text-[#2D5BFF] bg-white flex items-center px-5 py-2"
                      : "flex items-center px-5 py-2"
                  }`}
                  onClick={() => setactiveTab(item)}
                >
                  {item}
                </div>
              ))}
            </div>

            <div>
              {activetab === "See All" && (
                <div className="flex flex-col gap-6">
                  {seeAll.map((item, i) => (
                    <div key={i} className="flex justify-between items-end">
                      <div className="flex gap-2">
                        <img
                          src={`/src/assets/images/parent-dashboard-img/${item?.icon}`}
                          alt=""
                        />
                        <div className="flex flex-col">
                          <span className="text-[16px] text-black">
                            {item?.title}
                          </span>
                          <span className="text-[14px]">{item?.desc}</span>
                        </div>
                      </div>

                      <span className="text-[14px]">{item?.time}</span>
                    </div>
                  ))}
                </div>
              )}
              {activetab === "Quiz scores" && (
                <div className="flex flex-col gap-6">
                  {quiz.map((item, i) => (
                    <div className="flex justify-between items-end">
                      <div className="flex gap-2">
                        <img
                          src={`/src/assets/images/parent-dashboard-img/${item?.icon}`}
                          alt=""
                        />
                        <div className="flex flex-col">
                          <span className="text-[16px] text-black">
                            {item?.title}
                          </span>
                          <span className="text-[14px]">{item?.desc}</span>
                        </div>
                      </div>

                      <span className="text-[14px]">{item?.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* rightside */}
        <div className="lg:w-[30%] border-[1px] border-[#E0E1E5] flex flex-col gap-5 bg-white rounded-lg p-2">
          <h3 className="text-black font-bold text-[20px]">Subject Focus</h3>

          <div className="flex flex-col gap-2">
            {subjectFocus.map((item, i) => (
              <div key={i} className="w-full flex gap-3 items-center">
                <span className="w-[20%] text-[14px]">{item?.title}</span>
                <div className="w-full h-[38px] bg-[#F4F5F8]">
                  <div
                    className={`${item?.className} h-full text-[12px] text-white flex items-center justify-end pr-2`}
                  >
                    {item?.progress}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full border-[1px] border-[#E0E1E5] my-5"></div>

          <div>
            <h1 className="mb-4">Recent Activity</h1>

            <div className="flex flex-col gap-">
              {recentActivity?.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between py-2 border-b-[1px] border-b-[#E0E1E5]"
                >
                  <div className="flex gap-2">
                    <img
                      src={`/src/assets/images/parent-dashboard-img/${item?.icon}`}
                      alt=""
                    />
                    <div className="flex flex-col">
                      <span className="text-[16px] text-black">
                        {item?.title}
                      </span>
                      <span className="text-[14px]">{item?.desc}</span>
                    </div>
                  </div>

                  <span className="text-[12px]">{item?.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
