const express = require('express');

const router = express.Router();

const isAuth = require('../middlewares/is-auth')

const  createClassroom = require('../controllers/classroom/createClassroom');
const  getClassrooms = require('../controllers/classroom/getClassrooms');
const  joinClassroom = require('../controllers/classroom/joinClassroom');
const  getClassroom = require('../controllers/classroom/getClassroom');
const  deleteClassroom = require('../controllers/classroom/deleteClassroom');
const  createDiscussion = require('../controllers/classroom/createDiscussion');
const  getDiscussions = require('../controllers/classroom/getDiscussions');
const  createAssignment = require('../controllers/classroom/createAssignment');
const  getAssignments = require('../controllers/classroom/getAssignments');
const  getAssignment = require('../controllers/classroom/getAssignment');
const  getReminders = require('../controllers/classroom/getReminders');
const  getAttendees = require('../controllers/classroom/getAttendees');
const  submitAssignment = require('../controllers/classroom/submitAssignment');
const  getSubmission = require('../controllers/classroom/getSubmission');
const  deleteSubmission = require('../controllers/classroom/deleteSubmission');
const  getSubmissions = require('../controllers/classroom/getSubmissions');
const  setGrade = require('../controllers/classroom/setGrade');
const  setcalender = require('../controllers/classroom/createcalenderteacher');
const  getcalender = require('../controllers/classroom/createcalender');

// const getGrade=require('../controllers/classroom/getGrade');


router.post('/createClassroom', createClassroom.createClassroom);
router.post('/getClassrooms', isAuth, getClassrooms.getClassrooms);
router.post('/joinClassroom', joinClassroom.joinClassroom);
router.post('/getClassroom', getClassroom.getClassroom);
router.delete('/deleteClassroom', deleteClassroom.deleteClassroom);
router.post('/createDiscussion', createDiscussion.createDiscussion);
router.post('/getDiscussions', getDiscussions.getDiscussions);
router.post('/createAssignment', createAssignment.createAssignment);
router.post('/getAssignments', getAssignments.getAssignments);
router.post('/getAssignment', getAssignment.getAssignment);
router.post('/getReminders', getReminders.getReminders);
router.post('/getAttendees', getAttendees.getAttendees);
router.post('/submitAssignment', submitAssignment.submitAssignment);
router.post('/getSubmission', getSubmission.getSubmission);
router.delete('/deleteSubmission', deleteSubmission.deleteSubmission);
router.post('/getSubmissions', getSubmissions.getSubmissions);
router.post('/setGrade', setGrade.setGrade);
router.post('/setcalender', setcalender.setcalender);
router.post('/getcalender', getcalender.getcalender);

// router.post("/getGrade",getGrade.getGrade);

module.exports = router; 