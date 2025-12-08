import { FcGoogle } from "react-icons/fc";
import InputFied from "../../../components/auth/signup/InputField";
import { FaApple } from "react-icons/fa6";
import SignupAlt from "../../../components/auth/signup/SignupAlt";

import "../../../assets/images/auth/login.png";

function Login() {
  return (
    <>
      <div className="hidden xl:flex w-screen overflow-hidden justify-between h-screen px-4">
        <div className=" w-[60%] flex items-center justify-center">
          <div className="w-[370px] flex justify-center flex-col  gap-5">
            <InputFied
              label={"Email"}
              placeholder={"e.g ayodele@gmail.co..."}
            />
            <InputFied
              label={"Password"}
              placeholder={"e.g ******"}
              pin={true}
            />

            <span className="flex  items-center justify-end-safe">
              forget password
            </span>
            <div className=" mt-2 bg-[#2D5BFF] text-white rounded-4xl flex items-center justify-center h-[41px] cursor-pointer w-full">
              Create My Account
            </div>

            {/* /////////////////////////////// */}

            <SignupAlt />
          </div>
        </div>

        <div className=" flex  items-start relative h-[98%] top-1.5 w-[40%] bg-[#2D5BFF] rounded-2xl px-8">
          <div className="flex items-center justify-center text-white flex-col mt-10  w-full ">
            <h1 className="font-bold text-[30px]">Welcome Back To Storra</h1>
            <p className="text-[#E0E1E5] text-center">
              Let’s get back into learning and earning the fun <br /> way, Are
              you ready?
            </p>
          </div>
          <div className="absolute h-[73%] top-[25%] inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-size-[16px_16px]  flex justify-center mx-4">
            <img
              src="/src/assets/images/auth/login.png"
              alt={`login image`}
              className=" pr-[px] w-[95%] h-110 text-center"
            />
          </div>
        </div>
        {/* ////////////////////////////// tablet*/}

        {/* /////////////////////////////mobile/////// */}
      </div>
      {/* //////////////////////////////////// */}
      <div className="xl:hidden sm:hidden ">
        <div className=" flex justify-between relative h-[360px] mt-8.5 w-[90%] mx-auto bg-[#2D5BFF] rounded-2xl px-8">
          <div className="flex items-start  justify-center text-white flex-col   w-1/2 p border ">
            <h1 className="font-bold text-[32px]">Welcome Back To Storra!</h1>
            <p className="text-[#E0E1E5] text-[20px]">
              Let’s get back into learning and <br /> earning the fun way, Are
              you ready?
            </p>
          </div>
          <div className="absolute h-[90%] left-[49%] top-5 w-[45%]  inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-size-[16px_16px]  flex justify-center mx-4">
            <img
              src="/src/assets/images/auth/login.png"
              alt={`login image`}
              className=" pr-[px] w-[80%] h-120 text-center"
            />
          </div>

          {/* ////////////form */}
        </div>
        <div className="w-[89.5vw]  flex justify-center flex-col  gap-5 mx-auto ">
          <h1 className="font-bold text-[#222632] text-[32px]">
            Login To Your Account
          </h1>

          <InputFied
            label={"Email"}
            placeholder={"e.g ayodele@gmail.co..."}
            tablet={true}
          />
          <InputFied
            label={"Password"}
            placeholder={"e.g ******"}
            pin={true}
            tablet={true}
          />

          <span className="flex text-[#222632] items-center justify-end">
            forget password
          </span>
          <div className="mx-2 mt-2 bg-[#2D5BFF] text-white rounded-4xl flex items-center justify-center h-[41px] cursor-pointer w-full">
            Create My Account
          </div>
        </div>
        <div className="mt-6 ml-14 w-full ">
          <SignupAlt />
        </div>
      </div>

      {/* //////////////////////////////////// */}
      <div className=" md:ml-0  mt-20 md:mt-0 w-full  flex md:hidden flex-col items-center justify-center xl:hidden">
        <div className="w-[89.5vw]  flex justify-center flex-col  gap-5">
          <h1 className="font-bold text-[#222632] text-[32px]">
            Login To Your Account
          </h1>

          <InputFied
            label={"Email"}
            placeholder={"e.g ayodele@gmail.co..."}
            mobile={true}
          />
          <InputFied
            label={"Password"}
            placeholder={"e.g ******"}
            pin={true}
            mobile={true}
          />

          <span className="flex text-[#222632] items-center justify-end">
            forget password
          </span>
          <div className="mx-2 mt-2 bg-[#2D5BFF] text-white rounded-4xl flex items-center justify-center h-[41px] cursor-pointer w-full">
            Create My Account
          </div>
        </div>
        <div className="mt-6">
          <SignupAlt />
        </div>
      </div>
    </>
  );
}

export default Login;
