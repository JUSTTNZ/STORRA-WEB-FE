import ProgressBar from "../../../components/auth/signup/ProgressBar";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import Interest from "../../../components/auth/signup/Interest";
import CCButton from "../../../components/auth/signup/CCButton";
import { useNavigate } from "react-router";

const interestOptions1 = [
  { id: 1, label: "Reading faster" },
  { id: 2, label: "Spelling" },
  { id: 3, label: "Doing math in my head" },
  { id: 4, label: "+  Add" },
];
const interestOptions2 = [
  { id: 1, label: "1 day" },
  { id: 2, label: "2 days" },
  { id: 3, label: "3 days" },
  { id: 4, label: "4 days" },
  { id: 5, label: "5 days" },
  { id: 6, label: "6 days" },
  { id: 7, label: "7 days" },
];
const interestOptions3 = [
  { id: 1, label: "10 mins" },
  { id: 2, label: "10-15 mins" },
  { id: 3, label: "15-30 mins" },
  { id: 4, label: "15-30 mins" },
  { id: 5, label: "1 hour" },
];

function Personalization2() {
  const navigate = useNavigate();
  return (
    <div className=" h-screen overflow-hidden pl-60 pt-[70px] flex items-center justify-center ">
      <div className="w-full ">
        <div className="flex items-center gap-4 mb-2 mt-8 ">
          <FaArrowLeftLong onClick={() => navigate(-1)} />
          <h1 className="font-bold text-[22px] leading-[150%]">
            Learning Goals
          </h1>
        </div>
        <div className=" w-86 ml-35 ">
          <ProgressBar value={3} max={3} />
          <div className="h-[600px]  rounded-[1px] ">
            <div className="">
              <h3 className="font-bold text-[17px] text-[#131313] leading-[150%] pt-2 pb-2.5">
                What do you want to get better at?
              </h3>
              <Interest interestOptions={interestOptions1} />
            </div>
            <div className="">
              <h3 className="font-bold text-[17px] leading-[150%] pt-4 pb-2.5">
                How many days a week would you want to learn on storra?
              </h3>
              <Interest interestOptions={interestOptions2} />
            </div>
            <div className="">
              <h3 className="font-bold text-[17px] leading-[150%] pt-4 pb-2.5">
                How much time can you spend learning each day?
              </h3>
              <Interest interestOptions={interestOptions3} />
            </div>
            <div className="flex items-center justify-between mt-5">
              <CCButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personalization2;
