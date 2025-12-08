import { useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
// import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function InputField({
  label,
  placeholder,
  register = () => {},
  name,
  pin = false,
  phoneNumber = false,
}) {
  const [visible, setVisible] = useState(false);
  function handleToggle() {
    setVisible(!visible);
  }

  return (
    <>
      <div>
        <div className=" flex flex-col gap-2">
          <div>
            <label className="text-[14px] text-[#222632]">{label}</label>

            <div className="xl:border-[1.5px] xl:h-7 xl:w-[400px] w-[89.5vw] h-11 border border-[#DFDFDF] rounded-xl px-4  flex items-center ">
              {/* //////////////////////////////////////normal */}
              {(pin && (
                <>
                  <input
                    autoComplete="off"
                    {...register(name)}
                    type={visible ? "text" : "password"}
                    placeholder={placeholder}
                    className={`text-[#7D7F85] focus:outline-none border-none w-[90%] md:w-[97%] xl:w-[90%]`}
                  />
                  <div
                    onClick={handleToggle}
                    className="text-[#7D7F85] inline-flex cursor-pointer">
                    {visible ? <PiEyeLight /> : <PiEyeSlash />}
                  </div>
                </>
              )) ||
                (phoneNumber && (
                  <PhoneInput
                    autoComplete="off"
                    {...register(name)}
                    placeholder={placeholder}
                    onChange={(e) => e}
                  />
                )) || (
                  <input
                    {...register(name)}
                    type="text"
                    autoComplete="off"
                    placeholder={placeholder}
                    className="text-[#7D7F85] focus:outline-none border-none w-full "
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InputField;
