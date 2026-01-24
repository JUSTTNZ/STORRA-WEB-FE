import { Outlet } from 'react-router-dom';
import LeftSideBar from '../common/LeftSideBar';
import Navbar from '../common/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-secondary-0 flex">
      {/* Sidebar */}
      <LeftSideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
