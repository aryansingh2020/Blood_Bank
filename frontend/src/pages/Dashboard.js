import { useState } from "react"
import Navbar from "../components/Navbar.js"
import RegisterUser from "../forms/RegisterUser.js"
import Donor from "../forms/Donor.js"
import Receiver from "../forms/Receiver.js"
import UpdateUser from "../forms/UpdateUser.js"
import FindUser from "../forms/FindUser.js"
import DeleteUser from "../forms/DeleteUser.js"

const Dashboard = () => {
  const [activeForm, setActiveForm] = useState("home")

  return (
    <div className="dashboard bg-gray-100 min-w-screen min-h-screen ">
      <Navbar setActiveForm={setActiveForm} />

      <div className="content-container flex justify-center items-center mt-6">
        {activeForm === "home" && (
          <div className="text-center">
            <h2 className="text-3xl text-red-500 font-bold">Welcome to Blood Bank Dashboard</h2>
          </div>
        )}

        {activeForm === "register" && <RegisterUser />}
        {activeForm === "donor" && <Donor />}
        {activeForm === "receiver" && <Receiver />}
        {activeForm === "update" && <UpdateUser />}
        {activeForm === "finduser" && <FindUser />}
        {activeForm === "delete" && <DeleteUser />}
      </div>
    </div>
  )
}

export default Dashboard
