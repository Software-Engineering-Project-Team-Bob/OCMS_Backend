
const Submission = require('../../models/submission');

const setGrade = (req, res, next) => {
    const submissionId = req.body.submissionId;
    const grade = req.body.grade;
    Submission.findById(submissionId)
        .then(submission => {
            if (!submission) {
                const err = new Error("Submission not found.");
                err.statusCode = 422;
                next(err);
            }
            submission.grade = grade;
            submission.save()
                .then(result => {
                    res.json({message: "Grade saved successfully."});
                })
                .catch(err => {
                    next(err);
                })
        })
        .catch(err => {
            next(err);
        })
}

module.exports = setGrade;