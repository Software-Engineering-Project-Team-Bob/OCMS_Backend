const Calender = require('../../models/calender');

const setcalender = async (req, res, next) => {
    try {
        const { day, time, classCode } = req.body;
        const {startTime,endTime}=time;
        const startTime1=parseInt(startTime.slice(0,2));
        const startTime2=parseInt(startTime.slice(3,5));
        const endTime1=parseInt(endTime.slice(0,2));
        const endTime2=parseInt(endTime.slice(3,5));


        
        if (!day || !time) {
            return res.status(400).json({ error: "Day and time are required" });
        }
        console.log("hello");

        const lowercaseDay = day.toLowerCase();

       
        if (!["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].includes(lowercaseDay)) {
            return res.status(400).json({ error: "Day should be a valid day" });
        }

    //     if (!(parseInt(time[0]) >= 0 && parseInt(time[0]) <= 2 &&
    //     parseInt(time[1]) >= 0 && parseInt(time[1]) <= 9 &&
    //     time[2] === ":" &&
    //     parseInt(time[3]) >= 0 && parseInt(time[3]) <= 5 &&
    //     parseInt(time[4]) >= 0 && parseInt(time[4]) <= 9 &&
    //     time[5] === "-" &&
    //     parseInt(time[6]) >= 0 && parseInt(time[6]) <= 2 &&
    //     parseInt(time[7]) >= 0 && parseInt(time[7]) <= 9 &&
    //     time[8] === ":" &&
    //     parseInt(time[9]) >= 0 && parseInt(time[9]) <= 5 &&
    //     parseInt(time[10]) >= 0 && parseInt(time[10]) <= 9)) {
    //   return res.status(400).json({ error: "Time should be in the format HH:MM-HH:MM" });
//   }

       if(!(startTime1>=0 && startTime1<24 && startTime2>=0 && startTime2<60 && endTime1>=0 && endTime1<24 && endTime2>=0 && endTime2<60 )){
        return res.status(400).json({ error: "Time should be in the format HH:MM-HH:MM" });
       }
       if(startTime1>endTime1){
        return res.status(400).json({ error: "End time should be greater than start time" });
       }
       if(startTime1===endTime1 && startTime2>=endTime2){
        return res.status(400).json({ error: "End time should be greater than start time" });
       }

      

        const timetable = await Calender.findOne({ classCode:classCode });
         console.log("hello");
        // console.log(timetable);
       
        if (!timetable) {
            return res.status(404).json({ error: "Timetable not found" });
        }

        const data=
           {
            day: day,
            time: time
           }
        

        console.log(data);

        timetable.timetable.push (data);
        await timetable.save();

        res.status(200).json({data:timetable});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = {setcalender};
