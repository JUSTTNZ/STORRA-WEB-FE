import React from "react";
import successImg from "../../assets/images/modals/successImg.png";
import { Link } from "react-router-dom";

function SuccessModal() {
  return (
    <div className="fixed inset-0 bg-[#A7A3A3]/1 backdrop-blur-[24px] flex items-center justify-center p-4 z-[80]">
      <div className="flex flex-col items-center gap-[20px] bg-white rounded-[20px] shadow-2xl p-8 ">
        <img
          className="w-[160px] h-[160px] "
          src={successImg}
          alt="successImg"
        />

        <div className="w-[420px] h-[194px] flex flex-col justify-center gap-[15px]">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Transfer Successful!
          </h2>
          <p className="text-gray-600 text-center ">
            You have successfull Transfered{" "}
            <span className="font-bold text-black">₦20,000</span> to{" "}
            <span className="font-bold text-black">John Doe</span> <br /> click
            below to go back to homepage
          </p>
          <Link to="/">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-[100px] transition-colors duration-200 shadow-md hover:shadow-lg">
              Proceed to Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
