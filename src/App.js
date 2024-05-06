import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import SignIn from "./pages/signin/Signin";
import SignUp from "./pages/signup/Signup";
import VerifyEmail from "./pages/verify-email";
import ProfileBuilder from "./pages/profile-builder";
import Home from "./pages/dashboard/Home";
import TopMatches from "./pages/dashboard/Top-Matches";
import Applications from "./pages/dashboard/Applications";
import Documents from "./pages/dashboard/Documents";


export function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/verify-email" element={<VerifyEmail />} />
          <Route exact path="/profile" element={<ProfileBuilder />} />
          <Route exact path="/dashboard-home" element={<Home />} />
          <Route exact path="/dashboard-matches" element={<TopMatches />} />
          <Route exact path="/dashboard-applications" element={<Applications />} />
          <Route exact path="/dashboard-documents" element={<Documents />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
