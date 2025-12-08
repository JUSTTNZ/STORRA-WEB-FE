import { FaArrowLeftLong } from "react-icons/fa6";
import ProgressBar from "../../../components/auth/signup/ProgressBar";
import DropdownOption from "../../../components/auth/signup/DropdownOption";
import CCButton from "../../../components/auth/signup/CCButton";
import { useNavigate } from "react-router";

const labels = [
  "Nursery",
  "Primary",
  "Secondary",
  "Tertiary",
  "General Studies",
];
function Personalization() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#e3e7f5] h-screen overflow-hidden ml-0 md:pl-10 xl:pl-[14%] pt-[150px] flex items-center justify-center gap-4">
      <div className="w-full">
        <div className="flex items-center gap-4 mb-7 pl-8 ">
          <FaArrowLeftLong
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="font-bold text-[24px]">Basic Personalization</h1>
        </div>

        <div className=" md:w-[500px] md:ml-38 w-[90vw] mx-auto">
          <ProgressBar value={1} max={3} />

          <div className="h-[600px] px-8 rounded-[1px] ">
            <h3 className="font-bold text-[20px] leading-[150%] pt-2 pb-2.5">
              How do you like to learn best?
            </h3>

            <div>What is your age?</div>
            <DropdownOption label={"Select Age"} />

            <div>What is your age?</div>
            {labels.map((label) => (
              <DropdownOption label={label} />
            ))}

            <div> What Language Do you prefer to work in</div>
            <DropdownOption label={"Select Language"} />
            <div className="flex  justify-between mt-3 ">
              <CCButton link="/personalization1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personalization;
