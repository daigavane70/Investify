const express = require("express");
const app = express();
const connectDB = require("./utility/db")
const chatRoutes = require("./routers/chat.router")
const userRoutes = require("./routers/user.router")

app.use(express.json());

// db connection
connectDB()
// middleware

app.use("/chat" ,  chatRoutes)
app.use("/api/users" , userRoutes)


const PORT = 4000;
app.listen(PORT, () => {
  console.log("Server is up and running at port: " + PORT);
});
