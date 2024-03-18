exports.deleteSubmission = (req, res, next) => {
    const assignmentId = req.body.assignmentId;
    const userEmail = req.body.userEmail;

    Submission.deleteOne({assignmentId: new ObjectId(assignmentId), userEmail: userEmail})
        .then(result => {
            res.json({message: "Submission deleted successfully."});
        })
        .catch(err => {
            next(err);
        })
}