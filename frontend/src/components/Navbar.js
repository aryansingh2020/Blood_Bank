import Button from './Button.js'

const Navbar = ({ setActiveForm }) => {
    const handleLogout = () => {
        localStorage.removeItem("bloodbank_token");
        window.location.href = "/";
    };

    return (
        <nav className="navbar bg-red-500 text-white p-4 min-w-screen">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Blood Bank</h1>
                <div className="flex space-x-4">
                    <Button value="Home" onClick={() => setActiveForm("home")} />
                    <Button value="Register user" onClick={() => setActiveForm("register")} />
                    <Button value="Find user" onClick={() => setActiveForm("finduser")} />
                    <Button value="Donor" onClick={() => setActiveForm("donor")} />
                    <Button value="Receiver" onClick={() => setActiveForm("receiver")} />
                    <Button value="Update data" onClick={() => setActiveForm("update")} />
                    <Button value="Delete user" onClick={() => setActiveForm("delete")} />
                    <Button value="Logout" onClick={handleLogout} className="bg-red-600" />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
