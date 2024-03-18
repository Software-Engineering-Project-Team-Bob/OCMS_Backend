const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User=require('../../models/user')
exports.signin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({email: email})
    .then(user => {
        if (!user) {
            const error = new Error("A user with this email could not be found!");
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
        if (!isEqual) {
            const error = new Error("Wrong Password!");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            }, 
            'secretKey',
            { expiresIn: '100h' }
        );
        res.status(200).json({
            token: token, 
            userId: loadedUser._id.toString(), 
            userName: loadedUser.name, 
            userEmail: loadedUser.email
        });
    })
    .catch(err => {
        next(err);
    })
}