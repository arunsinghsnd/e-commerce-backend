const { Router } = require("express");
var express = require('express');
const { models } = require("mongoose");
var router = express.Router()


router.get("/signout", (req, res) =>{
    res.send("User Signout");
});

module.exports = router;