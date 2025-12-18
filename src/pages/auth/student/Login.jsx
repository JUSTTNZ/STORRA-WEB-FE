import { AiFillApple } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import swipeImg from "../../../assets/images/auth/swipe2.png";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl bg-white rounded-xl overflow-hidden shadow-lg">

        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* FORM - Full width on mobile/tablet, half on large screens */}
          <div className="p-6 sm:p-8 md:p-10 lg:p-12">

            {/* IMAGE WITH STEPS - Shows on tablet (md) only, above Student Account */}
            <div className="hidden md:block lg:hidden bg-blue-600 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-6">
                {/* Steps on the left */}
                <div className="flex-shrink-0 space-y-3">
                  <Step number="1" text="Create an account type" active />
                  <Step number="2" text="Provide your details" />
                  <Step number="3" text="Start learning and earning" />
                </div>

                {/* Image on the right */}
                <div className="flex-1 flex items-center justify-center">
                  <img
                    src={swipeImg}
                    alt="Learning illustration"
                    className="w-full max-w-sm"
                  />
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-6">
              Student Account
            </h2>

            <div className="space-y-4">
              <Input label="Full Name" placeholder="e.g Joe Rayo" />
              <div>
                <Input label="Email" placeholder="e.g storra@gmail.com" />
                <p className="text-sm text-blue-600 mt-1 cursor-pointer">
                  Use Phone Number Instead
                </p>
              </div>
              <Input label="Password" type="password" placeholder="e.g *****" />
              <Input label="Confirm Password" type="password" placeholder="e.g *****" />

              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                <span>
                  I hereby agree to the{" "}
                  <span className="text-blue-600 cursor-pointer">
                    Terms & Conditions.
                  </span>
                </span>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
                Create My Account
              </button>

              <div className="flex items-center gap-3 text-sm text-gray-400 my-4">
                <div className="flex-1 h-px bg-gray-200" />
                Or Sign Up with
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="flex gap-3">
                <SocialButton
                  icon="https://www.svgrepo.com/show/475656/google-color.svg"
                  label="Google"
                />
                <SocialButton
                  icon={<AiFillApple />}
                  label="Apple"
                />
              </div>

              <p className="text-center text-sm mt-4">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate('/auth/student/register')}
                  className="text-blue-600 cursor-pointer font-medium"
                >
                  Register
                </span>
              </p>
            </div>
          </div>

          {/* IMAGE - Visible only on lg screens and above (right side) */}
          <div className="hidden lg:flex bg-blue-600 rounded-r-xl p-8 flex-col justify-center items-center">
            <div className="w-full max-w-md">
              <img
                src={swipeImg}
                alt="Learning illustration"
                className="w-full h-auto mb-8"
              />

              <div className="grid grid-cols-3 gap-3">
                <Step number="1" text="Create an account type" active />
                <Step number="2" text="Provide your details" />
                <Step number="3" text="Start learning and earning" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Input({ label, type = "text", placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}

function SocialButton({ icon, label }) {
  return (
    <button className="flex-1 border border-gray-300 rounded-lg py-2.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
      {typeof icon === 'string' ? (
        <img src={icon} className="w-5 h-5" alt={label} />
      ) : (
        <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
      )}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function Step({ number, text, active }) {
  return (
    <div
      className={`rounded-lg p-3 text-sm ${active ? "bg-white text-black" : "bg-blue-500/50 text-white"
        }`}
    >
      <div className="w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center mb-2 font-bold text-sm">
        {number}
      </div>
      <p className="text-xs leading-tight">{text}</p>
    </div>
  );
}