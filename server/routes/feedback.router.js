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
        const query = `SELECT DISTINCT "person"."first_name", "person"."last_name", "feedback"."supervisor_id" as "sid",
                                (SELECT COUNT ("feedback"."quality_id")
                                FROM "feedback"
                                WHERE "feedback"."quality_id" = 2 AND "feedback"."supervisor_id" = $1) as correct,
                                (SELECT COUNT ("feedback"."quality_id") 
                                FROM "feedback" 
                                WHERE "feedback"."quality_id" = 3 AND "feedback"."supervisor_id" = $1) as praise,
                                (SELECT COUNT ("feedback"."quality_id")
                                FROM "feedback" 
                                WHERE "feedback"."quality_id" = 1 AND "feedback"."supervisor_id" = $1) as instruct
                        FROM "feedback" 
                        JOIN "quality_types" 
                        ON "quality_types"."id" = "feedback"."quality_id"
                        JOIN "person" 
                        ON "person"."id" = "feedback"."supervisor_id"
                        WHERE "feedback"."supervisor_id" = $1
                        GROUP BY "feedback"."quality_id", "feedback"."supervisor_id", "quality_types"."id", "person"."first_name", "person"."last_name";`;
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