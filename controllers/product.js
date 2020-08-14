const Product = require("../models/product");
const product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");


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

exports.createProduct = (req, res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = ture;

    form.parse(req, (err, fields, file) =>{
        if(err){
            return res.status(400).json({
                error: "Problem with image"
            });
        }
        // desturctur the fields

        const {name, description , price, category, stock} = fields;

        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ){
            return res.status(400).json({
                error: "Please include all fields"
            })
        }


        let product = new Product(fields);


        // handle file here

        if(file.photo){
            if(file.photo.size > 300000){
                return res.status(400).json({
                    error: "File size too big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        //save to the DB
        product.save((err, product)=>{
            if(err){
                res.status(400).json({
                    error: "Saving Tshirt in DB failed"
                })
            }
            res.json(product)
        })
    })
}


exports.getProduct = (req, res) =>{
    req.product.photo = undefined
    return res.json(req.product)
}


// middlewere
exports.photo = (req, res, next) =>{
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
};


// delete contorllers

exports.deleteProduct = (req,res) =>{
    let product = req.product;
    product.remove((err, deletedProduct) =>{
        if(err){
            return res.status(400).json({
                error: "Failed to delete the product"
            });
        }
        res.json({
            message: "Deletion was a success",
            deletedProduct
        });
    });
};

exports.updateProduct = (req , res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = ture;

    form.parse(req, (err, fields, file) =>{
        if(err){
            return res.status(400).json({
                error: "Problem with image"
            });
        }
        
        //updation code
        let product = req.product;
        product = _.extend(product, fields)


        // handle file here

        if(file.photo){
            if(file.photo.size > 300000){
                return res.status(400).json({
                    error: "File size too big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //save to the DB
        product.save((err, product)=>{
            if(err){
                res.status(400).json({
                    error: "Udpation of product failed"
                })
            }
            res.json(product);
        })
    })
};

// listing of product

exports.getAllProducts = (req, res) =>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy =req.query.sortBy ? req.query.sortBy : "_id"

    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) =>{
        if(err){
            return res.status(400).json({
                error: "No Product FOUND"
            })
        }
        res.json(products)
    })
};