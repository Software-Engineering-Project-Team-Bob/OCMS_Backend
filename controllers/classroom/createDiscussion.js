
const Discussion = require('../../models/discussion');


const createDiscussion = (req, res, next) => {
    const creatorName = req.body.creatorName;
    const creatorEmail = req.body.creatorEmail;
    const classCode = req.body.classCode;
    const imgLink = req.body.imgLink;
    const desc = req.body.desc;

    const discussion = new Discussion({
        creatorEmail: creatorEmail,
        creatorName: creatorName,
        classCode: classCode,
        imgLink: imgLink,
        desc: desc
    })
    
    discussion.save()
        .then(result => {
            res.json({message: "Discussion created successfully"});
        })
        .catch(err => {
            next(err);
        })
}


module.exports = {createDiscussion};