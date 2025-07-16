import { useState } from "react";
import axios from "../api/axios.js";

const FindUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    dob: ""
  });
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("/user/getUser", {
        params: formData
      });

      setUser(res.data.data);
      setStatus({ success: true, message: "User found successfully" });
      console.log("User found:", res.data.user);
    } catch (err) {
      setStatus({ success: false, message: "User not found" });
      console.error("Find user failed:", err.response?.data || err.message);
      setUser(null);
    }
  };

  return (
    <div className="find-user bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-red-500">Find User</h2>
      <form onSubmit={handleSearch}>
        <div className="mb-4">
          <label className="block text-gray-700">Registered email *</label>
          <input type="email" placeholder="Email" className="w-full p-2 border rounded"

            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Registered Date of Birth *</label>
          <input type="date" placeholder="DOB" className="w-full p-2 border rounded"

            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
      </form>

      {user && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Blood Group:</strong> {user.userBloodGroup}</p>
          <p><strong>Total Blood Donated:</strong> {user.totalDonatedAmount} ml</p>
          <p><strong>Total Blood Received:</strong> {user.totalReceivedAmount} ml</p>

        </div>
      )}
      {status && (
        <div className={`mt-4 p-2 rounded ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default FindUser;
