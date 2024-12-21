import Donor from '../models/donor.js'

const deleteDonor=async(req,res)=>{
    try{
        const {id}=req.params

        const deletedDonor=await Donor.findByIdAndDelete(id)
        if(!deletedDonor)
        {
            return res.status(404).json({message:"Donor not found"})
        }
        res.json({message:'Donor deleted successfully',donor:deletedDonor})
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:'Server error'})
    }
}

export default deleteDonor