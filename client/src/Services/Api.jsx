import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import React from 'react'
import Login from "../Containers/User/Login/Login";
import SignUp from "../Containers/User/SignUp/SignUp";
import ForgotPassword from "../Containers/User/ForgotPassword/ForgotPassword";
import Otp from "../Containers/User/Otp/Otp";
import Home from "../Containers/Home/Home";
import RecruiterSignUp from "../Containers/Recruiter/RecruiterSignup/RecruiterSignup";
import RecruiterLogin from "../Containers/Recruiter/RecruiterLogin/RecruiterLogin";
import RecruiterOtp from "../Containers/Recruiter/RecruiterOtp";
import ResetPassword from "../Containers/User/ResetPassword/ResetPassword";
import RecruiterForgotPassword from "../Containers/Recruiter/RecruiterForgotPassword/RecruiterForgotPassword";
import RecruiterResetPassword from "../Containers/Recruiter/RecruiterResetPassword";
import UserContext from "../Context/UserContext";
import Profile from "../Containers/User/Profile/Profile";
import ContactForm from "../Containers/User/Profile/ContactForm";
import Qualifications from "../Containers/User/Profile/Qualifiacations";

function Api() {
  return (
    <>
    <UserContext>

      <Router>
        <Routes>

            <Route path="/" element={<Home/>}/>
            <Route path="/employee-signup" element={<SignUp/>}/>
            <Route path="/employee-login" element={<Login/>}/>
            <Route path="/employee-verifyOtp" element={<Otp/>}/>
            <Route path="/employee-forgotPassword" element={<ForgotPassword/>}/>
            <Route path="/employee-resetPassword/:token" element={<ResetPassword/>}/>
            <Route path="/employee-profile" element={<Profile/>}/>
            <Route path="/employee-profile/editcontact" element={<ContactForm/>}/>
            <Route path="/employee-profile/qualifications" element={<Qualifications/>}/>

            


            <Route path="/recruiter-signup" element={<RecruiterSignUp/>}/>
            <Route path="/recruiter-login" element={<RecruiterLogin/>}/>
            <Route path="/recruiter-verifyOtp" element={<RecruiterOtp/>}/>
            <Route path="/recruiter-forgotPassword" element={<RecruiterForgotPassword/>}/>
            <Route path="/recruiter-resetPassword/:token" element={<RecruiterResetPassword/>}/>
        </Routes>
      </Router>
      </UserContext>
    </>
  )
}

export default Api
