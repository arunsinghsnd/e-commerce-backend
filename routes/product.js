const express = require("express")
const router = express.Router();

const  {getProductId} = require("../controllers/product")
const  {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")
const  { getUserById} = require("../controllers/user")


// all of params
router.param("userId", getUserById);
router.param("productId", getProductId);


//all of actual routes
module.exports = router;