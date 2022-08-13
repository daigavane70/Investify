const express = require("express");
const app = express();
const connectDB = require("./utility/db");
const chatRoutes = require("./routers/chat.router");
const userRoutes = require("./routers/user.router");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const Startup = require("./models/startup.model");

app.use(cors());
app.use(express.json());

// db connection
connectDB();
// middleware

app.use("/chat", chatRoutes);
app.use("/api/users", userRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log("connected with id: " + socket.id);

  socket.on("send_message", (data) => {
    console.log("[send_message] data: " + JSON.stringify(data));
  });

  socket.on("disconnect", () => {
    console.log("disconneced from id: " + socket.id);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log("Server is up and running at port: " + PORT);
});
