import "/src/assets/images/auth/logo.png";
import { useEffect, useState } from "react";
import AccountOption from "../../../components/auth/signup/AccountOption";
import { Link, Navigate, useNavigate } from "react-router";
import { slides, slidesMd } from "../../../data/SignupData";

function SignupDefault() {
  let initial = JSON.parse(localStorage.getItem("user")) || "";

  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(initial?.accountType);

  const nextSlide = () => setCount((prev) => (prev + 1) % slides.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval); // cleanup to prevent memory leaks
  }, [count]);

  const navigate = useNavigate();
  function onSubmit() {
    console.log(selected);
    if (!selected) return;

    localStorage.setItem(
      "user",
      JSON.stringify({
        accountType: selected,
      })
    );

    navigate("/create-account");
  }

  return (
    <>
      <div className="hidden xl:flex overflow-hidden   items-center flex-end justify-between p-1 rounded-3xl h-[95vh]">
        <div className=" flex flex-col items-center justify-center  bg-white px-4 w-[60%]">
          <img
            src="/src/assets/images/auth/logo.png"
            alt="logo"
            className="w-[104px] h-[104px]"
          />
          <h2 className=" font-bold text-3xl mb-6 w-[433px] text-center leading-[150%]">
            Which Account Type Would You Like To Create
          </h2>

          <div className="flex flex-col gap-3 w-full max-w-sm">
            <AccountOption
              title="Student Account"
              selected={selected === "Student"}
              onClick={() => setSelected("Student")}
              description="You're just one step away from learning & earning"
            />

            <AccountOption
              title="Parent Account"
              label="Parent"
              selected={selected === "Parent"}
              onClick={() => setSelected("Parent")}
              description="Track Your child's learning. Set limits. Earn together."
            />
          </div>

          <button
            onClick={() => onSubmit(selected)}
            className={`mt-6 ${
              selected ? "bg-blue-600" : "bg-gray-400"
            } text-center text-white px-6 py-2 rounded-4xl  font-medium w-[350px] hover:bg-blue-700 transition-all`}>
            {`Create ${selected ? selected : ""} Account`}
          </button>
        </div>

        <div className="w-[40%] text-white rounded-[40px] h-[91vh] bg-[#2D5BFF] p-10 mt-auto ">
          <div className="   flex items-center justify-center relative h-90 ">
            <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-size-[16px_16px]  flex justify-center">
              <img
                src={slides[count].image}
                alt={slides[count].title}
                className=" pr-[31px] w-[80%] h-[400px] text-center"
              />
            </div>
            <div className=" relative h-[204px] top-[310px] ">
              <h6 className="font-bold text-center text-[30px] leading-[140%] px-10">
                {slides[count].title}
              </h6>

              <p className="font-thin leading-[150%] text-[17px] text-center px-12">
                {slides[count].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ????????????????????????????????TABLETS SCREEN ??????????????????? */}

      <div className="hidden md:grid xl:hidden grid-rows-2 items-center justify-center ">
        <div className=" w-[740px] h-[340px] rounded-4xl flex gap-5 bg-[#2D5BFF]">
          <div className="w-1/2 relative ">
            <div className=" flex flex-col h-[px]  text-white pl-8 mt-16">
              <h6 className="font-bold  text-[28px] leading-[140%] ">
                {slidesMd[count].title}
              </h6>

              <p className=" leading-[150%] text-[19px] tracking-wide  w- mt-2.5">
                {slidesMd[count].description}
              </p>

              <div className="absolute bottom-10 flex gap-2">
                {slidesMd.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCount(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === count ? "w-7 bg-white scale-125" : "bg-white/40"
                    }`}></button>
                ))}
              </div>
            </div>
          </div>
          {/* //second */}
          <div className="w-1/2   ">
            <div className="w-[317px] h-[310px] relative">
              <div className="top-6 left-4 absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-size-[16px_16px]  flex justify-center">
                <img
                  src={slides[count].image}
                  alt={slides[count].title}
                  className=" "
                />
              </div>
            </div>
          </div>
          {/* ////////////////// */}
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            src="/src/assets/images/auth/logo.png"
            alt="logo"
            className="w-[104px] h-[104px]"
          />
          <h2 className=" font-bold text-3xl mb-6 w-[433px] text-center leading-[150%]">
            Which Account Type Would You Like To Create
          </h2>

          <div className="flex flex-col gap-3 w-full max-w-sm">
            <AccountOption
              title="Student Account"
              selected={selected === "Student"}
              onClick={() => setSelected("Student")}
              description="You're just one step away from learning & earning"
            />

            <AccountOption
              title="Parent Account"
              label="Parent"
              selected={selected === "Parent"}
              onClick={() => setSelected("Parent")}
              description="Track Your child's learning. Set limits. Earn together."
            />
          </div>
          <button
            onClick={onSubmit}
            className={`mt-6 ${
              selected ? "bg-blue-600" : "bg-gray-400"
            } text-white px-6 py-2 rounded-4xl  font-medium w-[350px] hover:bg-blue-700 transition-all`}>
            {`Create ${selected} Account`}
          </button>
        </div>
      </div>

      {/* ////////////////////////////////////////Mobile //////// */}
      <div className="flex flex-col items-center justify-center md:hidden">
        <img
          src="/src/assets/images/auth/logo.png"
          alt="logo"
          className="w-[104px] h-[104px] mt-14"
        />
        <h2 className=" font-bold text-[24px] mb-4 w-[313px] h-[72px] text-center leading-[150%]">
          Which Account Type Would You Like To Create
        </h2>

        <div className="flex flex-col sm:gap-3 w-full max-w-sm justify-center items-center">
          <AccountOption
            title="Student Account"
            selected={selected === "Student"}
            onClick={() => setSelected("student")}
            description="You're just one step away from learning & earning"
          />

          <AccountOption
            title="Parent Account"
            label="Parent"
            selected={selected === "Parent"}
            onClick={() => setSelected("Parent")}
            description="Track Your child's learning. Set limits. Earn together."
          />

          <AccountOption
            title="Teachers Account"
            label="teacher"
            selected={selected === "teacher"}
            onClick={() => setSelected("teacher")}
            description="Track Your child's learning. Set limits. Earn together."
          />
        </div>
        <button
          onClick={() => onSubmit(selected)}
          className={`mt-6 ${
            selected ? "bg-blue-600" : "bg-gray-400"
          } text-white px-6 py-2 rounded-4xl  font-medium w-[350px] hover:bg-blue-700 transition-all`}>
          {`Create ${selected} Account`}
        </button>
      </div>
    </>
  );
}

export default SignupDefault;
