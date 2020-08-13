const Product = require("../models/product");
const product = require("../models/product");



exports.getProductById = (req, res , next , id) =>{
    Product.findById(id)
    .populate("category")
    .exec((err , product) =>{
        if(err){
            return res.status(400).json({
                error: "Product not found"
            })
        }
        res.product = product;
        next();
    });
};