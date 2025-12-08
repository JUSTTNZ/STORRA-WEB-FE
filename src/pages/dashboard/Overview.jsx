function Overview() {
  return (
    <div>
      <div className="py-5 px-6 flex items-center justify-between border">
        <div>
          <div className="text-[32px] font-bold">Overview</div>
          <div className=" text-[#5A5F6B]">
            Here’s how your learners are doing today?
          </div>
        </div>
        <div className=" flex">
          <div className="flex gap-2 items-center">
            <div>
              <img
                src="/vite.svg"
                alt="logo"
                className="w-6 h-6 rounded-full"
              />
            </div>
            <div>samuel</div>
          </div>
          <div className="flex gap-2 items-center">
            <div>
              <img
                src="/vite.svg"
                alt="logo"
                className="w-6 h-6 rounded-full"
              />
            </div>
            <div>samuel</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
