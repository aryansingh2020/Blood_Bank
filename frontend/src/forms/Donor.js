import {useState} from "react"
import axios from "../api/axios.js";


const Donor=()=>{
const [formData, setFormData] = useState({ email: "", dob:"", donatedAmount: ""});
const [status, setStatus] = useState("");
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.put("/user/donate", formData)
        setStatus({ success: true, message: "Donor data submitted successfully" });
        console.log("Donor data submitted", res.data);
    } catch (err) {
        setStatus({ success: false, message: "Failed to submit donor data" });
        console.error("Submission failed", err.response?.data)
    }
}
    return(
        <div className="donor-form p-6 rounded max-h-fit shadow-2xl">
            
            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4 text-red-500 ">Donor Form</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Registered email *</label>
                    <input required type="email" placeholder="Email" onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Registered Date of Birth *</label>
                    <input required type="date"placeholder="DOB" onChange={e => setFormData({ ...formData, dob: e.target.value })} className="w-full p-2 border rounded" />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700">Quantity (ml) *</label>
                    <input required type="number" onChange={e => setFormData({ ...formData, donatedAmount: e.target.value })}className="w-full p-2 border rounded" placeholder="Enter quantity in ml" />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Submit
                </button>
            </form>
            {status && (
                <div className={`mt-4 p-2 rounded ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {status.message}
                </div>
            )}
        </div>
    )
}

export default Donor