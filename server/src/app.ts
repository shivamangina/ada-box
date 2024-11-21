require("dotenv").config({ path: process.env.ENV_FILE_PATH || `${__dirname}/.env` });
import express, { Request, Response, NextFunction, json } from "express";
import connectDBs from "./config/db";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const port = process.env.BACKEND_PORT || 8292;

app.use(json());
app.use(cors());

const startServer = async () => {
  try {
    // Wait for DB connections to be established
    const dbConnections = await connectDBs();
    const { db } = dbConnections;

    // Health Check
    app.get("/health", (req, res) => {
      res.status(200).send("OK");
    });

    // Start the server
    const server = createServer(app);

    const io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      socket.on("send_file_tree", () => {
        db.collection("filetree")
          .findOne()
          .then((data) => {
            socket.emit("receive_file_tree", data?.fileTree);
          });
      });

      socket.on("update_file_tree", (data) => {
        db.collection("filetree")
          .findOneAndUpdate({}, { $set: { fileTree: data } }, { returnDocument: "after" })
          .then((res) => {
            socket.broadcast.emit("receive_update_file_tree", res?.fileTree);
          });
      });
    });

    server.listen(port, () => {
      console.info(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    // eslint-disable-next-line no-process-exit
    process.exit(1); // Exit the process if there is a critical failure
  }
};
// Global Error Handler Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error: ${err.message}`);

  // Return a generic error response
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });

  next();
});

// Start the server
startServer();
