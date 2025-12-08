import React from "react";
import StudentAvatar from "../../assets/images/home-img/student.png";

function ProgressSection() {
  return (
    <>
      <section className=" sm:flex lg:flex hidden  h-[72px] items-center justify-between w-[100%]  ">
        {/* Greeting */}

        {/* Subheading */}
        <div>
          <h2 className="text-[32px] font-[500] text-black">Hello Jemimah,</h2>

          <p className="text-[16px] font-[500] text-grey-500">
            Here’s your learning journey today
          </p>
        </div>
        <div>
          <p className="text-[16px] font-[500] text-blue-400">
            Pri 1 {/* <HiChevronDown className="text-gray-500 text-lg " /> */}
          </p>
        </div>
      </section>

      {/* mobile header */}
      <div className="flex justify-between h-[45px] items-center w-[100%]  sm:hidden lg:hidden">
        <div className="flex w-[285px] h-[45px] items-center justify-between">
          <img
            className="w-[40px] h-[40px]"
            src={StudentAvatar}
            alt="student"
          />
          <div>
            <h2 className="text-[16px] font-[500] text-black">
              Hello Jemimah,
            </h2>

            <p className="text-[14px] font-[500] text-grey-500">
              Here’s your learning journey today
            </p>
          </div>
        </div>
        <div>
          <p className="text-[16px] font-[500] text-blue-400">
            Pri 1 {/* <HiChevronDown className="text-gray-500 text-lg " /> */}
          </p>
        </div>
      </div>
    </>
  );
}

export default ProgressSection;
