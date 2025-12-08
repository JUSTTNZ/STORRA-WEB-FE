import { FaArrowLeftLong } from "react-icons/fa6";

const interestOptions1 = [
  { id: 1, label: "Listening", src: "/src/assets/images/auth/listening.png" },
  { id: 2, label: "Watching videos", src: "/src/assets/images/auth/video.png" },
  { id: 3, label: "Playing game", src: "/src/assets/images/auth/Group.png" },
  {
    id: 4,
    label: "Drawing or writing",
    src: "/src/assets/images/auth/writeIcon.png",
  },
  {
    id: 5,
    label: "Solving puzzles",
    src: "/src/assets/images/auth/puzzle.png",
  },
];

const interestOptions2 = [
  { id: 1, label: "XP & badges", src: "/src/assets/images/auth/xp badge.png" },
  {
    id: 2,
    label: "Real rewards &  gifts",
    src: "/src/assets/images/auth/reward.png",
  },
  {
    id: 3,
    label: "Knowledge & skills",
    src: "/src/assets/images/auth/knowledge & skills.png",
  },
  { id: 4, label: "Fun & games", src: "/src/assets/images/auth/Group.png" },
];

import ProgressBar from "../../../components/auth/signup/ProgressBar";
import Interest from "../../../components/auth/signup/Interest";
import CCButton from "../../../components/auth/signup/CCButton";
import { useNavigate } from "react-router";

function Personalization1() {
  const navigate = useNavigate();
  return (
    <div className="xl:pl-[14%] bg-[#F4F5F8] h-screen overflow-hidden pt-[70px] xl:pt-[150px] flex items-center justify-center ">
      <div className="w-full ">
        <div className="flex items-center gap-4 pl-6 mb-7 ">
          <FaArrowLeftLong onClick={() => navigate(-1)} />
          <h1 className="font-bold text-[22px] leading-[150%]">
            Learning Style & Interest
          </h1>
        </div>
        <div className=" w-[96%] mx-auto xl:w-[500px] xl:ml-38 ">
          <ProgressBar value={2} max={3} />
          <div className="h-[600px] px-8 rounded-[1px] ">
            <div className="">
              <h3 className="font-bold text-[20px] leading-[150%] pt-2 pb-2.5">
                How do you like to learn best?
              </h3>
              <Interest interestOptions={interestOptions1} />
            </div>
            <div className="">
              <h3 className="font-bold text-[19px] leading-[150%] pt-4 pb-2.5">
                What topics do you enjoy the most?{" "}
                <span className="text-[17px] text-[#5A5F6B] font-normal">
                  (Choose 2-3)
                </span>
              </h3>
              <Interest interestOptions={interestOptions2} />
            </div>
            <div className="">
              <h3 className="font-bold text-[20px] leading-[150%] pt-3 pb-2.5">
                What are you most excited to earn on storra?{" "}
                <span className="text-[17px] text-[#5A5F6B] font-normal">
                  (Choose 2-3)
                </span>
              </h3>
              <Interest interestOptions={interestOptions2} />
            </div>
            <div className="flex items-center justify-between mt-4">
              <CCButton link="/personalization2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personalization1;
