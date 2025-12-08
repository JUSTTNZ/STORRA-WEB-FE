import { useState } from "react";
import "./styles/globals.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
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

            {/* Other routes */}
            <Route path="/modal" element={<AirtimeModal />} />
            <Route path="/wallet" element={<TransactionPage />} />
            <Route path="/paybill" element={<PayBillPage />} />
            <Route path="/leaderboard" element={<StorraLeaderboard />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/spin" element={<Spin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
