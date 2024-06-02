require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const pagesPath = path.join(__dirname, 'pages');


const corsOptions = {
  origin: 'http://ocms-frontend.vercel.app',
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(pagesPath));


const classroomRoutes = require('./routes/classroom');
const authRoutes = require('./routes/auth');

app.use('/classes', classroomRoutes);
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
    // res.send("Welcome to OCMS Backend for Software Engineering Project ");
    res.sendFile(path.join(pagesPath, 'WelcomePage.html'));
})

// if ( process.env.NODE_ENV === "production" || 1) { 
//     app.use(express.static(path.join(__dirname, "../client/build"))); 
//     app.get("*", (req, res) => { 
//         res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')); 
//     })
// }

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.statusCode = 404;
    next(err);
})

app.use((err, req, res, next) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    res.status(status).json({message: message});
})

const DB_URL = process.env.MONGO_DB_URI;
const PORT= process.env.PORT || 5000;
mongoose.connect(DB_URL)
.then(result => {
    console.log("Connected to database");
    app.listen(5000,()=>console.log("Welcome to OCMS Backend"));
    console.log("Server started at port 5000");
    console.log("http://localhost:5000");
})
.catch(err => {
    console.log(err);
})
