import mongoose, { Connection } from "mongoose";

interface DBConnections {
  db: Connection;
}

const connectDBs = async (): Promise<DBConnections> => {
  try {
    const dbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST_WITH_PORT}/${process.env.MONGODB_DATABASE}`;

    console.info("Connecting to DB...");
    const db = mongoose.createConnection(dbURI);

    console.info("DB connected successfully.");

    // Wait for the connection events before proceeding
    await Promise.all([
      new Promise<void>((resolve, reject) => {
        db.once("connected", () => {
          console.info("DB connected successfully.");
          resolve();
        });
        db.on("error", (err) => {
          console.error("Error connecting to DB:", err);
          reject(err);
        });
      }),
    ]);

    return { db };
  } catch (err) {
    console.error("Error connecting to databases:", err);
    throw new Error("Database connection failed");
  }
};

export default connectDBs;
