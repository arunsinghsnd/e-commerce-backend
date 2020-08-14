const express = require("express")
const router = express.Router();

const  {
    getProductById , 
    createProduct, 
    getProduct, 
    photo,
    deleteProduct,
    updateProduct
} = require("../controllers/product")
const  {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")
const  { getUserById } = require("../controllers/user")


// all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

// all of actul routes
//create route
router.post("/product/create/:userId",isSignedIn, isAuthenticated, isAdmin, createProduct);

//delete route
router.delete("/product/:productId/:userId", isSignedIn,isAuthenticated,isAdmin, deleteProduct);

//update route
router.put("/product/:productId/:userId", isSignedIn,isAuthenticated,isAdmin, updateProduct);

//listing route

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);
//all of actual routes
module.exports = router;