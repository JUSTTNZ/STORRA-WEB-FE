function PregressBar({ value, max }) {
  return (
    <progress
      value={value}
      max={max}
      className="h-2  w-[95%]  [&::-webkit-progress-bar]:bg-[#ECEDF0] [&::-webkit-progress-bar]:rounded-[100px] [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-[#2D5BFF]"></progress>
  );
}

export default PregressBar;
