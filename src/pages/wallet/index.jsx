import React, { useState } from "react";
import AppButton from "../../components/form/AppButton";
import TransactionPageCard from "../../components/wallet/TransactionPageCard";
import {
  addOnCardData,
  transactionCardData,
  transactionRowData,
  transactionTableColumn,
  walletActionPerformed,
} from "../../data/wallet";
import { Link } from "react-router-dom";
import { currencyFormatter } from "../../utils/helpers";
import Table from "../../components/wallet/Table";
import TransactionRowTemplate from "../../components/wallet/transactionRowTemplate";

const TransactionPage = () => {
  const [activetab, setactiveTab] = useState(walletActionPerformed[0]);

  return (
    <div className="w-full p-5 text-[#7D7F85] overflow-x-hidden">
      <div className="lg:hidden flex items-center justify-between mb-6">
        <img
          src="/src/assets/images/wallet/trigram.png"
          alt=""
          className="rounded-full p-3 bg-[#F5F5F5]"
        />

        <div className="flex gap-1 items-center">
          <img
            src="/src/assets/images/courses-img/search.png"
            alt=""
            className="rounded-full p-3 bg-[#F5F5F5]"
          />
          <img
            src="/src/assets/images/courses-img/notification.png"
            alt=""
            className="rounded-full p-3 bg-[#F5F5F5]"
          />
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <h1 className="hidden lg:w-[50%] lg:block text-black text-[32px] font-bold">
          Wallet
        </h1>
        <div className="w-[100%] lg:w-[50%] flex items-center justify-end gap-1">
          <AppButton
            title="Add Money"
            className={`bg-transparent text-[#2D5BFF] border-[1px] border-[#2D5BFF] text-[10px] lg:text-[12px] rounded-lg px-3 py-1 lg:px-8 lg:py-2`}
            icon
            iconSrc="/src/assets/images/wallet/Wallet.svg"
          />
          <AppButton
            title="Send Money"
            className="text-white rounded-lg text-[10px] lg:text-[12px] px-3 py-1 lg:px-8 lg:py-2"
            icon
            iconSrc={`/src/assets/images/wallet/Send.png`}
          />
        </div>
      </div>
      <div className="w-full flex gap-15 items-center justify-between mb-8 lg:mb-6">
        <div
          className="w-full lg:w-[70%] h-[125px] flex justify-between items-start p-3 text-white rounded-2xl"
          style={{ background: "linear-gradient(to bottom, #2D5BFF, #001E8A)" }}
        >
          <div className="flex flex-col gap-9">
            <div className="flex flex-col">
              <span className="text-[12px]">Account balance</span>
              <span className="text-[20px]">{currencyFormatter(250000)}</span>
            </div>

            <div className="text-[12px] flex items-center gap-1">
              <span>Account number</span> <span>01023455678</span>
              <img src="/src/assets/images/wallet/Copy.png" alt="" />
            </div>
          </div>

          <img
            src="/src/assets/images/wallet/Eye.svg"
            alt=""
            className="w-[20px]"
          />
        </div>

        <div className="hidden w-[30%] shadow-lg lg:flex justify-between p-3 rounded-2xl">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <span className="text-[12px]">Rewards Points</span>
              <span className="text-[16px] font-bold text-black">1250</span>
            </div>

            <div className="text-[12px] text-[#00D018] flex gap-1">
              <img src="/src/assets/images/wallet/Vector.svg" alt="" />
              <span className="">16.8% increase</span>
            </div>
          </div>

          <div className="p-1 bg-[#2d5aff1e] rounded-lg max-h-fit ">
            <img src="/src/assets/images/wallet/pointside.svg" alt="" />
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <TransactionPageCard
          array={transactionCardData}
          className="shadow-lg rounded-lg flex flex-col items-center gap-1 p-4"
          imgSrc={`/src/assets/images/wallet`}
        />
      </div>

      <div className="lg:w-full md:w-full flex flex-col gap-4 overflow-x-auto min-w-max">
        <div className="w-full flex cursor-pointer text-[18px] bg-[#F0F0F099] mb-5">
          {walletActionPerformed.map((item, i) => (
            <div
              key={i}
              className={`w-[25%] text-center py-2 ${
                activetab === item ? "bg-[#2D5BFF] text-white" : ""
              }`}
              onClick={() => setactiveTab(item)}
            >
              {item}
            </div>
          ))}
        </div>

        {activetab === "Fx" && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <TransactionPageCard
              cat
              className="shadow-lg rounded-lg flex flex-col gap-1 p-4 relative"
              array={addOnCardData}
              imgSrc={`/src/assets/images/wallet`}
            />
          </div>
        )}

        <div className="flex justify-between text-[16px]">
          <span className="text-black">Recent transactions</span>
          <Link to="/" className="text-[#2D5BFF]">
            See all
          </Link>
        </div>

        <div className="">
          {activetab === "Transaction" && (
            <Table
              tableColumn={transactionTableColumn}
              rowTemplate={TransactionRowTemplate}
              rowData={transactionRowData}
            />
          )}
          {activetab === "Fx" && (
            <Table
              tableColumn={transactionTableColumn}
              rowTemplate={TransactionRowTemplate}
              rowData={transactionRowData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
