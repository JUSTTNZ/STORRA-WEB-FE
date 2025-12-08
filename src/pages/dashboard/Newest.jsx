import { useState } from "react";
import Checkbox from "/src/components/dashboard/Checkbox";

export default function App() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="p">
      <Checkbox checked={checked} onChange={() => setChecked(!checked)} />

      <div
        className=" xl:hidden   w-screen overflow-hidden md:hidden flex-col items-center justify-center
        border">
        <div className="hidden w-[740px] h-[350px] rounded-4xl md:flex justify-between px-6 mt-8 bg-[#2D5BFF]">
          <div className="w-[50%] grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-4  px-5 pt-12 ">
            {stepCardData.map((step, i) => {
              return (
                <>
                  {step.number === 3 ? (
                    <span key={i} className="col-span-2 p">
                      <StepCard
                        key={i + step.number + "tablet"}
                        number={step.number}
                        active={step.active}
                        text={step.text}
                      />
                    </span>
                  ) : (
                    <StepCard
                      key={i + step.number + "tablet" + step.active}
                      number={step.number}
                      active={step.active}
                      text={step.text}
                    />
                  )}
                </>
              );
            })}
          </div>

          {/* /////////////////////////////  */}

          <div className=" flex items-start relative h-[86%] top-[25px] w-[48%]">
            <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-size-[16px_16px]  flex justify-center">
              <img
                src="/src/assets/images/auth/swipe2.png"
                alt={`jj`}
                className=" pr-[px] w-[80%] h-80 text-center"
              />
            </div>
          </div>
        </div>

        <div className=" w-[90%]  justify-center ml-6 md:ml-0  flex flex-col gap-2.5 items-center md:items-start mt-[8%] md:mt-6 border">
          <h1 className="font-bold  text-[25px]  ">Individual Account</h1>
          <form
            className="flex flex-col gap-1.5"
            action=""
            onSubmit={handleSubmit(onSubmit)}>
            {MaccountField.map((opt) => {
              return (
                <>
                  <InputField
                    key={"tablet" + opt.label}
                    label={opt.label}
                    placeholder={opt.placeholder}
                    register={register}
                    name={opt.name}
                    phoneNumber={opt.phoneNumber}
                    pin={opt.pin}
                    tablet={true}
                  />

                  {formErrors && (
                    <span
                      key={"tablet" + opt.name}
                      className=" -mt-3 text-[12px] text-red-700">
                      {formErrors[opt.name]}
                    </span>
                  )}
                </>
              );
            })}

            <p className=" text-[12px] text-[#8D8B8B] text-center flex items-center gap-1  ">
              <input
                value={checked}
                onChange={handleChecked}
                type="checkbox"
                name="terms"
                id="tablet-terms"
              />
              I hereby agree to the{" "}
              <a className="text-[#2D5BFF]">Terms & Conditions.</a>
            </p>

            <button
              type="submit"
              disabled={!checked}
              className={`${
                checked ? "bg-[#2D5BFF]" : "bg-gray-400"
              } mt-2 text-white rounded-4xl flex items-center justify-center h-[41px] cursor-pointer w-full`}>
              Create My Account
            </button>
          </form>

          <div className="w-full flex flex-col  md:pl-20 ">
            <SignupAlt />
          </div>

          {/* ////////////// */}
        </div>
      </div>
    </div>
  );
}
