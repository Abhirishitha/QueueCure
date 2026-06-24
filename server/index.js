import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import { Server } from "socket.io";

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

connectDB();

const httpServer =
  createServer(app);

export const io =
  new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

io.on(
  "connection",
  (socket) => {
    console.log(
      "Client Connected:",
      socket.id
    );

    socket.on(
      "disconnect",
      () => {
        console.log(
          "Client Disconnected"
        );
      }
    );
  }
);

httpServer.listen(
  process.env.PORT,
  () => {
    console.log(
      `Server running on ${process.env.PORT}`
    );
  }
);