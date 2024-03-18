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



router.post('/createClassroom', createClassroom);
router.post('/getClassrooms', isAuth, getClassrooms);
router.post('/joinClassroom', joinClassroom);
router.post('/getClassroom', getClassroom);
router.delete('/deleteClassroom', deleteClassroom);
router.post('/createDiscussion', createDiscussion);
router.post('/getDiscussions', getDiscussions);
router.post('/createAssignment', createAssignment);
router.post('/getAssignments', getAssignments);
router.post('/getAssignment', getAssignment);
router.post('/getReminders', getReminders);
router.post('/getAttendees', getAttendees);
router.post('/submitAssignment', submitAssignment);
router.post('/getSubmission', getSubmission);
router.delete('/deleteSubmission', deleteSubmission);
router.post('/getSubmissions', getSubmissions);
router.post('/setGrade', setGrade);

module.exports = router; 