const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        const error = new Error('Provide Authentication');
        error.status = 401;
        return next(error);
    }

    jwt.verify(token, process.env.JWT_CUSTOMER_SECRET, (err, claims) => {
        if (err) {
            const error = new Error('Provide Valid Authentication');
            error.status = 401;
            return next(error);
        }

        res.locals.claims = claims;
        next();
    })
}

const authorize = (req, res, next) => {
    const claims = res.locals.claims;

    if (claims.role !== 'admin') {
        const error = new Error('Unauthorized Access');
        error.status = 403;
        return next(error);
    }

    next();
}

module.exports = {
    authenticate, 
    authorize
}