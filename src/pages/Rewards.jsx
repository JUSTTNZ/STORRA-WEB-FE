import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaGift } from "react-icons/fa6";
import { Link } from "react-router";
function Rewards() {
  return (
    <div className="flex flex-col p-6 bg-gray-100 justify-between h-full">
      <div className="rounded-xl bg-blue-600  flex items-center justify-between px-10 py-5">
        <h1 className="text-[32px] font-bold">
          Your Rewards Balance: 1,250 points
          <p className="text-sm font-normal">
            Level silver| 250 points to Gold Tier
          </p>
        </h1>
        <div>
          <AiOutlineLoading3Quarters />{" "}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="border rounded-2xl col-span-1 p-3 flex flex-col gap-3.5 shadow-md ">
          <h2 className="py-2 font-bold text-[18px]">Available Rewards </h2>

          <div className="border-gray-300 border px-3 py-3 rounded-xl flex gap- items-center justify-between">
            <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center ">
              <FaGift className="  w-4 h-4 " />
            </div>
            <div className="w-[82%]">
              <h4 className="font-medium tracking-wide">E10 Amazon Voucher</h4>
              <div className="flex justify-between">
                <p>100 points</p>
                <div className="px-2.5 py-1 rounded-xl text-white bg-blue-700  cursor-pointer">
                  {" "}
                  Redeem
                </div>
              </div>
            </div>
          </div>

          <div className="border-gray-300 border px-3 py-3 rounded-xl flex gap-1.5 items-center justify-between">
            <FaGift className="bg-blue-400 text-white rounded-full w-6 h-6 p-4" />
            <div>
              <h4>E10 amazon voucher</h4>
              <p>100 points</p>
            </div>
            <div className="px-2.5 py-1.5 rounded-xl text-white bg-blue-700  cursor-pointer">
              {" "}
              Redeem
            </div>
          </div>
          <div className="border-gray-300 border px-3 py-3 rounded-xl flex gap-1.5 items-center justify-between">
            <FaGift />
            <div>
              <h4>E10 amazon voucher</h4>
              <p>100 points</p>
            </div>
            <div className="px-2.5 py-1.5 rounded-xl text-white bg-blue-700  cursor-pointer">
              {" "}
              Redeem
            </div>
          </div>
        </div>
        <div className="border rounded-2xl col-span-1 p-3 flex flex-col gap-3.5">
          <h2>available rewards </h2>

          <div className="border-gray-300 border px-3 py-3 rounded-xl flex gap-1.5 items-center justify-between">
            <FaGift className="bg-blue-400 text-white rounded-full w-6 h-6 p-4" />
            <div>
              <h4>E10 amazon voucher</h4>
              <p>100 points</p>
            </div>
            <div className="px-2.5 py-1.5 rounded-xl text-white bg-blue-700  cursor-pointer">
              {" "}
              Redeem
            </div>
          </div>

          <div className="border-gray-300 border px-3 py-3 rounded-xl flex gap-1.5 items-center justify-between">
            <FaGift className="bg-blue-400 text-white rounded-full w-6 h-6 p-4" />
            <div>
              <h4>E10 amazon voucher</h4>
              <p>100 points</p>
            </div>
            <div className="px-2.5 py-1.5 rounded-xl text-white bg-blue-700  cursor-pointer">
              {" "}
              Redeem
            </div>
          </div>
          <div className="border-gray-300 border px-3 py-3 rounded-xl flex gap-1.5 items-center justify-between">
            <FaGift />
            <div>
              <h4>E10 amazon voucher</h4>
              <p>100 points</p>
            </div>
            <div className="px-2.5 py-1.5 rounded-xl text-white bg-blue-700  cursor-pointer">
              {" "}
              Redeem
            </div>
          </div>
        </div>
        <div className="border-gray-200 border shadow-md rounded-2xl col-span-1 p-3 flex flex-col gap-3.5 ">
          <h2>available rewards </h2>

          <div className="border-gray-300 border px-3 py-3 rounded-xl flex gap-1.5 items-center justify-between">
            <FaGift className="bg-blue-400 text-white rounded-full w-6 h-6 p-4" />
            <div>
              <h4>E10 amazon voucher</h4>
              <p>100 points</p>
            </div>
            <div className="px-2.5 py-1.5 rounded-xl text-white bg-blue-700  cursor-pointer">
              {" "}
              Redeem
            </div>
          </div>

          <div className="border-gray-300 border px-3 py-3 rounded-xl flex gap-1.5 items-center justify-between">
            <FaGift className="bg-blue-400 text-white rounded-full w-6 h-6 p-4" />
            <div>
              <h4>E10 amazon voucher</h4>
              <p>100 points</p>
            </div>
            <div className="px-2.5 py-1.5 rounded-xl text-white bg-blue-700  cursor-pointer">
              {" "}
              Redeem
            </div>
          </div>
          <div className="border-gray-300 border px-3 py-3 rounded-xl flex  items-center justify-between">
            <div className="flex gap-4 items-center">
              <FaGift />
              <div>
                <h4 className="font-medium">E10 amazon voucher</h4>
                <p className="font-thin">+100 points</p>
              </div>
            </div>
            <div className="px-2.5 py-1.5 rounded-xl text-white bg-green-700  cursor-pointer">
              {" "}
              Redeem
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 justify-center  w-full pt-2">
        <Link to="/help" className="text-sm font-medium cursor-pointer">
          Help Center
        </Link>
        <Link to="/terms" className="text-sm font-medium cursor-pointer">
          {" "}
          Terms & Conditions
        </Link>
        <Link to="/privacy" className="text-sm font-medium cursor-pointer">
          {" "}
          Privacy & Policy
        </Link>
      </div>
    </div>
  );
}

export default Rewards;
