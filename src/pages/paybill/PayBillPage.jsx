import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import PaybillRecieptModal from "../paybill/PaybillRecieptModal.jsx";
import PaybillSecretePinModal from "./PaybillSecretePinModal.jsx";
import PaybillSuccessModal from "./PaybillSuccessModal.jsx";

export default function PayBillModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedService, setSelectedService] = useState("electricity");
  const [billType, setBillType] = useState("prepaid");
  const [meterNumber, setMeterNumber] = useState("");
  const [nextPage, setNextPage] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");

  const quickAmounts = [50, 100, 200, 500, 1000, 1500, 2000, 2500];

  const services = [
    { id: "electricity", name: "Electricity" },
    { id: "internet", name: "Internet" },
    { id: "transport", name: "Transport" },
  ];

  const electricityProviders = [
    "Ikeja Electricity",
    "Eko Electricity",
    "Abuja Electricity",
    "Ibadan Electricity",
    "Port Harcourt Electricity",
  ];

  const handlePayNow = () => {
    alert("Processing payment...");
    setNextPage(true);
  };
  const handleConfirmPayment = () => {
    setNextPage(false);
    setShowPin(true);
  };

  const handleClose = () => {
    setIsOpen(true);
    setNextPage(false);
    setShowPin(false);
  };

  const handlePaymentSuccess = () => {
    setShowPin(false);
    setShowSuccess(true);
  };

  if (!isOpen && !nextPage && !showPin && !showSuccess) return null;

  return (
    <>
      <div
        className={`fixed  inset-0 z-50  bg-[#A7A3A3]/1   backdrop-blur-xl flex justify-center overflow-auto ${
          nextPage || showPin || showSuccess ? "hidden" : ""
        }`}
      >
        <div className="  h-[90vh] px-4  max-w-md w-full max-h-[90vh]  ">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Pay Bill</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <IoClose size={24} />
              </button>
            </div>

            <div className="p-4">
              {/* Quick Actions */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Quick actions
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {services.map((service) => {
                    return (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          selectedService === service.id
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span
                          className={`text-sm font-medium ${
                            selectedService === service.id
                              ? "text-blue-600"
                              : "text-gray-700"
                          }`}
                        >
                          {service.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedService === "electricity" && (
                <>
                  {/* Bill Type Selection */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Bill Type
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setBillType("prepaid")}
                        className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                          billType === "prepaid"
                            ? "border-blue-600 bg-blue-50 text-blue-600"
                            : "border-gray-200 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Prepaid
                      </button>
                      <button
                        onClick={() => setBillType("postpaid")}
                        className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                          billType === "postpaid"
                            ? "border-blue-600 bg-blue-50 text-blue-600"
                            : "border-gray-200 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Postpaid
                      </button>
                    </div>
                  </div>
                  {/* Provider Selection */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Select Provider
                    </label>
                    <div className="relative">
                      <select
                        value={selectedProvider}
                        onChange={(e) => setSelectedProvider(e.target.value)}
                        className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:border-blue-600 text-gray-700"
                      >
                        <option value="">Choose electricity provider</option>
                        {electricityProviders.map((provider) => (
                          <option key={provider} value={provider}>
                            {provider}
                          </option>
                        ))}
                      </select>
                      {/* <IoChevronDown
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={20}
                    /> */}
                    </div>
                  </div>
                  {/* Meter/Account Number */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Meter/ Account Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={meterNumber}
                      onChange={(e) => setMeterNumber(e.target.value)}
                      placeholder="1234567890123"
                      className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  {/* Service Address
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Service Address{" "}
                    <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={serviceAddress}
                    onChange={(e) => setServiceAddress(e.target.value)}
                    placeholder="14 D****"
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div> */}
                  {/* Amount */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Amount
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0-500,000"
                      className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 mb-2"
                    />
                    <p className="text-xs text-gray-500 mb-2">
                      Min. Purchase 50
                    </p>

                    {/* Quick Amount Buttons */}
                    <div className="grid grid-cols-4 gap-2">
                      {quickAmounts.map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setAmount(amt.toString())}
                          className="py-2 px-3 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors"
                        >
                          {amt}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedService === "internet" && (
                <div className="py-8 text-center text-gray-500">
                  {/* <FaWifi size={48} className="mx-auto mb-3 text-gray-300" /> */}
                  <p>Internet bill payment coming soon</p>
                </div>
              )}

              {selectedService === "transport" && (
                <div className="py-8 text-center text-gray-500">
                  {/* <FaBus size={48} className="mx-auto mb-3 text-gray-300" /> */}
                  <p>Transport payment coming soon</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handlePayNow}
                  disabled={!meterNumber || !amount || !selectedProvider}
                  className="flex-1 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {nextPage && (
        <PaybillRecieptModal
          isOpen={isOpen}
          selectedProvider={selectedProvider}
          meterNumber={meterNumber}
          // selectedService={selectedService}
          amount={amount}
          handleConfirmPayment={handleConfirmPayment}
          handleClose={handleClose}
        />
      )}

      {showPin && (
        <PaybillSecretePinModal
          handleClose={handleClose}
          handlePaymentSuccess={handlePaymentSuccess}
        />
      )}

      {showSuccess && <PaybillSuccessModal />}
    </>
  );
}
