import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../pages/HomePage.js";
import Dashboard from "../pages/Dashboard.js";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("bloodbank_token");
    if (storedToken) setToken(storedToken);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Auth page for admin login/signup */}
        <Route
          path="/"
          element={
            !token ? <HomePage setToken={setToken} /> : <Navigate to="/dashboard" />
          }
        />

        {/* Dashboard page accessible only if logged in */}
        <Route
          path="/dashboard"
          element={
            token ? <Dashboard /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
