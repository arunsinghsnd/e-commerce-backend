const express = require("express");
const router = express.Router();
const  {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const  { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const {updateStock} = require("../controllers/product")

const {getOrderById} = require("../controllers/order");
const { route } = require("./auth");

// prames
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// actual routes
//create

//read
module.exports = route;