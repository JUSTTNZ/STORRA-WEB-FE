import { useState } from "react";
import { HiX } from "react-icons/hi";
import { airtimeData, amounts } from "../../data/airtime";
import { Link } from "react-router-dom";
import AirtimeSuccessModal from "./AirtimeSuccessModal";
import SecretePinModal from "./PinModal";

export default function AirtimeModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [secretePinModal, setSecretePinModal] = useState(false);
  // const networks = ["MTN", "GLO", "Airtel", "9Mobile"];
  // const amounts = [50, 100, 200, 500, 1000, 1500, 2000, 2500];

  const availableBalance = 300000;

  const getFinalAmount = () => {
    return customAmount ? Number(customAmount) : selectedAmount;
  };

  const handlePayNow = () => {
    if (
      !selectedNetwork ||
      !phoneNumber ||
      (!selectedAmount && !customAmount)
    ) {
      alert("Please fill in all required fields");
      return;
    }
    setShowConfirmModal(true);
  };
  const handleConfirmPayment = () => {
    const amount = getFinalAmount();
    alert(
      `Processing ₦${amount} airtime for ${phoneNumber} on ${selectedNetwork.title}`
    );
    setShowConfirmModal(false);
    setIsOpen(false);
  };

  const handleCloseSuccessModal = () => {
    setShowConfirmModal(false);
    setIsOpen(true);
  };

  // const handleClosePinModal = () => {
  //   setShowConfirmModal(false);
  //   setSecretePinModal(true);
  //   // setIsOpen(true);
  // };

  // const openSecretePinModal = () => {
  //   setShowConfirmModal(false); // close airtime success modal
  //   // setIsOpen(false); // close airtime modal
  //   setSecretePinModal(true); // open pin modal
  // };

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-[#A7A3A3]/1    backdrop-blur-[24px] flex  justify-center p-4 z-50 overflow-auto ${
          showConfirmModal || secretePinModal ? "hidden " : " "
        } `}
      >
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full flex flex-col justify-between h-fit md:h-[fit-content] animate-[fadeIn_0.3s_ease-out]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Buy Airtime</h2>
              <p className="text-sm text-gray-500 mt-1">
                Top up your phone or send airtime to others
              </p>
            </div>
            <Link to="/wallet">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <HiX size={24} />
              </button>
            </Link>
          </div>

          {/* Content */}
          <div className="p-2 space-y-6">
            {/* Network Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Network
              </label>
              <div className="grid grid-cols-4 gap-3">
                {airtimeData.map((network, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedNetwork(network.title)}
                    className={`py-3 px-2 rounded-lg border-2 font-semibold text-sm transition-all ${
                      selectedNetwork === network.title
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    <img
                      src={`/src/assets/images/airtime/${network.image}`}
                      alt={index}
                      className="w-8 h-8 mb-2 mx-auto"
                    />
                    {network.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">(Optional)</p>
            </div>

            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Top Up
              </label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {amounts.map((amount, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedAmount(amount.amount);
                      setCustomAmount(amount.amount.toString());
                    }}
                    className={`py-2 px-3 rounded-lg border-2 font-medium text-sm transition-all ${
                      selectedAmount === amount.title
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    {amount.amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mt-3">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount("");
                  }}
                  placeholder="0 - 500,000"
                  min="0"
                  max="500000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter custom amount (0 - 500,000)
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col justify-between gap-2 p-2  ">
              <button
                onClick={handlePayNow}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm"
              >
                Pay Now
              </button>
              <Link to="/wallet">
                <button
                  className="w-full  hover:border-2 hover:border-blue-600  bg-white hover:bg-gray-100 text-gray-700 border-2 border-gray-300 font-semibold py-3 px-6 rounded-lg transition-colors  shadow-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </Link>
            </div>
            {/* FOOTER */}
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <AirtimeSuccessModal
          phoneNumber={phoneNumber}
          availableBalance={availableBalance}
          network={selectedNetwork}
          getFinalAmount={getFinalAmount}
          // setShowConfirmModal={() => setShowConfirmModal(false)}
          handleConfirmPayment={handleConfirmPayment}
          handleCloseSuccessModal={handleCloseSuccessModal}
          setShowConfirmModal={setShowConfirmModal}
          setSecretePinModal={setSecretePinModal}
          showConfirmModal={showConfirmModal}
          secretePinModal={secretePinModal}
        />
      )}

      {/* PIN Modal - Separate from AirtimeSuccessModal */}
      {secretePinModal && (
        <SecretePinModal
          setSecretePinModal={setSecretePinModal}
          setShowConfirmModal={setShowConfirmModal}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
}
