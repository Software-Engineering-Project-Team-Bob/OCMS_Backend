

const Classroom = require('../../models/classroom');
const User = require('../../models/user');

const addTAs = async (req, res,next) => {
    console.log("Adding TA");
    console.log(req.body);
    const classCode=req.body.data.classCode;
    const email=req.body.data.email;
    Classroom.findOne({classCode: classCode})
    .then(classroom => {
        if (!classroom) {
            const err = new Error("Classroom with given class code does not exists.");
            err.statusCode = 403;
            next(err);
        }
        if (classroom.TeachingAssistants.indexOf(email) >= 0) {
            const err = new Error("User already Enrolled.");
            err.statusCode = 403;
            next(err);
        }
        classroom.adminEmail.push(email)
        classroom.members.push(email);
        classroom.TeachingAssistants.push(email);
        return classroom.save();
    })
    .then(result => {
        return User.findOne({email: email});
    })
    .then(user => {
        if (user.classesOwned.indexOf(classCode) >= 0) {
            const err = new Error("Users cannot enroll in class created by themselves.")
            err.statusCode = 403;
            next(err);
        }
        user.classesOwned.push(classCode);
        return user.save();

    })
    
    .then(result => {
        res.json({message: "TA added successfully!"});
    })
    .catch(err => {
        next(err);
    })
}

module.exports = {addTAs};