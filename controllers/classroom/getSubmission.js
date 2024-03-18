const ObjectId = require('mongoose').Types.ObjectId; 

const Submission = require('../../models/submission');

const getSubmission = (req, res, next) => {
    const assignmentId = req.body.assignmentId;
    const userEmail = req.body.userEmail;
    
    Submission.findOne({studentEmail: userEmail, assignmentId: new ObjectId(assignmentId)})
        .then(submission => {
            if (!submission) {
                const err = new Error("Submission not found.");
                err.statusCode = 422;
                next(err);
            } else {
                res.json(submission);
            }
        })
        .catch(err => {
            next(err);
        })
}

module.exports = {getSubmission};
