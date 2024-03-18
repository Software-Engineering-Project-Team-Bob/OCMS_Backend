
const Discussion = require('../../models/discussion');


exports.getDiscussions = (req, res, next) => {
    const classCode = req.body.classCode;
    Discussion.find({classCode: classCode})
        .then(discussions => {
            res.json(discussions);
        })
        .catch(err => {
            next(err);
        })
}