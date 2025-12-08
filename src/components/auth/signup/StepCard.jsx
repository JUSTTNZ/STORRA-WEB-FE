function StepCard({ number, text, active }) {
  return (
    <>
      <div
        className={`flex flex-col items-start justify-between gap-2 xl:h-30 p-3 rounded-xl min-w-[120px] ${
          active ? "bg-white text-black" : "bg-[#4470FF] text-white/90"
        }`}>
        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-400 text-black font-semibold">
          {number}
        </div>
        <div className="text-sm leading-tight">{text}</div>
      </div>
    </>
  );
}

export default StepCard;
