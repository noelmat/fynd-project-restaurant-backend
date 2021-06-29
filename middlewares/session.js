const mongoose = require('mongoose');
const Session = mongoose.model('Session');
const checkOrGetCookie = async (req, res, next)=>{
    const { cookies } = req;
    if( 'sessionId' in cookies ){
        try{
            const session = await Session.findById(cookies.sessionId)
            if(session){
                return res.status(200).json({'msg': 'session id detected'});
            }
        }catch(error){
            next(error);
        }
        res.clearCookie('sessionId');
    }
    next();
}

module.exports = {
    checkOrGetCookie,
}