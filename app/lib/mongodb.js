import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;

    const mongoURI = process.env.MONGODB_URI || "mongodb+srv://niosignousol:wP34xwjk74DG5AMh@nios-ignou-sol.axdmqqv.mongodb.net/nios-ignou-sol";

    if (!mongoURI) {
      throw new Error('❌ MONGODB_URI not found in environment variables');
    }

    await mongoose.connect(mongoURI);

    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
};

export { connectDB };
