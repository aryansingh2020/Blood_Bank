import { useState } from "react";
import axios from "../api/axios.js";

const AdminSignUp = ({ setToken }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [status, setStatus] = useState("");
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/sign-up", formData);
      const token = res.data.token;
      localStorage.setItem("bloodbank_token", token);
      setToken(token);
      setStatus({ success: true, message: "Signup successful" });
      console.log("Signup successful");
    } catch (err) {
      setStatus({ success: false, message: "Signup failed" });
      console.error("Signup failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96 border border-red-500">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-500">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
        </form>
        {status && (
          <div className={`mt-4 p-2 rounded ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSignUp;
