import React from "react";
import AppButton from "../../../components/form/AppButton";
import { progessRowData, progressTableColumn, quizScore } from "../../../data/parent-data/progress";
import { recentData } from "../../../data/parent-data/wallet";
import AppSelectField from "../../../components/form/AppSelectField";
import ProgressRowTemplate from "../../../components/parent-progress/ProgressRowTemplate";
import Table from "../../../components/wallet/Table";

const ProgressPage = () => {
  return (
    <div className="overflow-x-hidden bg-[#F4F5F8] flex flex-col gap-6 w-full h-full p-4 text-[#7D7F85]">
      <h1 className="font-bold text-[32px] text-black mb-4">Progress</h1>

      <div className="flex gap-[24px] w-full">
        <div className="w-[60%] flex flex-col gap-[24px] p-[20px] shadow-2xl bg-white">
          <div className="flex justify-between ">
            <h3 className="font-bold text-black text-[20px]">Learning hours</h3>
            <div className="flex gap-4">
              <AppButton
                title="Weekly"
                className="text-white px-4 py-2 rounded-lg"
              />
              <AppButton
                title="Weekly"
                className="bg-transparent border-[1px] border-[#E0E1E5] px-4 py-2 rounded-lg"
              />
            </div>
          </div>

          <img
            src="/src/assets/images/parent-dashboard-img/Line-chart.png"
            alt=""
          />
        </div>

        <div className="w-[40%] flex flex-col gap-10 p-6 shadow-2xl bg-white">
          <h3 className="font-bold text-[20px]">Course Completion</h3>
          <img
            src="/src/assets/images/parent-dashboard-img/Bar.png"
            alt=""
            className="w-[300px] mx-auto"
          />
        </div>
      </div>

      <div className="flex gap-[24px] w-full">
        <div className="w-[65%] flex flex-col gap-[24px] p-[20px] shadow-2xl bg-white">
          <h3 className="font-bold text-black text-[20px]">Quiz Scores</h3>

          <div className="flex items-center gap-5">
            {quizScore?.map((item, i) => (
              <div key={i} className="flex items-center flex-col gap-2">
                <span>{item?.title}</span>
                <span className="text-black">{item?.score}</span>
              </div>
            ))}
          </div>

          <img
            src="/src/assets/images/parent-dashboard-img/bar-chart.png"
            alt=""
          />
        </div>

        <div className="w-[35%] flex flex-col gap-10 p-6 shadow-2xl bg-white">
          <h3 className="font-bold text-[20px] text-black">
            Leaderboard Performance
          </h3>
          <img
            src="/src/assets/images/parent-dashboard-img/histogram.png"
            alt=""
            className="w-[300px] mx-auto"
          />
        </div>
      </div>

      <div className="flex gap-[24px] w-full">
        <div className="w-[65%] flex flex-col gap-[24px] p-[20px] shadow-2xl bg-white">
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-bold text-black text-[20px]">
                Certificate history
              </h1>

              <div className="flex gap-3 ">
                <AppSelectField title="Recent" array={recentData} />
                <AppButton
                  title="Export CSV"
                  icon
                  iconSrc="/src/assets/images/parent-dashboard-img/export.png"
                  className="text-[14px] text-white px-4 rounded-lg"
                />
              </div>
            </div>

            <Table
              tableColumn={progressTableColumn}
              rowData={progessRowData}
              rowTemplate={ProgressRowTemplate}
            />
        </div>

        <div className="w-[35%] flex flex-col gap-10 p-6 shadow-2xl bg-white">
          <h3 className="font-bold text-[20px] text-black">
            Reward Earned
          </h3>
          <img
            src="/src/assets/images/parent-dashboard-img/reward-piechart.png"
            alt=""
            className="w-[300px] mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
