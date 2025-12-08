import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";

function HomeGallery() {
  const location = useLocation();
  //   console.log("Current pathname:", location.pathname);

  const tabs = [
    { name: "Mathematics", path: "maths", count: 5 },
    { name: "English", path: "english", count: 4 },
    { name: "Basic Science", path: "basic" },
    { name: "Civic", path: "civic" },
    { name: "Crs", path: "crs" },
    { name: "Social Studies", path: "social" },
  ];

  return (
    <div className="w-full p-5 text-[#7D7F85] overflow-x-hidden">
      <h1 className="text-black mb-2 font-bold text-[32px]">Subjects</h1>

      <nav aria-label="Subject navigation " className="relative w-full mb-8">
        <div className="overflow-x-auto scrollbar-hide ">
          <ul className="flex items-center justify-between  min-w-full gap-3 p-1 rounded-md bg-[#F4F5F8]  mb-8 min-w-full md:min-w-0">
            {tabs?.map((tab) => (
              <li key={tab.path} className="flex-shrink-0">
                <NavLink
                  to={`/subjects/${tab.path}`}
                  className={({ isActive }) =>
                    `cursor-pointer px-3 py-2 rounded-md transition-all duration-200 whitespace-nowrap select-none inline-block ${
                      isActive
                        ? "text-[#2D5BFF] bg-white shadow-sm font-medium"
                        : "text-[#7D7F85] hover:text-[#2D5BFF] hover:bg-white/50"
                    }`
                  }
                >
                  {tab.name} {tab.count && `(${tab.count})`}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden" />
      </nav>

      <Outlet />
    </div>
  );
}

export default HomeGallery;
