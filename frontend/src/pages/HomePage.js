import AdminSignUp from "../forms/AdminSignUp.js";
import AdminSignIn from "../forms/AdminSignIn.js";
import Header from "../components/Header.js";
import { useState } from "react";

const HomePage = ({ setToken }) => {
  const [isAdminSignUp, setIsAdminSignUp] = useState(true);

  const toggleForm = () => {
    setIsAdminSignUp(!isAdminSignUp);
  };

  return (
    <div className="flex justify-center items-center gap-14 min-w-screen min-h-screen flex-wrap">
      <Header />
      <div className="form-container p-0">
        <div className="toggle-form">
          {isAdminSignUp ? (
            <AdminSignUp setToken={setToken} />
          ) : (
            <AdminSignIn setToken={setToken} />
          )}
          <span
            onClick={toggleForm}
            className="cursor-pointer text-blue-600 mt-4 block text-center"
          >
            {isAdminSignUp ? "Existing user? Sign In" : "New user? Sign Up"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
