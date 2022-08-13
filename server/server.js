const express = require("express");
const app = express();
const chatRoutes = require("./routers/chat.router");

app.use(express.json());
app.use("/chat", chatRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log("Server is up and running at port: " + PORT);
});
