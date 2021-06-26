const mongoose = require('mongoose');

const checkOrGetCookie = (req, res, next)=>{
    const { cookies } = req;
    if( 'sessionId' in cookies ){
        return res.status(200).json({'msg': 'session id detected'});
    }
    next();
}
// const validateSession = async(req, res, next)=>{
//     const { cookies } = req;
//     if( 'sessionId' in cookies){
//         try{
//             const guest = await GuestUser.findById(cookies.sessionId);
//             await Cart.findById(guest.cartId);
//             return next()
//         }catch(error){
//             return next(error);
//         }
//     }
// }
module.exports = {
    checkOrGetCookie,
    // validateSession
}