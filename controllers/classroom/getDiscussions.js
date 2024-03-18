
const Discussion = require('../../models/discussion');


const getDiscussions = (req, res, next) => {
    const classCode = req.body.classCode;
    Discussion.find({classCode: classCode})
        .then(discussions => {
            res.json(discussions);
        })
        .catch(err => {
            next(err);
        })
}

module.exports = {getDiscussions};