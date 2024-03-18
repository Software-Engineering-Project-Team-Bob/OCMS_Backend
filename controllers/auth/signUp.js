const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User=require('../../models/user')

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const contact = req.body.contact;

    User.findOne({email: email}).then(user => {
        console.log("User: ", user);
        if (user) {
            const err = new Error('Email already exists');
            err.statusCode = 403;
            return next(err);
        } else {
            bcrypt.hash(password, 12) 
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        name: name,
                        password: hashedPassword,
                        contact: contact
                    });
                    return user.save();
                })
                .then(result => {
                    const token = jwt.sign(
                        {
                            email: result.email,
                            userId: result._id.toString()
                        }, 
                        'secretKey',
                        { expiresIn: '100h' }
                    );
                    res.status(201).json({
                        message: "User Created", 
                        userId: result._id, 
                        token: token, 
                        userEmail: email, 
                        userName: name
                    });
                })
                .catch(err => {
                    next(err);
                })
        }
    })
}

