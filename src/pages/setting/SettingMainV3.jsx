// import React, { useState } from "react";
// import {
//   FaBars as Menu,
//   FaTimes as X,
//   FaUser as User,
//   FaBell as Bell,
//   FaCog as Settings,
//   FaSignOutAlt as LogOut,
//   FaHome as Home,
//   FaFolderOpen as FolderKanban,
// } from "react-icons/fa";

// function SettingMain() {
//   const [location, setLocation] = useState(
//     "UTC+0:00 Western European Time (Portugal)"
//   );
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <section className="w-full min-h-screen bg-gray-50 overflow-hidden">
//       {/* Header with Hamburger */}
//       <div className="sticky top-0 z-50 bg-white shadow-sm">
//         <div className="flex items-center justify-between px-4 py-3 md:px-6">
//           <button
//             onClick={toggleMenu}
//             className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//           <h1 className="text-lg font-bold text-gray-800 md:text-xl">
//             Settings
//           </h1>
//           <div className="w-8 lg:hidden"></div>
//         </div>
//       </div>

//       {/* Mobile Sidebar Overlay */}
//       {isMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={toggleMenu}
//         ></div>
//       )}

//       {/* Sidebar Navigation */}
//       <aside
//         className={`fixed top-0 left-0 h-full w-full sm:w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 lg:hidden overflow-y-auto ${
//           isMenuOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="p-4">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-xl font-bold text-gray-800">Menu</h2>
//             <button
//               onClick={toggleMenu}
//               className="p-2 hover:bg-gray-100 rounded-lg"
//             >
//               <X size={20} />
//             </button>
//           </div>
//           <nav className="space-y-2">
//             <a
//               href="#"
//               className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <Home size={20} />
//               <span>Dashboard</span>
//             </a>
//             <a
//               href="#"
//               className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <FolderKanban size={20} />
//               <span>Projects</span>
//             </a>
//             <a
//               href="#"
//               className="flex items-center gap-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg transition-colors"
//             >
//               <Settings size={20} />
//               <span>Settings</span>
//             </a>
//             <a
//               href="#"
//               className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <Bell size={20} />
//               <span>Notifications</span>
//             </a>
//             <a
//               href="#"
//               className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//             >
//               <LogOut size={20} />
//               <span>Logout</span>
//             </a>
//           </nav>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="w-full h-[calc(100vh-60px)] overflow-y-auto px-0 md:px-4 py-4 md:py-6">
//         {/* Header */}
//         <header className="mb-6 px-4 md:px-0">
//           <h1 className="font-bold text-xl md:text-2xl text-gray-800">
//             Project Management
//           </h1>
//           <p className="font-medium text-sm md:text-base text-gray-600 mt-1">
//             Manage your personal information and account details
//           </p>
//         </header>

//         {/* Main Content Grid */}
//         <div className="bg-white border-0 md:border md:border-gray-200 md:rounded-lg p-4 md:p-6 md:shadow-sm">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
//             {/* Profile Information Section */}
//             <div className="space-y-4 lg:border-r lg:border-gray-300 lg:pr-8">
//               <h2 className="font-semibold text-lg text-gray-800 mb-4">
//                 Profile Information
//               </h2>

//               {/* Full Name */}
//               <div className="border-b border-gray-200 pb-4">
//                 <label className="block text-xs font-mono text-gray-500 mb-2">
//                   Full Name
//                 </label>
//                 <div className="flex items-center justify-between gap-4">
//                   <span className="font-medium text-sm md:text-base text-gray-700">
//                     Alex Johnson
//                   </span>
//                   <button className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-50 transition-colors whitespace-nowrap">
//                     Edit
//                   </button>
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="border-b border-gray-200 pb-4">
//                 <label className="block text-xs font-mono text-gray-500 mb-2">
//                   Email Address
//                 </label>
//                 <div className="flex items-center justify-between gap-4">
//                   <span className="font-medium text-sm md:text-base text-gray-700 truncate">
//                     Alexjohnson@gmail.com
//                   </span>
//                   <button className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-50 transition-colors whitespace-nowrap">
//                     Edit
//                   </button>
//                 </div>
//               </div>

//               {/* Phone */}
//               <div className="border-b border-gray-200 pb-4">
//                 <label className="block text-xs font-mono text-gray-500 mb-2">
//                   Phone Number
//                 </label>
//                 <div className="flex items-center justify-between gap-4">
//                   <span className="font-medium text-sm md:text-base text-gray-700">
//                     +1 555-0123
//                   </span>
//                   <button className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-50 transition-colors whitespace-nowrap">
//                     Edit
//                   </button>
//                 </div>
//               </div>

//               {/* Password */}
//               <div className="pb-4">
//                 <label className="block text-xs font-mono text-gray-500 mb-2">
//                   Password
//                 </label>
//                 <div className="flex items-center justify-between gap-4 mb-2">
//                   <span className="font-medium text-sm md:text-base text-gray-700">
//                     ************
//                   </span>
//                 </div>
//                 <button className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-50 transition-colors mt-2">
//                   Change Password
//                 </button>
//               </div>
//             </div>

//             {/* Profile Picture & Time Zone Section */}
//             <div className="space-y-6">
//               {/* Profile Picture */}
//               <div>
//                 <h2 className="font-semibold text-lg text-gray-800 mb-4">
//                   Profile Picture
//                 </h2>
//                 <div className="flex flex-col sm:flex-row items-center gap-4 border border-gray-200 p-4 rounded-lg">
//                   <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
//                     <User size={48} className="text-gray-500" />
//                   </div>
//                   <button className="border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-50 transition-colors w-full sm:w-auto">
//                     Upload New Picture
//                   </button>
//                 </div>
//               </div>

//               {/* Time Zone */}
//               <div>
//                 <h2 className="font-semibold text-lg text-gray-800 mb-4">
//                   Time Zone
//                 </h2>
//                 <label className="block font-medium text-sm text-gray-700 mb-2">
//                   Select Time Zone
//                 </label>
//                 <select
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                 >
//                   <option>UTC-5:00 Eastern Time (US & Canada)</option>
//                   <option>UTC+1:00 West Africa Time (Nigeria)</option>
//                   <option>UTC-3:00 Argentina Time (Argentina)</option>
//                   <option>UTC+0:00 Western European Time (Portugal)</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Footer Actions */}
//           <footer className="border-t border-gray-200 mt-8 pt-6">
//             <h3 className="font-semibold text-lg text-gray-800 mb-4">
//               Account Actions
//             </h3>
//             <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
//               <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto">
//                 Save Changes
//               </button>
//               <button className="text-red-600 hover:text-red-700 font-medium transition-colors">
//                 Delete Account
//               </button>
//             </div>
//           </footer>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default SettingMain;
