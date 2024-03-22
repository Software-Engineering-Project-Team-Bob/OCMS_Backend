const Submission = require('../../models/submission');

const getGrade = async (req, res, next) => {
    const {submissionId} = req.body;
    try {
        const submission = await Submission .findById(submissionId);
        if(!submission){
            const error = new Error("Submission not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({grade: submission.grade});

    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
    
    
}

module.exports={getGrade}