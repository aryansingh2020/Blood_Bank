import { useState } from "react"
import Navbar from "../components/Navbar.js"
import BloodData from "../components/BloodData.js"
import RegisterUser from "../forms/RegisterUser.js"
import Donor from "../forms/Donor.js"
import Receiver from "../forms/Receiver.js"
import UpdateUser from "../forms/UpdateUser.js"
import FindUser from "../forms/FindUser.js"
import DeleteUser from "../forms/DeleteUser.js"


const Dashboard = () => {
  const [activeForm, setActiveForm] = useState("home")

  return (
    <div className="dashboard ">
      <Navbar setActiveForm={setActiveForm} />
      <div className="pie-form-container flex flex-wrap justify-center gap-20 min-h-fit mt-6">
        <BloodData/>
        <div className="content-container flex justify-center">
        {activeForm === "home" && (
          <div className="flex text-center items-center">
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
    </div>
  )
}

export default Dashboard
