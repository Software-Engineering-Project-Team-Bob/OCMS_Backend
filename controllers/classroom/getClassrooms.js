

const Classroom = require('../../models/classroom');

const User = require('../../models/user');


const getClassrooms = (req, res, next) => {
    const type = req.body.type;
    const userEmail = req.body.userEmail;
    if (type === "owned") {
        Classroom.find({adminEmail: userEmail})
            .then(results => {
                res.json(results);
            }).catch(err => {
                next(err);
            })
    } else if (type === "enrolled") {
        User.findOne({email: userEmail})
            .then(user => {
                Classroom.find({classCode: user.classesEnrolled})
                    .then(results => {
                        res.json(results);
                    })
                    .catch(err => {
                        next(err);
                    })
            }).catch(err => {
                next(err);
            })
    } else {
        const err = new Error("Invalid params");
        err.statusCode = 422;
        next(err);
    }
}

module.exports = {getClassrooms};