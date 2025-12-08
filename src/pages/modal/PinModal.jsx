import React from "react";
import { useState } from "react";
import SuccessModal from "./SuccessModal";

function SecretePinModal({
  // setIsOpen,
  setShowConfirmModal,
  setSecretePinModal,
}) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleNewPin = (e, index) => {
    const value = e.target.value;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value.length === 1 && index < 3) {
      document.getElementById(`pin-${index + 1}`).focus();
    }
  };

  const confirmPayment = () => {
    const fullPin = pin.join("");
    if (fullPin.length === 4) {
      alert(`Processing payment with PIN: ${fullPin}`);
      // setSecretePinModal(false);
      setShowSuccessModal(true);
      // setIsOpen(true);
    } else {
      alert("please enter complete 4-digit PIN");
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-[#A7A3A3]/1 backdrop-blur-[24px] flex items-center justify-center p-4 z-[70] ${
          !setShowSuccessModal ? "hidden" : ""
        }`}
      >
        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Enter Transaction PIN
          </h2>

          <p className="text-gray-600 text-center mb-8">
            Please enter your 4-digit PIN to complete this transaction
          </p>

          {/* PIN Input Fields */}
          <div className="flex justify-center gap-4 mb-8">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                id={`pin-${index}`}
                type="password"
                maxLength="1"
                value={pin[index]}
                className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                autoFocus={index === 0}
                onChange={(e) => handleNewPin(e, index)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Backspace" &&
                    e.target.value === "" &&
                    index > 0
                  ) {
                    document.getElementById(`pin-${index - 1}`).focus();
                  }
                }}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={confirmPayment}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-sm"
            >
              Confirm Payment
            </button>
            <button
              onClick={() => {
                setSecretePinModal(false);
                setShowConfirmModal(true);
              }}
              className="flex-1 bg-white hover:bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg transition-colors shadow-sm border-2 border-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && <SuccessModal />}
    </>
  );
}

export default SecretePinModal;
