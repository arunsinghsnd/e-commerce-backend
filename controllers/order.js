const { Order, ProductCart } = require("../models/order")
const order = require("../models/order")

exports.getOrderById = (req, res , next) =>{
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order)=>{
        if(err){
            return res.status(400).json({
                error: "No order found in DB"
            })
        }
        res.order = order;
        next();
    });
};