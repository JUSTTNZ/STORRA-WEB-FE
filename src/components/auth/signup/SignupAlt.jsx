import { FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

function SignupAlt() {
  return (
    <div>
      <div className="flex flex-col gap-5 w-[90vw] md:w-[85%] xl:w-full ">
        <div class="flex items-center justify-center">
          <hr class="border-[#E8E8E8] border w-[32%]" />
          <span class="text-[12px] text-[#B7B7B7] px-4">Or Sign Up with</span>
          <hr class=" border-[#E8E8E8] border w-[32%]" />
        </div>

        <div className="flex items-center justify-between px-4 ">
          <div className="rounded-[100px] h-10 bg-[#ECEDF0] text-[#222632] font-semibold w-[41%] flex items-center justify-center gap-1.5">
            {" "}
            <FcGoogle /> Google
          </div>
          <div className="rounded-[100px] h-10 bg-[#ECEDF0] text-[#222632] font-semibold w-[41%] flex items-center justify-center gap-1.5">
            {" "}
            <FaApple /> Apple
          </div>
        </div>

        <div className="flex justify-center items-center">
          <p className=" text-[12px] font-semibold text-[#222632] text-center flex items-center gap-1 ">
            Already have an account? <a className="text-[#2D5BFF]">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupAlt;
