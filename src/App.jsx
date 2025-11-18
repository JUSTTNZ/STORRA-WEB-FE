import { useState } from "react";
import "./styles/globals.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import CoursePage from "./pages/courses";
import SingleProductPage from "./pages/courses/single-product-page";
import SingleProductCont from "./pages/courses/single-product-cont";
import TransactionPage from "./pages/wallet";

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
            <Route
              path="/wallet"
              element={<TransactionPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
