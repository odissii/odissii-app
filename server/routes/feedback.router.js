const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET routes
 */
// gets all feedback where a manager ID matches the req.user.id
// will need to do a full join with the feedback_images table to get all associated feedback images
// and a join to get all follow-up records for all employees if no feedback has been given after the follow-up date
// should set a limit of responses
router.get('/', (req, res) => {
    
});
// gets all feedback from all supervisors (for a manager) where a manager ID matches the req.user.id
// will need to do a full join with the feedback_images table to get all associated feedback images
// and a join to get all follow-up records for all employees if no feedback has been given after the follow-up date
// should set a limit of responses
router.get('/supervisors/all', (req, res) => {
    if (req.isAuthenticated){
        const query = `SELECT "feedback"."id", "feedback"."supervisor_id", "employee_id", "date_created", "quality", "task_related", "culture_related", "details", "date_edited", "supervisor_manager"."manager_id" FROM "feedback" JOIN "supervisor_manager" ON "supervisor_manager"."supervisor_id" = "feedback"."supervisor_id" WHERE "manager_id" = $1;`;
        pool.query(query, [req.user.id]).then((results) => {
            res.send(results.rows); 
        }).catch((error) => {
            console.log('Error getting supervisor feedback', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});
// counts all praise, instruct, and correct feedback that a supervisor has given 
// req.query will contain the supervisor id 
// results are limited to 30. this can be a variable passed through the query if desired. 
router.get('/supervisors/count', (req, res) => {
    if (req.isAuthenticated){
        const supervisor = req.query.id; 
        const query = `SELECT "first_name", "last_name", COUNT ("quality"."id") as correct,
        (SELECT COUNT ("feedback"."quality") 
        FROM "feedback" 
        WHERE "feedback"."quality" = 3 AND "supervisor_id" = $1) as praise,
        (SELECT COUNT ("feedback"."quality")
        FROM "feedback" 
        WHERE "feedback"."quality" = 1 AND "supervisor_id" = $1) as instruct
    FROM "feedback" 
    JOIN "quality" 
    ON "quality"."id" = "feedback"."quality"
    JOIN "person" 
    ON "person"."id" = "feedback"."supervisor_id"
    WHERE "quality"."id" = 2
    AND "supervisor_id" = $1
    GROUP BY "feedback"."quality", "quality"."id", "first_name", "last_name";`;
        pool.query(query, [supervisor]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting quality count data', error);
            res.sendStatus(500); 
        })
    } else {
        res.sendStatus(403);
    }
})
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