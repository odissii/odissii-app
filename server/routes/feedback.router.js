const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET routes
 */
// gets all feedback for a specific supervisor, referenced by req.user.id
// will need to do a full join with the feedback_images table to get all associated feedback images
// and a join to get all follow-up records for all employees if no feedback has been given after the follow-up date
// should set a limit of responses
router.get('/', (req, res) => {
    
});
// gets all feedback created by all supervisors associated with a specific manager, who is referenced by req.user.id
// will need to do a full join with the feedback_images table to get all associated feedback images
// and a join to get all follow-up records for all employees if no feedback has been given after the follow-up date
// should set a limit of responses
router.get('/supervisors/all', (req, res) => {
    
});
// gets all feedback for a specific employee where a manager ID or supervisor ID matches the req.user.id
// will need to do a full join with the feedback_images table to get all associated feedback images
// and a join to get all follow-up records for all employees if no feedback has been given after the follow-up date
// should set a limit of responses
router.get('/employee', (req, res) => {
    
});
// gets the most recent feedback record submitted where the req.user.id matches the manager ID
// used to display the confirmation record 
router.get('/confirmation', (req, res) => {
    
});
/**
 * POST routes 
 */
// posts a new feedback record
router.post('/', (req, res) => {
  if (req.isAuthenticated() && req.user.role === 'supervisor') {
    const data = req.body;

    const queryText = 
    `INSERT INTO "feedback" (
      "supervisor_id", 
      "employee_id", 
      "date_created", 
      "quality", 
      "task_related", 
      "culture_related", 
      "details"
    ) VALUES ($1, $2, to_timestamp($3 / 1000.0), $4, $5, $6, $7);`;

    pool.query(queryText, [
      data.supervisorId, 
      data.employeeId,
      data.dateCreated,
      data.quality,
      data.taskRelated,
      data.cultureRelated,
      data.details
    ]).then(response => {
      console.log(`/api/feedback POST success:`, response);
      res.sendStatus(201);
    }).catch(error => {
      console.log(`/api/feedback POST error:`, error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
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