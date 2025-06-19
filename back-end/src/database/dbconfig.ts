import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config(); // Load variables from .env

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in your environment variables");
  process.exit(1);
}

const options: mongoose.ConnectOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
  autoIndex: true, // build indexes automatically (set to false in production)
  // poolSize: 10,              // Adjust if you need a larger connection pool
  // serverSelectionTimeoutMS: 5000, // Try to send operations for 5 seconds
};

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to:", MONGO_URI);
});

mongoose.connection.on("error", (err: Error) => {
  console.error(" Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log(" Mongoose disconnected");
});

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI, options);
  } catch (err) {
    console.error("Initial MongoDB connection error:", err);
    process.exit(1);
  }
}
