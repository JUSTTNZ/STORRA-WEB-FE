import { useState } from "react";

function PrefrenceOption(preference, notifications) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const shangeOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
    console.log(selectedOptions);
  };
  return (
    <>
      {preference?.map((pref, i) => {
        <div
          className={`${
            pref.id > 0 && "mt-6 pt-6"
          } flex items-center justify-between border`}>
          <div className="w-1/2 flex h-[200px]">
            <div className=" flex flex-col border">
              <span>{pref.label}</span>
              <p>{pref.description}</p>
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-1.5 -[200px]">
            <div className="w-[75%]">
              <span className="font-medium text-[14px]">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  value={notifications[i]?.type}
                  className="rounded-full "
                  onClick={(e) => shangeOption(e.target.value)}
                />{" "}
                {notifications[i]?.type}
              </span>
              <p className="text-sm">{notifications[i]?.detail}</p>
            </div>
          </div>
        </div>;
      })}
    </>
  );
}

export default PrefrenceOption;
