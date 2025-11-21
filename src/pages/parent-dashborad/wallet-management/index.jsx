import React, { useState } from "react";
import AppButton from "../../../components/form/AppButton";
import { currencyFormatter } from "../../../utils/helpers";
import { card, kidsData, recentData, walletRowData, walletTableColumn } from "../../../data/parent-data/wallet";
import AppSelectField from "../../../components/form/AppSelectField";
import Table from "../../../components/wallet/Table";
import WalletRowTemplate from "../../../components/parent-wallet/WalletRowTemplate";

const WalletPage = () => {
const [activetab, setactivetab] = useState(card[1])

  return (
    <div className="overflow-x-hidden w-full h-full bg-[#F4F5F8] text-[#7D7F85] p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-[32px] text-black">Wallet Management</h1>
        <button className="flex items-center gap-2 bg-[#2D5BFF] max-w-fit p-2 text-white rounded-full">
          <img
            src="/src/assets/images/parent-dashboard-img/arrow-up.png"
            alt=""
          />
          <span>Send Money</span>
        </button>
      </div>

      <div className="bg-white rounded-lg w-[30%] p-4 gap-1 flex flex-col mb-4">
        <span className="text-[14px]">Your Balance</span>
        <span className="text-black font-bold text-[20px]">
          {currencyFormatter(32000)}
        </span>
        <div className="flex items-center gap-[8px]">
          <input type="radio" />{" "}
          <label htmlFor="" className="text-[14px]">
            Set weekly/monthly spending limits
          </label>
        </div>
        <AppButton
          title="Top Up Wallet"
          className="text-white p-2 justify-center"
          full
        />
      </div>

      <div className="bg-white rounded-lg p-4 flex flex-col gap-2 mb-4">
        <div className="flex items-center justify-between  mb-4">
          <div className="flex flex-col">
            <h1 className="text-black text-[20px]">Your Card</h1>
            <span className="text-[14px]">
              Add your card to be able to fund wallet automatically
            </span>
          </div>
          <div className="px-6 py-2 rounded-full border-[2px] border-[#2D5BFF] text-[14px]">
            Add
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {card?.map((item, i) => (
            <div key={i} className={`w-full rounded-full border-[1px] ${activetab === i ? "border-[#2D5BFF] border-[2px]" : "border-[#E0E1E5]"} py-3 px-8 flex items-center justify-between`} onClick={()=>setactivetab(i)}>
              <div className="flex items-center justify-items-start gap-12">
                <div className={`w-5 h-5 border-[1px] rounded-full ${activetab === i ? "bg-[#2D5BFF]" : ""}`}></div>
                <div className="">
                    <img src={`/src/assets/images/parent-dashboard-img/${item?.image[0]}`}  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px]">{item?.card}</span>
                  <span className="font-bold tex-black text-[16px]">
                    {item?.cardDetail}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px]">{item?.expiry}</span>
                  <span className="font-bold text-black text-[16px]">{item?.expDetail}</span>
                </div>
              </div>
              <div className="">
                <img
                  src={`/src/assets/images/parent-dashboard-img/${item?.image[1]}`}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white flex flex-col gap-2 p-4">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-bold text-black text-[20px]">Transaction history</h1>

                <div className="flex gap-3 ">
                    <AppSelectField title="Recent" array={recentData}/>
                    <AppSelectField title="All kids" array={kidsData}/>
                    <AppButton title="Export CSV" icon iconSrc="/src/assets/images/parent-dashboard-img/export.png" className="text-[14px] text-white px-5 rounded-lg"/>
                </div>
            </div>

            <Table tableColumn={walletTableColumn} rowData={walletRowData} rowTemplate={WalletRowTemplate}/>
        </div>
    </div>
  );
};

export default WalletPage;
