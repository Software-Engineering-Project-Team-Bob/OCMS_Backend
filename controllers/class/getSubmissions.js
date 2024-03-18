
const Submission = require('../../models/submission');

const getSubmissions = (req, res, next) => {
    const assignmentId = req.body.assignmentId;
    Submission.find({assignmentId: assignmentId})
        .then(submissions => {
            res.json(submissions);
        })
        .catch(err => {
            next(err);
        })
}

module.exports = getSubmissions;