import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI || !(mongoURI.startsWith('mongodb://') || mongoURI.startsWith('mongodb+srv://'))) {
      throw new Error('❌ Invalid or missing MONGODB_URI');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};
