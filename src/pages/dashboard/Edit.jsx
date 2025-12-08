import Textinput from "../../components/dashboard/Textinput";

function Edit() {
  return (
    <div className="flex flex-col">
      <h1 className="text-[26px] font-bold">My Profile</h1>
      <div
        className="flex
             gap-10 my-4">
        <img
          src="/src/assets/images/auth/profilepic.jpg"
          alt="profile photo"
          className="w-16 h-16 rounded-4xl cursor-pointer"
        />
        <div>
          <div className="flex  items-center gap-3">
            <div className="text-white rounded-4xl cursor-pointer flex items-center py-2.5 px-4 bg-[#2D5BFF]">
              {" "}
              Upload photo
            </div>
            <div className="rounded-4xl flex items-center cursor-pointer px-4 border-2 py-2.5 ">
              {" "}
              Remove photo
            </div>
          </div>
          <p className="font-medium text-[14px] text-[#7D7F85]">
            We support PNG or Jpeg at least 2MB
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Textinput label={"First Name"} placeholder={"Jeminah"} />
        <Textinput label={"Surname"} placeholder={"Bature"} />
        <Textinput label={"Surname"} placeholder={"Bature"} />

        <Textinput label={"Phone Number"} placeholder={"+2349123456789"} />
        <div className="flex items-center justify-end  gap-6">
          <div className="text-[#222632] px-6 rounded-4xl border border-[#D1D2D5] py-2.5 cursor-pointer">
            cancel
          </div>
          <div className="bg-[#2D5BFF] rounded-4xl text-white py-2.5 px-7 cursor-pointer">
            save changes
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
