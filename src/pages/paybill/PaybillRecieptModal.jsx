function PaybillRecieptModal({
  isOpen,

  selectedProvider,
  meterNumber,
  amount,
  handleConfirmPayment,
  handleClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-[#A7A3A3]/1 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Confirm Payment</h2>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            {/* <IoClose size={24} /> */}
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Payment Details */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Service provider</span>
              <span className="text-sm font-semibold text-gray-900">
                {selectedProvider}
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Meter Number</span>
              <span className="text-sm font-semibold text-gray-900">
                {meterNumber}
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Amount</span>
              <span className="text-sm font-semibold text-gray-900">
                ₦{parseFloat(amount).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center py-3">
              <span className="text-sm text-gray-600">Available Balance</span>
              <span className="text-sm font-semibold text-green-600">
                ₦300,000
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmPayment}
              className="flex-1 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaybillRecieptModal;
