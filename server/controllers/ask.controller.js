const Ask = require("../models/ask.model");

const askRouter = require("express").Router();

askRouter.get("/", async (req, res) => {
  const asks = await Ask.find({});
  res.send(asks);
});

askRouter.post("/", async (req, res) => {
  console.log(req.body);
  const ask = new Ask(req.body);
  await ask.save();
  res.send(ask);
});

askRouter.put("/", async (req, res) => {
  const { _id } = req.body;
  const ask = await Ask.findOneAndUpdate({ _id }, req.body, { new: true });
  res.send(ask);
});

askRouter.put("/bid", async (req, res) => {
  const { _id } = req.body;
  const ask = await Ask.findOneAndUpdate(
    { _id },
    { $push: { bids: req.body.bid || {} } },
    { new: true }
  );
  res.send(ask);
});

module.exports = askRouter;
