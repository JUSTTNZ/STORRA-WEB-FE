function SignupOption({ src, description }) {
  return (
    <div className="py-1 text-[#5A5F6B] font-medium text-[16px] cursor-pointer border-[#ECEDF0] bg-white flex items-center gap-1 justify-center min-w-fit h-8">
      <img src={src} alt="icon" className="w-4 h-4" />
      {description}
    </div>
  );
}

export default SignupOption;
