
const Submission = require('../../models/submission');

const submitAssignment = (req, res, next) => {
    const studentName = req.body.studentName;
    const studentEmail = req.body.studentEmail;
    const assignmentId = req.body.assignmentId;
    const fileLink = req.body.fileLink;
    const classCode = req.body.classCode;
    const fileName = req.body.fileName;

    const submission = new Submission({
        studentName,
        studentEmail,
        fileLink,
        assignmentId,
        classCode,
        fileName
    })

    submission.save()
        .then(result => {
            res.json({message: "Submission created successfully"});
        })
        .catch(err => {
            next(err);
        })
}

module.exports = submitAssignment;