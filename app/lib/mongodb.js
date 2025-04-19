import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // If already connected, just return
    if (mongoose.connection.readyState >= 1) return;

    // Use the MONGODB_URI from environment variables
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('❌ MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
};

export { connectDB };
