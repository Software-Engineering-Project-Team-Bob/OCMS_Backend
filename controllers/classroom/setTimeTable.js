
const Calender = require('../../models/calender');

const setTimeTable = async (req, res, next) => {
    try {
        const { day, time, classCode } = req.body;
        const { startTime, endTime } = time;
        const startTime1 = parseInt(startTime.slice(0, 2));
        const startTime2 = parseInt(startTime.slice(3, 5));
        const endTime1 = parseInt(endTime.slice(0, 2));
        const endTime2 = parseInt(endTime.slice(3, 5));



        if (!day || !time) {
            return res.status(209).json({ error: "Day and time are required" });
        }

        const lowercaseDay = day.toLowerCase();


        if (!["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].includes(lowercaseDay)) {
            return res.status(209).json({ error: "Day should be a valid day" });
        }


        if (!(startTime1 >= 0 && startTime1 < 24 && startTime2 >= 0 && startTime2 < 60 && endTime1 >= 0 && endTime1 < 24 && endTime2 >= 0 && endTime2 < 60)) {
            return res.status(209).json({ error: "Time should be in the format HH:MM-HH:MM" });
        }
        if (startTime1 > endTime1) {
            return res.status(209).json({ error: "End time should be greater than start time" });
        }
        if (startTime1 === endTime1 && startTime2 >= endTime2) {
            return res.status(209).json({ error: "End time should be greater than start time" });
        }

        const timetable = await Calender.findOne({ classCode: classCode });

        if (!timetable) {
            return res.status(209).json({ error: "Timetable not found" });
        }

        const data =
        {
            day: day,
            time: time
        }


        timetable.timetable.push(data);
        await timetable.save();

        res.status(200).json({ data: timetable }, { message: "Successfully updated TimeTable" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
        next(error)
    }
}

module.exports = { setTimeTable };
