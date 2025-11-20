import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import LeftSideBarParent from "../common/LeftSideBarParent";

const MainLayoutParent = () => {
  return (
    <div className="w-screen h-screen flex">
      <LeftSideBarParent />
      <div className="flex flex-col w-full lg:w-[83%]">
        <Navbar parentBg/>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayoutParent;
