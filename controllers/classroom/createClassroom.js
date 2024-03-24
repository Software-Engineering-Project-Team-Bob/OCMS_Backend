

const Classroom = require('../../models/classroom');
const classCode = require('../../models/classCode');
const User = require('../../models/user');


const createClassroom = async (req, res, next) => {
    let currClassCode;
    await classCode.findOne().sort({code: -1}).then(obj => {
        currClassCode = obj ? obj.code + 1 : 1;
        const newClassCode = new classCode({ code: currClassCode });
        newClassCode.save();
    }).catch(err => {
        throw err;
    });

    const newClassroom = new Classroom({
        adminName: req.body.adminName,
        adminEmail: req.body.adminEmail,
        desc: req.body.desc,
        classCode: currClassCode, 
        className: req.body.className,
        meetLink: req.body.meetLink,
        fieldName: req.body.fieldName,
        classLevel: req.body.classLevel
    })
    
    newClassroom.save()
        .then(result => {
            User.findOne({email: req.body.adminEmail}).then(user => {
                user.classesOwned.push(currClassCode);
                user.save();
            }).catch(err => {
                next(err);
            })
            res.status(201).json({message: "Classroom created successfully"});
        })
        .catch(err => {
            next(err);
        })
}

module.exports = {createClassroom};