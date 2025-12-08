import WelcomeImage from "../../assets/images/home-img/WelcomeImage.png";

function WelcomeSection() {
  return (
    <div className="flex w-[100%] h-[104px] bg-blue-500 mt-[20px] pt-[12px] gap-[10px] pb-[12px] pr-[20px] text-white rounded-[20px] items-center justify-between border-2 border-blue-500 ">
      {/* Points */}
      <img
        className="md:w-[156px] w-[100px] h-[80px] md:h-[104px] "
        src={WelcomeImage}
        alt="welcomeImage"
      />
      <div className="flex justify-between items-center items-center w-[100%] ">
        <div className=" flex md:flex-col flex-col-reverse ">
          <p className="md:text-[14px] text-[10px] font-[500]">
            You’ve earned 500 points this week!
          </p>

          <p className=" md:text-[24px] text-[16px]  font-[700]  ">
            Ready to unlock your{" "}
            <span className="block sm:inline">next reward ?</span>
          </p>
        </div>
        {/* CTA Button */}
        <button className="md:h-[48px] h-[32px]  whitespace-nowrap  w-[140px] md:w-[200px] bg-white md:text-[16px] text-[12px] font-[500] text-black rounded-[32px] border-2 border-white ">
          Continue Learning
        </button>
      </div>
    </div>
  );
}

export default WelcomeSection;
