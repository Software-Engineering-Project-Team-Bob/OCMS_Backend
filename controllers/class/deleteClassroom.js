

const Classroom = require('../../models/classroom');
const User = require('../../models/user');
const Discussion = require('../../models/discussion');


exports.deleteClassroom = (req, res, next) => {
    const classCode = req.body.classCode;
    // console.log(classCode);
    Classroom.findOneAndDelete({classCode: classCode})
        .then(async classroom => {
            if (!classroom) {
                const err = new Error("ClassCode does not exists");
                err.statusCode = 422;
                next(err);
            } 

            classroom.members.forEach(async memberEmail => {
                await User.findOne({email: memberEmail})
                    .then(user => {
                        if (user) {
                            user.classesEnrolled = user.classesEnrolled.filter(classEnrolledCode => {
                                return classEnrolledCode.toString() !== classCode;
                            });

                            user.classesOwned = user.classesOwned.filter(classOwnedCode => {
                                return classOwnedCode.toString() !== classCode;
                            });

                            user.save();
                        }
                    })
                    .catch(err => {
                        next(err);
                    })
            })

            Discussion.deleteMany({classCode: classCode})
                .then(result => {
                    res.json({message: "Classroom deleted successfully"});
                })
                .catch(err => {
                    next(err);
                })

        })
        .catch(err => {
            next(err);
        })
}