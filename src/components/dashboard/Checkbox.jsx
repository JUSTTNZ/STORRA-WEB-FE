import "/src/assets/icons/dashboard/check.svg";

export default function Checkbox({ checked, value, onChange }) {
  return (
    <label className="flex items-center cursor-pointer relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        value={value}
        className="peer sr-only"
      />

      {/* Circle */}
      <span
        className="
          w-4 h-4 rounded-full border border-gray-50 
          flex items-center justify-center
          transition-all duration-200 ease-in-out
          peer-checked:bg-blue-500 peer-checked:border-blue-500
          peer-checked:shadow-md
        ">
        {/* Check Icon */}
        <svg
          className="
            w-3 h-3 text-white opacity-100 
            peer-checked:opacity-0 transition-opacity duration-150
          "
          fill="none"
          stroke="white"
          strokeWidth="3"
          viewBox="0 0 24 24">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
    </label>
  );
}
