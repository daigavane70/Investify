const express = require("express");
const {
  getAllStartups,
  deleteStartup,
  createStartup,
  updateStartup,
  getStartupById,
} = require("../controllers/startup.controller");
const startupRouter = express.Router();

startupRouter.get("/", getAllStartups);
startupRouter.get("/:id", getStartupById);
startupRouter.delete("/", deleteStartup);
startupRouter.post("/", createStartup);
startupRouter.put("/", updateStartup);

module.exports = startupRouter;
