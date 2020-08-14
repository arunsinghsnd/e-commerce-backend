const { Order, ProductCart } = require("../models/order")
const order = require("../models/order");
const { json } = require("body-parser");

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


exports.createOrder = (req, res) =>{
    req.body.order.user = req.profile;
    const order = new Order(req.body.order)
    order.save((err , order ) =>{
        if(err){
            return res.status(400).json({
                error: "Faild to save your order in DB"
            })
        }
        res.json(order);
    });
};


exports.getAllOrders = (req, res) =>{
    Order.find()
    .populate("user", "_id name")
    .exec((err, order)=>{
        if(err){
            return res.status(400).json({
                error: "No orders found in DB"
            });
        }
        res.next(order)
    });
};


exports.getOrderStatus = (req, res)=>{
    res.json(Order.schema.path("status").eumValues);
};

exports.updateStatus = (req, res) =>{
    Order.update(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err, order) =>{
            if(err){
                return res.status(400),json({
                    error: "Cannot updte order status"
                })
            }
            res.json(order);
        }
    )
};