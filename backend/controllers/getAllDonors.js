import Donor from '../models/donor.js'
const getAllDonors=async (req, res) => {
    try {
      const donors = await Donor.find(); // Fetch all data from the User collection
      res.status(200).json(donors);    // Send the data as a JSON response
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching data." });
    }
  }

  export default getAllDonors