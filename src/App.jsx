import "./styles/globals.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import CoursePage from "./pages/courses";
import SingleProductPage from "./pages/courses/single-product-page";
import SingleProductCont from "./pages/courses/single-product-cont";
import TransactionPage from "./pages/wallet";
import Login from "./pages/auth/Login/Login";
import SignupDefault from "./pages/auth/Signup/SignupDefault";
import Overview from "./pages/dashboard/Overview";
import EditProfile from "./pages/dashboard/EditProfile";
import Newest from "./pages/dashboard/Newest";
import Edit from "./pages/dashboard/Edit";
import Preferences from "./pages/dashboard/Preferences";
import Personalization from "./pages/auth/Signup/Personalization";
import Personalization1 from "./pages/auth/Signup/Personalization1";
import Rewards from "./pages/Rewards";
import Dash from "./pages/dashboard/Dash";
import CreateAccount from "./pages/auth/Signup/CreateAccount";
import Personalization2 from "./pages/auth/Signup/Personalization2";
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

            <Route path="dashboard" element={<EditProfile />}>
              <Route path="preference" element={<Preferences />} />
              <Route path="edit" element={<Edit />} />
            </Route>
            <Route path="/personalization" element={<Personalization />} />
            <Route path="/personalization1" element={<Personalization1 />} />
            <Route path="/personalization2" element={<Personalization2 />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/dash" element={<Dash />} />
          </Route>

          {/* /////? */}

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupDefault />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
