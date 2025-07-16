import { useState } from 'react';
import axios from '../api/axios.js';

const AdminSignIn = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/sign-in", { email, password });
      const token = res.data.token;
      localStorage.setItem("bloodbank_token", token);
      setToken(token); // ✅ triggers redirect to dashboard
      setStatus({ success: true, message: "Login successful" });
      console.log("Login successful");
    } catch (err) {
      setStatus({ success: false, message: "Login failed" });
      console.error("Login failed", err.response?.data);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96 border border-red-500">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-500">Sign In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} id="email" className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} id="password" className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Sign In</button>
        </form>
        {status && (
          <div className={`mt-4 p-2 rounded ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {status.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminSignIn