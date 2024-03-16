const mongoose = require("mongoose");

const mongoURL = "mongodb+srv://sagnibha123:Kantara123@cluster0.oxbtyti.mongodb.net/softD"

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect(mongoURL, connectionParams);
        console.log("Connected to database successfully");
    } catch (error) {
        console.log(error);
        console.log("Could not connect database!");
    }
};