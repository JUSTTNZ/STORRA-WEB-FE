import StepCard from "/src/components/auth/signup/StepCard";
import InputField from "../../../components/auth/signup/InputField";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaArrowLeftLong } from "react-icons/fa6";
import SignupAlt from "../../../components/auth/signup/SignupAlt";
import { Link, useNavigate } from "react-router";
import { Form, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { validate } from "../../../utils/helpers";
import {
  accountField,
  MaccountField,
  stepCardData,
} from "../../../data/createAccount";

function CreateAccount() {
  const [formErrors, setFormErrors] = useState();
  const [checked, setChecked] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm();

  function onSubmit(data) {
    console.log(data);

    const errorAll = validate(data);

    setFormErrors(() => errorAll);

    console.log("data:", data, "error", Object.keys(errorAll).length);

    if (!data.checked) return;
    if (Object.keys(errorAll).length === 0) {
      localStorage.setItem("userDetail", JSON.stringify({ ...user, ...data }));

      navigate("/personalization");
    }

    return;
    // formErrors
  }
  useEffect(() => {
    setValue("checked", checked);
  }, [checked, setValue]);

  return (
    <>
      <div className="flex md:flex-col xl:flex-row w-[98vw]  items-center h-[99vh] overflow- gap-6 ">
        <div className=" xl:flex xl:order-0 md:order-2  md:items-start justify-center w-[90%] xl:w-[59%]  p-1 rounded-3xl xl:h-[95vh]">
          <div>
            <div className="flex pt-2 xl:gap-1.5">
              <div className="hidden items-start gap-3 xl:inline-flex w-[10%] mt-3 ">
                {/* ////////////////icon? */}
                <div>
                  <div
                    onClick={() => navigate(-1)}
                    className="h-10 w-10 rounded-full bg-[#ECEDF0] relative cursor-pointer">
                    <FaArrowLeftLong className="absolute left-[30%] top-[30%]" />
                  </div>
                </div>
              </div>

              <div className=" w-[90%] items-start  flex flex-col gap-2.5 mx-auto md:ml-0">
                <h1 className="font-bold  text-[25px]  ">
                  {user?.accountType} Account
                </h1>

                <form
                  className="flex flex-col gap-1.5"
                  action=""
                  onSubmit={handleSubmit(onSubmit)}>
                  {accountField.map((opt, i) => {
                    return (
                      <>
                        <InputField
                          register={register}
                          key={i}
                          label={opt.label}
                          placeholder={opt.placeholder}
                          name={opt.name}
                          phoneNumber={opt.phoneNumber}
                          pin={opt.pin}
                        />

                        {formErrors && (
                          <span
                            key={opt.name}
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
                      onChange={() => setChecked((checked) => !checked)}
                      type="checkbox"
                      name="terms"
                      id="terms"
                    />
                    I hereby agree to the{" "}
                    <a className="text-[#2D5BFF]">Terms & Conditions.</a>
                  </p>
                  <button
                    type="submit"
                    className={`${"bg-[#2D5BFF]"} mt-2 text-white rounded-4xl flex items-center justify-center h-[41px] cursor-pointer w-full`}>
                    Create My Account
                  </button>
                </form>

                <div className="flex flex-col gap-5 ml-0 xl:ml-0 md:ml-22  w-full ">
                  <SignupAlt />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* /////////////Right hand side////////////// */}

        <div className="xl:w-[40%] text-white rounded-[40px] h-[96vh] bg-[#2D5BFF] p-10 mt-3 hidden xl:block">
          <div className="   flex items-center justify-center relative h-90 ">
            <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-size-[16px_16px]  flex justify-center">
              <img
                src="/src/assets/images/auth/swipe2.png"
                alt={`jj`}
                className=" pr-[31px] w-[80%] h-[400px] text-center"
              />
            </div>
            <div className=" flex gap-4 items-start relative h-[204px] top-[310px] ">
              {stepCardData.map((step, i) => {
                return (
                  <StepCard
                    key={step.number + i}
                    number={step.number}
                    active={step.active}
                    text={step.text}
                  />
                );
              })}
            </div>
          </div>
        </div>
        {/* //////////////////md screen */}
        <div className="md:order-0 xl:hidden hidden w-[740px] h-[350px] rounded-4xl md:flex justify-between px-6 mt-8 bg-[#2D5BFF]">
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
      </div>
    </>
  );
}

export default CreateAccount;
