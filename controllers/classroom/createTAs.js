const User=require('../../models/user');
const Classroom=require('../../models/classroom');

const createTAs=(req,res,next)=>{
    const classCode=req.body.classCode;
    const TAs=req.body.TAs;
    Classroom.findOne({classCode:classCode})
    .then(classroom=>{
        if(!classroom){
            const err = new Error("Classroom with given class code does not exists.");
            err.statusCode = 403;
            next(err);
        }
        if (classroom.TAs.indexOf(TAs) >= 0) {
            const err = new Error("TAs already Enrolled.");
            err.statusCode = 209;
            next(err);
        }
        classroom.TAs.push(TAs);
        classroom.members.push(TAs);
        return classroom.save();
    })
    .then(result=>{
        return User.findOne({email:TAs});
    })
    .then(user=>{
        if(user.classesOwned.indexOf(classCode)>=0){
            const err=new Error("TAs cannot enroll in class created by themselves.");
            err.statusCode=403;
            next(err);
        }
        user.classesEnrolled.push(classCode);
        return user.save();
    })
    .then(result=>{
        res.json({message:"TAs added successfully!"});
    })
    .catch(err=>{
        next(err);
    })
}

module.exports={createTAs};

