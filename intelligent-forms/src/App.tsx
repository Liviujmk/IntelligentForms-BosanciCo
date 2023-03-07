import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import { Route, Routes} from "react-router-dom"

import RequireAuth from './features/auth/RequireAuth'
import { Login } from './pages/login'

function App() {

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/signup" element={<div>Signup</div>} />
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<div>Dashboard</div>} >
              <Route index element={<div>Dashboard</div>} />
              <Route path="/forms">
                <Route index element={<div>Forms</div>} />
                <Route path="/:formId" element={<div>Form</div>} />
                <Route path="/:formId/submissions" element={<div>Submissions</div>} />
                <Route path="/:formId/submissions/:submissionId" element={<div>Submission</div>} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </div>
    </>
  )
}

export default App
