import { useState } from "react";
import axios from "../api/axios.js";

const DeleteUser = () => {
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [status, setStatus] = useState("");
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/user/delete?email=${email}&dob=${dob}`);
      setStatus({ success: true, message: "User deleted successfully" });
      console.log("User deleted:", res.data);
    } catch (err) {
      setStatus({ success: false, message: "Failed to delete user" });
      console.error("Delete failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="delete-user p-6 rounded shadow-2xl max-h-fit">
      <form onSubmit={handleDelete}>
        <h2 className="text-2xl font-bold mb-4  text-red-500">Delete User</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Registered email *</label>
          <input type="email" placeholder="email" id="email" className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div className="mb-4">
          <label htmlFor="dob" className="block text-gray-700 mb-2">Registered Date of Birth *</label>
          <input type="date" id="dob" className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setDob(e.target.value)} required/>
        </div>
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </form>
      {status && (
        <div className={`mt-4 p-2 rounded ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
