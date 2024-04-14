const User=require('../../models/user');
const Classroom=require('../../models/classroom');

const createTAs=(req,res,next)=>{
    const classCode=req.body.classCode;
    const TAs=req.body.TAs;
    Classroom.findOne.updateOne({classCode:classCode},{$push:{TAs:TAs}})
    .then(classroom=>{
        if(!classroom){
            const err=new Error("ClassCode does not exists");
            err.statusCode=422;
            next(err);
        }
        TAs.forEach(async TAEmail=>{
            await User.findOne({email:TAEmail})
            .then(user=>{
                if(user){
                    user.classesEnrolled.push(classCode);
                    user.save();
                }
            })
            .catch(err=>{
                next(err);
            })
        })
        res.json({message:"TAs added successfully"});
    })
}

module.exports={createTAs};

