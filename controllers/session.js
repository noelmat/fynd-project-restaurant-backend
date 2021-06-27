const mongoose = require('mongoose');

const Session = mongoose.model('Session');
const Cart = mongoose.model('Cart');

const getSessionId = async (req, res, next)=>{
    try{
        const cart = await Cart.create({})
        try{
            const session = await Session.create({cartId: cart._id});
            res.cookie('sessionId', session._id);
            res.status(200).json(cart)
        }catch(error){
            await Cart.findByIdAndDelete(cart);
            throw error;
        }
    }catch(error){
        next(error);
    }
} 

module.exports = {
    getSessionId
}