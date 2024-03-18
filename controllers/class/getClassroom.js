

const Classroom = require('../../models/classroom');

const getClassroom = (req, res, next) => {
    const classCode = req.body.classCode;
    Classroom.findOne({classCode: classCode})
        .then(classroom => {
            if (!classroom) {
                const err = new Error("Invalid classcode.");
                err.statusCode = 422;
                next(err);
            }

            res.json(classroom);
        })
        .catch(err => {
            next(err);
        })
}

module.exports = getClassroom;