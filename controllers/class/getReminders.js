exports.getReminders = (req, res, next) => {
    const userEmail = req.body.userEmail;
    let reminders = [];
    User.findOne({email: userEmail})
        .then(async user => {
            if (!user) {
                const err = new Error("User does not exists.");
                err.statusCode = 422;
                next(err);
            }
            for(let enrolledClassCode of user.classesEnrolled) {
                await Assignment.find({classCode: enrolledClassCode, dueDate: {$gte: Date.now()}})
                    .then(results => {
                        reminders = reminders.concat(results);
                    })
            }

            reminders.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            res.json(reminders);
        })
        .catch(err => {
            next(err);
        })
}