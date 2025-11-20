import { useState } from "react";
import "./styles/globals.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import CoursePage from "./pages/courses";
import SingleProductPage from "./pages/courses/single-product-page";
import SingleProductCont from "./pages/courses/single-product-cont";
import TransactionPage from "./pages/wallet";
import DashboardPage from "./pages/parent-dashborad";
import MainLayoutParent from "./components/layout/MainLayoutParent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<CoursePage />} />
            <Route path="/course" element={<CoursePage />} />
            <Route path="/single-course-page" element={<SingleProductPage />} />
            <Route
              path="/single-course-page-cont"
              element={<SingleProductCont />}
            />
            <Route path="/wallet" element={<TransactionPage />} />
          </Route>

          <Route element={<MainLayoutParent />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
