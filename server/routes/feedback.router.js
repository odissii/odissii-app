const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET routes
 */
// gets all feedback where a manager ID matches the req.user.id
// will need to do a full join with the feedback_images table to get all associated feedback images  
router.get('/', (req, res) => {
    
});
// gets all feedback from all managers (for a supervisor) where a supervisor ID matches the req.user.id
router.get('/managers/all', (req, res) => {
    
});
// gets all feedback for a specific employee where a manager ID or supervisor ID matches the req.user.id
router.get('/employee', (req, res) => {
    
});
// gets the most recent feedback record submitted where the req.user.id matches the manager ID
// used to display the confirmation record 
router.get('/confirmation', (req, res) => {
    
});
// gets all follow-up records for an employee if no feedback has been given after the follow-up date
router.get('/followup', (req, res) => {
    
});
/**
 * POST routes 
 */
// posts a new feedback record
router.post('/', (req, res) => {

});
// adds images associated with a feedback record, using the ID of the feedback record
// this must occur after the feedback post   
router.post('/images', (req, res) => {

});
/**
 * PUT routes
 */
// edits a feedback record 
router.put('/', (req, res) => {

});
module.exports = router;