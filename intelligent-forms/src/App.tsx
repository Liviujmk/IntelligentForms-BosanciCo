import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import { startServer } from "./config/api";

import RequireAuth from "./features/auth/RequireAuth";
import { Login } from "./pages/login.page";
import { Signup } from "./pages/signup.page";
import { HomePage } from "./pages/home.page";
import { DashboardPage } from "./pages/dashboard.page";
import { FormsPage } from "./features/forms/components/forms.page";
import { FillForm } from "./features/fill-form/components/fillForm";
import { SubmissionsPage } from "./pages/submissions.page";
import { PricingPage } from "./pages/pricing.page";
import { CreateForm } from './features/forms/components/create-form/create-form'

function App() {
  startServer();
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<div>About</div>} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="fill/:formId" element={<FillForm />} />
          <Route element={<RequireAuth />}>
            <Route path="dashboard">
              <Route index element={<DashboardPage />} />
              <Route path="forms">
                <Route index element={<FormsPage />} />
                <Route path="create" element={<CreateForm />} />
                <Route path=":formId" element={<div>Form</div>} />
                <Route
                  path=":formId/submissions"
                  element={<SubmissionsPage />}
                />
                <Route
                  path=":formId/submissions/:submissionId"
                  element={<div>Submission</div>}
                />
              </Route>
              <Route path="pricing" element={<PricingPage />} />
            </Route>
          </Route>
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
