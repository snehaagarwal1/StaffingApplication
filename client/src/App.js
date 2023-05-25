import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Homepage from "./components/Homepage";
import Jobs from "./components/Jobs";
import Job from "./components/Job";
import About from "./components/About";
import Employers from "./components/Employers";
import Employer from "./components/Employer";
import ForgotPassword from "./components/Auth/ForgotPassword";
import PasswordReset from "./components/Auth/PasswordReset";
import Auth from "./components/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "@mui/styles";
import axios from "axios";
import { login, logout } from "./redux/actionCreators";
import { useDispatch } from "react-redux";
import Profile from "./components/Profile";
import PageNotFound from "./PageNotFound";
import { base_URL } from "./constants";

const App = () => {
  const dispatch = useDispatch();
  const [token] = useState(localStorage.getItem("joblookupLoginToken"));

  const checkIfLoggedIn = async () => {
    try {
      const response = await axios.post(
        base_URL + "/api/auth",
        null,
        {
          headers: {
            contentType: "application/json",
            authorization: token,
          },
        }
      );
      dispatch(login(response.data.user));
      // console.log(response.data.user);
    } catch (error) {
      dispatch(logout());
      if (error.response) {
        console.log(error.response);
      } else {
        console.log("Server error.");
      }
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, [token]);

  const theme = useTheme();

  console.log(theme);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:id" element={<Job />} />
        <Route path="employers" element={<Employers />} />
        <Route path="employers/:id" element={<Employer />} />

        <Route path="*" element={<PageNotFound />} />

        <Route path="about" element={<About />} />
        <Route path="auth" element={<Auth />} />
        <Route path="auth/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="auth/resetPassword/:resetToken"
          element={<PasswordReset />}
        />
        <Route path="profile/:id" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
