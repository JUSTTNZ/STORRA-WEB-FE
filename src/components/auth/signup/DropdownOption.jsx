import { RiArrowDropDownLine } from "react-icons/ri";

function DropdownOption({ label }) {
  return (
    <div className="flex justify-between items-cente bg-white px-2 py-1.5 border-gray-200 border-2">
      <span className="text-sm ">{label}</span>
      <RiArrowDropDownLine />
    </div>
  );
}

export default DropdownOption;
