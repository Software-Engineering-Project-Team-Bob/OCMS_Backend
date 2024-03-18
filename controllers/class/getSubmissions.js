exports.getSubmissions = (req, res, next) => {
    const assignmentId = req.body.assignmentId;
    Submission.find({assignmentId: assignmentId})
        .then(submissions => {
            res.json(submissions);
        })
        .catch(err => {
            next(err);
        })
}