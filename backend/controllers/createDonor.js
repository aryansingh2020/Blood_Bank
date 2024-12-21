import Donor from '../models/donor.js'
const createDonor= async(req, res) => {
    const donor = req.body;

    // Validate request body
    if (!donor.name || !donor.gender || !donor.dob || !donor.bloodGroup || !donor.email) {
        return res.status(400).json("Please enter all fields.");
    }

    try {
        // Create and save the donor
        const tempDonor=await Donor.findOne({ email: donor.email })
        if(!tempDonor)
        {
            const newDonor = await Donor.create(donor);
            console.log("Donor saved:", newDonor);
            return res.status(201).json(newDonor);
        }
        else if(tempDonor){
            return res.status(400).json("Email already registered")
        }
         // Respond with the saved donor
    } catch (error) {
        console.error("Error saving donor:", error);
        res.status(500).send("An error occurred while saving the donor.");
    }
}

export default createDonor