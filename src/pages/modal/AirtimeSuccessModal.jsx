import React from "react";

function AirtimeSuccessModal({
  phoneNumber,
  getFinalAmount,
  availableBalance,

  //   handleClosePinModal,
  //   handleConfirmPayment,
  //   setShowConfirmModal,
  handleCloseSuccessModal,
  setShowConfirmModal,
  setSecretePinModal,
  showConfirmModal,
  secretePinModal,
}) {
  const handlePinModal = () => {
    setShowConfirmModal(false);
    setSecretePinModal(true);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-[#A7A3A3]/1 backdrop-blur-[24px] border-2 border-blue-500   flex items-center justify-center p-4 z-[60] ${
          showConfirmModal ? "" : "hidden "
        }`}
      >
        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
          {/* Amount Display */}
          <div className="text-center p-8 border-b">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl font-bold text-blue-600">₦</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              {getFinalAmount().toLocaleString()}
            </h2>
          </div>

          {/* Transaction Details */}
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Product Name</span>
              <span className="font-semibold text-gray-900">Airtime</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600 font-medium">
                Recipient Number
              </span>
              <span className="font-semibold text-gray-900">{phoneNumber}</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Amount</span>
              <span className="font-semibold text-gray-900">
                {getFinalAmount().toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600 font-medium">
                Available Balance
              </span>
              <span className="font-semibold text-green-600">
                {availableBalance.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 p-6 bg-gray-50 border-t">
            <button
              onClick={handlePinModal}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-sm"
            >
              Pay
            </button>
            <button
              onClick={handleCloseSuccessModal}
              className="flex-1 bg-white hover:bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg transition-colors shadow-sm border-2 border-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AirtimeSuccessModal;
