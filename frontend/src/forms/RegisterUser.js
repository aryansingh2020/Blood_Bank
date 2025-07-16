import { useState } from 'react';
import axios from '../api/axios.js';

const RegisterUser = () => {
    const [formData, setFormData] = useState({
        name: "",gender: "", email: "", dob: "",bloodGroup: ""
    });
    const [status, setStatus] = useState("");
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/user/register", formData);
            setStatus({ success: true, message: "User registered successfully" });
            console.log("User registered", res.data);
        } catch (err) {
            setStatus({ success: false, message: "Registration failed" });
            console.error("Registration failed", err.response?.data);
        }
    };

    return (
        <div className="register-user">
            <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-red-500">Register User</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="name">Name *</label>
                    <input required placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" id="name" className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">Email *</label>
                    <input required placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" id="email" className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="dob">Date of birth *</label>
                    <input required type="date" onChange={(e) => setFormData({ ...formData, dob: e.target.value })} id="dob" className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2" htmlFor="gender">Gender *</label>
                    <select required value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} id="gender" className="w-full p-2 border border-gray-300 rounded">
                        <option value="" disabled>Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="bloodGroup">Blood Group *</label>
                    <select required value={formData.bloodGroup} onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })} id="bloodGroup" className="w-full p-2 border border-gray-300 rounded">
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
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Register</button>
            </form>
            {status && (
                <div className={`mt-4 p-2 rounded ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {status.message}
                </div>
            )}
        </div>
    )
}

export default RegisterUser