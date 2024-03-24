const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const arraySchema = new Schema({
    day: {
        type: String
    },
    time: {
        startTime: {
            type: String
        },
        endTime: {
            type: String
        }
    }
})

const calenderschema=new Schema ({
    timetable:{
        type:[arraySchema],
        default:[]
    },
    classCode:{
        type:Number,
        required:true
    },
},
{
    timestamps:true
})

module.exports = mongoose.model('Calender',calenderschema)