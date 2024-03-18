
const Assignment = require('../../models/assignment');


const getAssignments = (req, res, next) => {
    const classCode = req.body.classCode;
    Assignment.find({classCode: classCode}).sort({dueDate: 1})
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            next(err);
        })
}

module.exports = getAssignments;