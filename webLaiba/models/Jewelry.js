const mongoose = require("mongoose");
const jewelrySchema = mongoose.Schema({
  name: String,
  price: Number,
  brand: String,
  description: String,
  image: String,
  tags: [String],
});
const Jewelry = mongoose.model("Jewelry", jewelrySchema);
module.exports = Jewelry;
