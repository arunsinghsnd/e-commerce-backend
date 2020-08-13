const express = require("express")
const router = express.Router();

const  {getProductId , createProduct} = require("../controllers/product")
const  {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")
const  { getUserById} = require("../controllers/user")


// all of params
router.param("userId", getUserById);
router.param("productId", getProductId);

// all of actul routes
router.post("/product/create/:userId",isSignedIn, isAuthenticated, isAdmin, createProduct)

//all of actual routes
module.exports = router;