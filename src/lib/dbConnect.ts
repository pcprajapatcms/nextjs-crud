import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number,
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  const MONGODB_URI = "mongodb+srv://cmsmindspcp:Wwlku6fPP18bCF11@mongodb-first.tjmtgrw.mongodb.net/?retryWrites=true&w=majority&appName=mongodb-first";
  try {
    // Attempt to connect to the database
    const db = await mongoose.connect(MONGODB_URI, {});

    connection.isConnected = db.connections[0].readyState;

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);

    // Graceful exit in case of a connection error
    process.exit(1);
  }
}

export default dbConnect;
