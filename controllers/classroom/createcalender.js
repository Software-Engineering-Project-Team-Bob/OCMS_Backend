const calender = require('../../models/calender');



const getcalender = async (req, res, next) => {
    try {
        const classCode = req.body.classCode;
        console.log(classCode);

      
        if (!classCode) {
            return res.status(400).json({ error: "Class code is required" });
        }

       
        const timetable = await calender.findOne({ classCode });

      
        if (!timetable) {
            return res.status(404).json({ error : "Timetable not found" });
        }

        const filteredTimeTable={
            timetable:timetable.timetable,
            classCode:timetable.classCode
        }

        res.status(200).json({data:filteredTimeTable,message:"success"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = {getcalender};
