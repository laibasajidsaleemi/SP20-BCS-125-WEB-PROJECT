var express = require("express");
var router = express.Router();
var Jewelry = require("../models/Jewelry");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
/* GET home page. */
router.get("/login", function (req, res, next) {
  return res.render("site/login");
});
router.post("/login", async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash("danger", "User with this email is not present.");
    return res.redirect("/login");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) {
    req.session.user = user;
    req.flash("success", "Logged in successfully.");
    return res.redirect("/");
  } else {
    req.flash("danger", "Invalid Password");
    return res.redirect("/login");
  }
});
router.get("/register", function (req, res, next) {
  return res.render("site/register");
});
router.get("/logout", async (req, res) => {
  req.session.user = null;
  console.log("session clear");
  return res.redirect("/login");
});
router.post("/register", async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    req.flash("danger", "User with given email is already registered.");
    return res.redirect("/login");
  }
  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();
  return res.redirect("/login");
});
router.get("/contact-us", function (req, res, next) {
  return res.render("site/contact", { layout: "layout" });
});

router.get("/add", (req, res) => {
  res.render("site/add");
});
router.post("/add", async (req, res) => {
  let products = new Jewelry(req.body);
  await products.save();
  res.redirect("/");
});

router.get("/delete/:id", async (req, res) => {
  let car = await Jewelry.findByIdAndDelete(req.params.id);
  res.redirect("/");
});


router.get("/", async function (req, res, next) {
  let products = await Jewelry.find();
  return res.render("site/homepage", {
    pagetitle: "Jewelry Shop",
    products,
  });
});

module.exports = router;
