import { useState } from "react";
import axios from "../api/axios.js";

const UpdateUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    dob: "",
    newName: "",
    newGender: "",
    newDob: "",
    newEmail: ""
  });

  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload with only non-empty fields
    const updatePayload = {
      email: formData.email,
      dob: formData.dob,
    };

    if (formData.newName.trim()) updatePayload.name = formData.newName;
    if (formData.newGender.trim()) updatePayload.gender = formData.newGender;
    if (formData.newDob.trim()) updatePayload.newDob = formData.newDob;
    if (formData.newEmail.trim()) updatePayload.newEmail = formData.newEmail;

    try {
      const res = await axios.put("/user/update", updatePayload);
      setStatus({ success: true, message: "User updated successfully" });
      console.log("User updated:", res.data);
    } catch (err) {
      setStatus({ success: false, message: "Update failed" });
      console.error("Update failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="update-user bg-white p-6 rounded shadow-2xl">
      <h2 className="text-2xl font-bold mb-4  text-red-500">Update User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Registered email *</label>
          <input
            required
            placeholder="email"
            type="email"
            className="w-full p-2 border rounded"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Registered Date of Birth *</label>
          <input
            required
            type="date"
            placeholder="DOB"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">New name</label>
          <input
            type="text"
            placeholder="Enter new name"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setFormData({ ...formData, newName: e.target.value })}
          />
        </div>
        <div>
                    <label className="block text-gray-700 mb-2" htmlFor="gender">Gender *</label>
                    <select required value={formData.newGender} onChange={(e) => setFormData({ ...formData, newGender: e.target.value })} id="gender" className="w-full p-2 border border-gray-300 rounded">
                        <option value="" disabled>Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">New Date of Birth</label>
          <input
            type="date"
            placeholder="Enter new DOB"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setFormData({ ...formData, newDob: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">New email</label>
          <input
            type="email"
            placeholder="Enter new email"
            className="w-full p-2 border rounded"
            onChange={(e) => setFormData({ ...formData, newEmail: e.target.value })}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
      </form>

      {status && (
        <div className={`mt-4 p-2 rounded ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
