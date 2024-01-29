const Item = require("../models/Item");

const getItems = async (req, res) => {
  const items = await Item.find();
  if (!items) {
    return res.status(204).json({ error: "no items found" });
  }
  res.status(200).json(items);
};

const createItem = async (req, res) => {
  if (
    req.body.jmeno === undefined ||
    req.body.id === undefined ||
    req.body.zaber === undefined ||
    req.body.umisteni === undefined ||
    req.body.minVek === undefined ||
    req.body.maxVek === undefined ||
    req.body.exekutiva === undefined ||
    req.body.konstrukce === undefined ||
    req.body.matematika === undefined ||
    req.body.motorika === undefined ||
    req.body.mysleni === undefined ||
    req.body.pamet === undefined ||
    req.body.pozornost === undefined ||
    req.body.rec === undefined ||
    req.body.vizuoprostor === undefined
  ) {
    return res.status(400).json({ error: "incoming data incorrect" });
  }

  try {
    const item = await Item.create({
      jmeno: req.body.jmeno,
      id: req.body.id,
      zaber: req.body.zaber,
      umisteni: req.body.umisteni,
      minVek: req.body.minVek,
      maxVek: req.body.maxVek,
      exekutiva: req.body.exekutiva,
      konstrukce: req.body.konstrukce,
      matematika: req.body.matematika,
      motorika: req.body.motorika,
      mysleni: req.body.mysleni,
      pamet: req.body.pamet,
      pozornost: req.body.pozornost,
      rec: req.body.rec,
      vizuoprostor: req.body.vizuoprostor,
    });
    res.status(201).json(item);
  } catch (err) {
    console.error("error:", err.message);
  }
};

const editItem = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "id is missing" });
  }

  const item = await Item.findById({ _id: req.params.id }).exec();
  if (!item) {
    return res.status(204).json({ error: "item not found" });
  }

  if (
    req.body.jmeno === undefined ||
    req.body.id === undefined ||
    req.body.zaber === undefined ||
    req.body.umisteni === undefined ||
    req.body.minVek === undefined ||
    req.body.maxVek === undefined ||
    req.body.exekutiva === undefined ||
    req.body.konstrukce === undefined ||
    req.body.matematika === undefined ||
    req.body.motorika === undefined ||
    req.body.mysleni === undefined ||
    req.body.pamet === undefined ||
    req.body.pozornost === undefined ||
    req.body.rec === undefined ||
    req.body.vizuoprostor === undefined
  ) {
    return res.status(400).json({ error: "incoming data incorrect" });
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(updatedItem);
  } catch (err) {
    console.error("error:", err.message);
  }
};

const deleteItem = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "id is missing" });
  }

  const item = await Item.findById({ _id: req.params.id }).exec();
  if (!item) {
    return res.status(204).json({ error: "item not found" });
  }

  try {
    await item.remove();
    res.status(202).json(item);
  } catch (err) {
    console.error("error:", err.message);
  }
};

module.exports = {
  getItems,
  createItem,
  editItem,
  deleteItem,
};
