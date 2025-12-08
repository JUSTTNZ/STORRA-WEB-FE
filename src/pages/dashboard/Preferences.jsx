import { useState } from "react";
import { notifications, preference } from "../../data/dashboard";
import Checkbox from "/src/components/dashboard/Checkbox";

function Preferences() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [checked, setChecked] = useState(false);

  const changeOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
    setChecked(() => setChecked(!checked));
    console.log(selectedOptions);
  };
  return (
    <div className="">
      <div className=" flex flex-col h-full overflow-hidden ">
        <div className="text-[26px] font-bold py-3  text-[#131313] pb-4 h-">
          Notification Preferences
          <p className=" text-sm font-thin text-gray-600">
            Set your notification preference
          </p>
        </div>

        {preference?.map((pref) => {
          return (
            <div
              key={pref.id}
              className={`${
                pref.id > 0 && "mt-6 pt-6 border-t-[1.5px] border-gray-50"
              } flex gap-4  justify-between  `}>
              <div className="flex h-[200px] w-[340px]  ">
                <div className=" flex flex-col w-[]">
                  <span className="text-[16px] font-medium text-[#131313]">
                    {pref.label}
                  </span>
                  <p className="text-[#5A5F6B] ">{pref.description}</p>
                </div>
              </div>
              <div className=" flex flex-col gap-1.5 h-[200px]  ">
                {notifications.map((notis) => {
                  return (
                    <>
                      <div className="w-[85%]" key={notis.id}>
                        <h2 className="font-medium text-[#131313] text-[14px] flex gap-2">
                          <Checkbox
                            value={notis?.type + pref.label}
                            checked={selectedOptions.includes(
                              notis?.type + pref.label
                            )}
                            onChange={(e) => changeOption(e.target.value)}
                          />

                          {notis?.type}
                        </h2>
                        <p className="text-sm text-[#5A5F6B]">
                          {notis?.detail}
                        </p>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Preferences;
