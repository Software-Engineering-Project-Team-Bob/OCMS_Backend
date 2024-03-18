exports.getAttendees = (req, res, next) => {
    const classCode = req.body.classCode;
    Classroom.findOne({classCode: classCode})
        .then(async classroom => {
            let users = [];
            for (let email of classroom.members) {
                await User.findOne({email: email})
                    .then(user => {
                        users.push({email: user.email, name: user.name, _id: user._id});
                    })
            }
            res.json(users);
        })
        .catch(err => {
            next(err);
        })
}