import { useState } from "react";
import axios from "../api/axios.js";

const Receiver = () => {
  const [formData, setFormData] = useState({
    email: "",
    dob: "",
    receivedAmount: "",
    receivedBloodGroup: ""
  });

  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/user/receive", formData);
      setStatus({ success: true, message: "Blood received successfully" });
      console.log("Blood received successfully:", res.data);
    } catch (err) {
      setStatus({ success: false, message: "Failed to receive blood" });
      console.error("Receive error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="receiver bg-gray-100 min-w-screen min-h-screen p-6">
     
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
         <h2 className="text-2xl font-bold mb-4 text-red-500">Receiver Form</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Registered email *</label>
          <input required type="email" placeholder="Email" id="email" className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
        <div className="mb-4">
          <label htmlFor="dob" className="block text-gray-700 mb-2">Registered Date of Birth *</label>
          <input required type="date" placeholder="DOB" id="dob" className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
        </div>
        <div className="mb-4">
          <label htmlFor="bloodType" className="block text-gray-700 mb-2">Received Blood Type *</label>
          <select required value={formData.receivedBloodGroup} onChange={(e) => setFormData({ ...formData, receivedBloodGroup: e.target.value })} className="w-full p-2 border border-gray-300 rounded">
            <option value="" disabled>Select blood group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 mb-2">Quantity (ml) *</label>
          <input required type="number" id="quantity" className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setFormData({ ...formData, receivedAmount: e.target.value })} />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
      {status && (
        <div className={`mt-4 p-2 rounded ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default Receiver;
