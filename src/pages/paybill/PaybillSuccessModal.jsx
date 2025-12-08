import { FiCheckCircle, FiCopy, FiX } from "react-icons/fi";

import { useState } from "react";
import { Link } from "react-router-dom";

export default function PaybillSuccessModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const token = "1587-9758-8582-0472-1587";

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#A7A3A3]/1 backdrop-blur-[24px] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-[fadeIn_0.3s_ease-out]">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FiX size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <FiCheckCircle className="text-green-600" size={32} />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Successful!</h2>

          <p className="text-gray-600 mb-6">
            Your token has been generated successfully.
          </p>

          <div className="w-full bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-500 mb-2 font-medium">Your Token</p>
            <div className="flex items-center justify-between gap-2">
              <code className="text-sm font-mono text-gray-900 break-all">
                {token}
              </code>
              <button
                onClick={handleCopy}
                className="flex-shrink-0 p-2 hover:bg-gray-200 rounded transition-colors"
                title="Copy token"
              >
                <FiCopy size={16} className="text-gray-600" />
              </button>
            </div>
            {copied && (
              <p className="text-xs text-green-600 mt-2">
                Copied to clipboard!
              </p>
            )}
          </div>
          <Link to="/">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              Proceed to Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
