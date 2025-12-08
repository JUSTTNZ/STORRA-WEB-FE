import "./styles/globals.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Student Layout + Pages
import MainLayout from "./components/layout/MainLayout";
import CoursePage from "./pages/courses";
import SingleProductPage from "./pages/courses/single-product-page";
import SingleProductCont from "./pages/courses/single-product-cont";
import TransactionPage from "./pages/wallet";
import AirtimeModal from "./pages/modal/AirtimeModal";
import HomeLayout from "./pages/home/HomeLayout";
import HomeGallery from "./components/homecomponents/HomeGallery";
import Mathematics from "./components/homecomponents/Mathematics";
import English from "./components/homecomponents/English";
import BasicScience from "./components/homecomponents/BasicScience";
import Crs from "./components/homecomponents/Crs";
import SocialStudies from "./components/homecomponents/SocialStudies";
import CivicEducation from "./components/homecomponents/CivicEducation";
import PayBillPage from "./pages/paybill/PayBillPage";
import StorraLeaderboard from "./pages/leaderboard/StorraLeaderboard";
import Setting from "./pages/setting/Setting";
import Spin from "./pages/spin_the_wheel/Spin";

// Parent Layout + Pages
import DashboardPage from "./pages/parent-dashborad";
import MainLayoutParent from "./components/layout/MainLayoutParent";
import EditProfile from "./pages/dashboard/EditProfile";
import Edit from "./pages/dashboard/Edit";
import Preferences from "./pages/dashboard/Preferences";
import Personalization from "./pages/auth/Signup/Personalization";
import Personalization1 from "./pages/auth/Signup/Personalization1";
import Personalization2 from "./pages/auth/Signup/Personalization2";
import Rewards from "./pages/Rewards";
import Dash from "./pages/dashboard/Dash";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* STUDENT SECTION */}
          <Route element={<MainLayout />}>
            {/* Redirect root to subjects */}
            <Route index element={<Navigate to="/subjects/maths" replace />} />

            {/* Subjects routes */}
            <Route path="subjects" element={<HomeLayout />}>
              <Route element={<HomeGallery />}>
                <Route index element={<Navigate to="maths" replace />} />
                <Route path="maths" element={<Mathematics />} />
                <Route path="english" element={<English />} />
                <Route path="basic" element={<BasicScience />} />
                <Route path="civic" element={<CivicEducation />} />
                <Route path="crs" element={<Crs />} />
                <Route path="social" element={<SocialStudies />} />
              </Route>
            </Route>

            {/* Course routes */}
            <Route path="/course" element={<CoursePage />} />
            <Route path="/single-course-page" element={<SingleProductPage />} />
            <Route
              path="/single-course-page-cont"
              element={<SingleProductCont />}
            />

            {/* Additional Student Features */}
            <Route path="/modal" element={<AirtimeModal />} />
            <Route path="/wallet" element={<TransactionPage />} />
            <Route path="/paybill" element={<PayBillPage />} />
            <Route path="/leaderboard" element={<StorraLeaderboard />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/spin" element={<Spin />} />
            <Route path="/reward" element={<Rewards />} />
            <Route path="/dash" element={<Dash />} />
          </Route>

          {/* PARENT SECTION */}
          <Route element={<MainLayoutParent />}>
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/settings" element={<EditProfile />}>
              <Route path="/settings/preference" element={<Preferences />} />
              <Route path="/settings/edit" element={<Edit />} />
            </Route>

            <Route path="/personalization" element={<Personalization />} />
            <Route path="/personalization1" element={<Personalization1 />} />
            <Route path="/personalization2" element={<Personalization2 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
