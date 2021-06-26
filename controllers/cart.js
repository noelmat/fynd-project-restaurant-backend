const mongoose = require('mongoose');

const Cart = mongoose.model('Cart');
const Session = mongoose.model('Session');
const CartItem = mongoose.model('CartItem');
const getCart = async (req, res, next)=>{
    const { cookies } = req;
    if(!cookies || cookies.sessionId === undefined){
        const error = new Error('Error ')
        error.status = 400;
        next(error);
    }
    try{
        const session = await Session.findById({'_id': cookies.sessionId});
        const cart = await Cart.findById({'_id': session.cartId}).populate({path: 'items', populate: {path:'item'}});
        res.status(200).json(cart);
    }catch(error){
        next(error);
    }
}
const updateCart = async (req, res, next) => {
    const id = req.params.id;
    const action = req.query.action;
    const itemDetails = req.body;

    if(!action){
        const error = new Error('No action ');
        error.status = 400;
        next(error);
    }
    if(action === 'add_to_cart'){
        try{
            let cart = await Cart.findOne({'_id': id});
            let cartItem;
            if(cart.items.indexOf(itemDetails._id) === -1){
                cartItem = await CartItem.create(itemDetails)
                cart =  await Cart.findByIdAndUpdate(id,
                    {
                        $addToSet: {
                            items: cartItem._id
                        }
                    })
            }else{
                cartItem = await CartItem.findByIdAndUpdate(itemDetails._id, {
                    $inc: {
                        quantity: itemDetails.quantity,
                    }
                })
            }
            cart = await Cart.findById(id).populate({path: 'items', populate: {path:'item'}});
            res.status(200).json({cart, cartItem});
        }catch(error){
            next(error);
        }
    }else if(action === 'remove_from_cart'){
        if(itemDetails._id === undefined){
            const error = new Error('Item not in request');
            error.status = 400;
            return next(error);    
        }
        try{
            let cart = await Cart.findByIdAndUpdate(id,
                {
                    $pull: {
                        items: itemDetails._id
                    }
                }).populate({path: 'items', populate: {path:'item'}})
            res.status(200).json(cart);
        }catch(error){
            next(error);
        }
    }

}
module.exports = {
    getCart,
    updateCart
}