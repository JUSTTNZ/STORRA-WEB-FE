import { useState } from "react";

export default function Interest({ interestOptions }) {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {interestOptions.map((item) => {
        const isActive = selected.includes(item.id);

        return (
          <button
            key={item.id}
            onClick={() => toggleSelect(item.id)}
            className={`px-2 py-1 rounded-[1px] border flex items-center gap-1.5 text-sm transition
              ${
                isActive
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              }
            `}>
            {item.src && <img src={item.src} alt="icon" className="w-4 h-4" />}

            {item.label}
          </button>
        );
      })}
    </div>
  );
}
