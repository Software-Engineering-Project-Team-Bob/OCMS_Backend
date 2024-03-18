
const Assignment = require('../../models/assignment');


const createAssignment = (req, res, next) => {
    // console.log(req.body);

    const classCode = req.body.classCode;
    const name = req.body.name;
    const desc = req.body.desc;
    const dueDate = req.body.dueDate;
    const fileLink = req.body.fileLink;
    const creatorEmail = req.body.creatorEmail;

    const assignment = new Assignment({
        classCode: classCode,
        name: name,
        desc: desc,
        dueDate: dueDate,
        fileLink: fileLink,
        creatorEmail: creatorEmail
    })

    assignment.save()
        .then(result => {
            res.json({message: "Assignment created successfully"});
        })
        .catch(err => {
            next(err);
        })
}

module.exports = createAssignment;