const { Router } = require("express");
var express = require("express");
const { models } = require("mongoose");
var router = express.Router();
const {signout, signup} = require("../controllers/auth");


router.post("/signup", signup);
router.get("/signout", signout);

module.exports = router;
