import { HandleError } from "../utility";

const Startup = require("../models/startup.controller");

export async function createStartup(req, res) {
  try {
    const { name, domains, founded, founder } = req.body;
    const startup = new Startup({ name, domains, founded, founder });
    await startup.save();
    res.send(startup);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
}

export async function updateStartup(req, res) {
  try {
    const { _id, name, domains, founded, founder } = req.body;
    const startup = await Startup.findOneAndUpdate(
      { _id },
      { name, domains, founded, founder },
      { new: true }
    );
    res.send(startup);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
}

export async function deleteStartup(req, res) {
  try {
    const { _id } = req.body;
    if (!_id) res.status(400).send("please send _id");
    const startup = await Startup.deleteOne({ _id });
    res.send("Deleted successfully: " + startup);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
}
