import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router";

function CCButton({ link = "/" }) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className=" cursor-pointer border-[#D1D2D5] border h-12 rounded-4xl px-6 flex items-center">
        {" "}
        Cancel
      </div>
      <Link
        to={link}
        className=" h-12 cursor-pointer flex items-center px-4 text-white bg-[#2D5BFF] gap-2 rounded-4xl">
        {" "}
        Continue{" "}
        <span className="pr-2">
          <FaArrowRight />
        </span>
      </Link>
    </div>
  );
}

export default CCButton;
