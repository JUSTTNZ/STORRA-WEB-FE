import swipeImg from "../../../assets/images/auth/swipe2.png";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white rounded-xl overflow-hidden shadow-lg">

        {/* IMAGE (md only above form, lg moves to right) */}
        <div className="block lg:hidden bg-blue-600 p-6">
          <img
            src={swipeImg}
            alt="Learning illustration"
            className="max-w-sm mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* FORM */}
          <div className="p-6 sm:p-8 md:p-10">
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
                    Terms & Conditions
                  </span>
                </span>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium">
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
                  icon="https://www.svgrepo.com/show/303128/apple-logo.svg"
                  label="Apple"
                />
              </div>

              <p className="text-center text-sm mt-4">
                Already have an account?{" "}
                <span className="text-blue-600 cursor-pointer">
                  Login
                </span>
              </p>
            </div>
          </div>

          {/* IMAGE RIGHT (lg only) */}
          <div className="hidden lg:flex bg-blue-600 p-8 text-white flex-col justify-between">
            <img
              src={swipeImg}
              alt="Learning illustration"
              className="max-w-md mx-auto"
            />

            <div className="grid grid-cols-3 gap-4 mt-8">
              <Step number="1" text="Create an account type" active />
              <Step number="2" text="Provide your details" />
              <Step number="3" text="Start learning and earning" />
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
      <label className="block text-sm mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function SocialButton({ icon, label }) {
  return (
    <button className="flex-1 border border-gray-300 rounded-md py-2 flex items-center justify-center gap-2">
      <img src={icon} className="w-5" />
      {label}
    </button>
  );
}

function Step({ number, text, active }) {
  return (
    <div
      className={`rounded-lg p-4 text-sm ${
        active ? "bg-white text-blue-600" : "bg-blue-500 text-white"
      }`}
    >
      <div className="w-6 h-6 rounded-full bg-yellow-400 text-blue-800 flex items-center justify-center mb-2 font-semibold">
        {number}
      </div>
      {text}
    </div>
  );
}
