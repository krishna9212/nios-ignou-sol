import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;

    const mongoURI = process.env.MONGODB_URI;

    console.log("Loaded MONGODB_URI:", mongoURI); // ✅ TEMP DEBUG

    if (!mongoURI || !(mongoURI.startsWith('mongodb://') || mongoURI.startsWith('mongodb+srv://'))) {
      throw new Error('❌ Invalid MONGODB_URI format or not loaded');
    }

    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
};

export { connectDB };
