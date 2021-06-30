const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const OrderItem = mongoose.model('OrderItem');
const CustomerUser = mongoose.model('CustomerUser')
const createOrder = async (req, res, next) => {
    const orderDetails = req.body;
    const claims = res.locals.claims;
    if(Object.keys(orderDetails).length === 0 || orderDetails.items === undefined || orderDetails.items.length === 0){
        const error = new Error('Order Details not received');
        error.status = 400;
        return next(error);
    }
    try{
        const customer = await CustomerUser.findOne({
            email: claims.email,
            address: orderDetails.address,
        })
        if(!customer){
            const error = new Error('Customer not found');
            error.status = 404;
            return next(error);
        }
        const orderItems = await OrderItem.create(orderDetails.items);
        orderDetails.customerId = customer._id;
        orderDetails.items = orderItems.map(item => {
            return {
                _id: item._id
            }
        })
        orderDetails.status = 'received';
        const order = await Order.create(orderDetails);
        res.clearCookie('sessionId');
        res.status(200).json(order);
        
    }catch(error){
        if(error.name === 'ValidationError'){
            error.status = 400;
        }
        next(error);
    }
}

const updateOrderStatus = async (req, res, next) => {
    const id = req.params.id;
    const action = req.query.action;
    const status = req.query.status;

    if(!id || id.length === 0){
        const error = new Error('Order id not in request');
        error.status = 400;
        return next(error);
    }
    if(!action){
        const error = new Error('Operation not supported');
        error.status = 400;
        return next(error);
    }
    if(action === "change_status"){
        try{
            const order = await Order.findById(id);
            if(!order){
                const error = new Error("Order not found");
                error.status = 404;
                return next(error);
            }
            order.status = status;
            order.save();
            res.status(200).json(order);
        }catch(error){
            if(error.name === 'ValidationError'){
                error.status = 400;
            }
            next(error);
        }
    }else{
        const error = new Error('Operation not supported');
        error.status = 400;
        return next(error);
    }
}

const activeOrders = async (req, res,next)=>{
    try{
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Connection', 'keep-alive');
        const activeOrders = await Order.find({
            status: {
                $nin: ['completed']
            }
        }).populate({path:"items", populate: {path: "itemId"}});
        res.write(`data: ${JSON.stringify(activeOrders)}\n\n`);

        const listener = async (order)=>{
            // console.log('updated');
            const updatedOrder = await Order.findById(order._id).populate({path:"items", populate: {path: "itemId"}});
            res.write( `data: ${JSON.stringify(updatedOrder)}\n\n`)
    
        }
        global.ordermanagement.onSave.addListener('event:updated', listener);
        // console.log('client Listening')
        req.on('close', ()=> {
            // console.log('client Dropped');
            global.ordermanagement.onSave.removeListener('event:updated', listener);
            res.end();
        })
        }catch(error){
        next(error);
    }
}

module.exports = {
    createOrder,
    updateOrderStatus,
    activeOrders
}