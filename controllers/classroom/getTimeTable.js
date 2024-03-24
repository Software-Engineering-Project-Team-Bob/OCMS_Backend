const Calender = require('../../models/calender');



const getTimeTable = async (req, res, next) => {
    try {
        const classCode = req.body.classCode;
        console.log(classCode);

      
        if (!classCode) {
            return res.status(209).json({ message: "Class code is required" });
        }

       
        const timetable = await Calender.findOne({ classCode });

      
        if (!timetable) {
            return res.status(209).json({ message : "Timetable not found" });
        }

        const filteredTimeTable={
            timetable:timetable.timetable,
            classCode:timetable.classCode
        }

        res.status(200).json({data:filteredTimeTable,message:"success Fetched Timetable"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
        next(error)
    }
}

module.exports = {getTimeTable};

