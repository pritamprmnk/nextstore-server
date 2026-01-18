const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = "./items.json";

// Helper functions
const readItems = () => {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
};

const writeItems = (items) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2));
};

// GET all items 
app.get("/items", (req, res) => {
  const items = readItems();
  res.json(items);
});

// GET single item 
app.get("/items/:id", (req, res) => {
  const items = readItems();
  const item = items.find(i => i.id == req.params.id);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.json(item);
});

// POST new item 
app.post("/items", (req, res) => {
  const items = readItems();

  const newItem = {
    id: Date.now(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image
  };

  items.push(newItem);
  writeItems(items);

  res.status(201).json({
    success: true,
    item: newItem
  });
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
