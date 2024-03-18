
const User = require('../../models/user');

const Assignment = require('../../models/assignment');


const getAssignment = (req, res, next) => {
    const assignmentId = req.body.assignmentId;
    Assignment.findById(assignmentId)
        .then(assignment => {
            User.findOne({email: assignment.creatorEmail})
                .then(user => {
                    res.json({...assignment._doc, creatorName: user.name});
                })
                .catch(err => {
                    next(err);
                })
        })
        .catch(err => {
            next(err);
        })
}


module.exports = getAssignment;