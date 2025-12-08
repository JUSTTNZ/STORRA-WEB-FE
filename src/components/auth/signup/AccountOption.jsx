// src/components/common/AccountOption.jsx
export default function AccountOption({
  title,
  description,
  selected,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`flex px-4 items-center justify-between w-[90%] sm:w-[98%] h-[94px] sm:h-24 rounded-xl border cursor-pointer transition-all
          ${
            selected
              ? "bg-blue-100 border-blue-500"
              : "bg-white border-amber-50"
          }
          `}>
      <div className="flex items-start gap-3">
        <div className=" bg-blue-100 rounded-full ">
          <div className="w-[34px] h-[34px] text-[#2D5BFF]" />
        </div>
        <div>
          {/* ///////////////////////// */}
          <h3 className="font-bold text-lg sm:text-xl text-gray-900">
            {title}
          </h3>
          <p className="text-gray-500 text-[14px] sm:text-[16px] font-sm ">
            {description}
          </p>
        </div>
      </div>

      {/* ////////////////////////////////////////////////////// */}
      <div>
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center  mx-4 space-x-4 transition-all
          ${selected ? "border-blue-600" : "border-gray-300"}`}>
          <div
            className={`w-2.5 h-2.5 rounded-full bg-blue-600 transition-all duration-200 ${
              selected ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
