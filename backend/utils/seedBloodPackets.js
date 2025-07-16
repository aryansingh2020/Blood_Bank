import BloodPacket from '../models/bloodPacket.model.js';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const seedBloodPackets = async () => {
  try {
    const count = await BloodPacket.countDocuments();

    if (count === 0) {
      const initialPackets = BLOOD_GROUPS.map(group => ({
        bloodGroup: group,
        quantity: 1000, // default amount = 1000 ml
      }));

      await BloodPacket.insertMany(initialPackets);
      console.log('bloodPackets collection seeded with initial blood groups.');
    } else {
      console.log('bloodPackets collection already populated.');
    }
  } catch (error) {
    console.error('Error seeding bloodPackets collection:', error.message);
  }
};

export default seedBloodPackets;