import React from "react";
import ProfileSection from "../../components/homecomponents/ProfileSection";
import WelcomeSection from "../../components/homecomponents/WelcomeSection";
import ProgressSection from "../../components/homecomponents/ProgressSection";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <main className="w-full  p-5 overflow-x-hidden text-[#7D7F85] ">
      <div className="w-[95%] m-[auto]">
        <ProfileSection />
        <WelcomeSection />
        <ProgressSection />
        {/* <HomeGallery /> */}
        <Outlet />
      </div>

      {/* <ProgressSection /> */}
    </main>
  );
}

export default HomeLayout;
