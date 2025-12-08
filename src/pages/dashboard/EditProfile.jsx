import { Link, NavLink, Outlet } from "react-router";
import Textinput from "../../components/dashboard/Textinput";
const navs = [
  {
    label: "Edit profile",
    to: "/settings",
    icon: "edit.png",
  },
  {
    label: "Preference",
    to: "/settings/preference",
    icon: "preference.png",
  },
  {
    label: "KYC Wallet",
    to: "/settings/",
    icon: "kyc.png",
  },
  {
    label: "Change Password",
    to: "/settings/",
    icon: "changepw.png",
  },
  {
    label: "Delete Account",
    to: "/settings/",
    icon: "delete.png",
  },
];
function EditProfile() {
  return (
    <div className="p-6 overflow-x-hidden grid bg-gray-100">
      <div className="text-[32px] font-bold  text-[#131313] bg-gray-100">
        Setting
      </div>
      <div className="min-h-[92%] grid grid-cols-14 bg-white">
        <div className="col-span-4 xl:col-span-3 border-r border-[#DFDFDF] p-4 fix flex flex-col gap-2">
          {navs?.map((item, i) => {
            return (
              <NavLink
                key={i}
                to={`${item.to}`}
                className="flex sticky gap-4 text-[#5A5F6B] hover:bg-gray-100   p-3 w-full rounded-md">
                <img
                  src={`/src/assets/icons/dashboard/${item.icon}`}
                  alt="ros"
                  className="text-[#5A5F6B] w-6 h-6 hover:text-white"
                />
                <span className="text-[16px]">{item?.label}</span>
              </NavLink>
            );
          })}
        </div>
        <div className="col-span-10 xl:col-span-11 p-6 min-h-[75vh]  overflow-x-hidden ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
