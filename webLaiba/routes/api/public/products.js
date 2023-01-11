var express = require("express");
var router = express.Router();
var Jewelry = require("../../../models/Jewelry");

router.get("/", async function (req, res, next) {
  console.log("inside");
  setTimeout(async () => {
    let products = await Jewelry.find();

    res.send(products);
  }, 5000);
});
module.exports = router;
