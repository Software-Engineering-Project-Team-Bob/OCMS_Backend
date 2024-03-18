const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User=require('../../models/user')

const verifyToken = (req, res, next) => {
    const token = req.body.token;
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secretKey');
        res.json({message: "Token verified."});
    } catch (error) {
        const err = new Error("Token expired. Please sign in again to continue");
        err.statusCode = 401;
        next(err);
    }
}

module.exports = verifyToken;