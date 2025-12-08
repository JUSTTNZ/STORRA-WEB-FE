function Textinput({ label, placeholder }) {
  return (
    <div>
      <label className="text-[14px] text-[#222632]">{label}</label>

      <div className="border-[1.7px] border-[#DFDFDF] xl:h-9 rounded-xl px-4  flex items-center w-[100%]">
        <input
          type="text"
          name=""
          id=""
          placeholder={placeholder}
          className="text-[#7D7F85] focus:outline-none border-none w-[%]"
        />
      </div>
    </div>
  );
}

export default Textinput;
