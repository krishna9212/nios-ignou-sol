import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(
  'mongodb+srv://niosignousol:wP34xwjk74DG5AMh@nios-ignou-sol.axdmqqv.mongodb.net/nios-ignou-sol'
);


    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
};

export { connectDB };
