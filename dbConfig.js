import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { autoIndex: false });
    // console.log('MongoDB Connected Successfully');
  } catch (error) {
    // console.error('MongoDB Connection Error:', error);
    process.exit(1); // Exit process with failure
  }
};

// mongoose.set('debug', true)
export default connectDB;
