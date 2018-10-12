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
    console.log('in GET /employee');
    const empFeedbackQuery = `SELECT "date_created", "quality_types"."name", "details"
                                FROM "feedback" 
                                JOIN "quality_types"
                                ON "feedback"."quality_id" = "quality_types"."id"
                                WHERE "employee_id" = 1
                                ORDER BY "date_created" DESC
                                LIMIT 10`;
    pool.query(empFeedbackQuery)
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('error in GET /employee', error);
        });
});
//will get all feedback count for specific employee
router.get('/employeeFeedbackCount/1', (req, res) => {
    console.log('in GET /employeeFeedbackCount');
    const empFeedbackCntQuery = `SELECT DISTINCT "employee"."first_name",
	                            (SELECT COUNT ("feedback"."quality_id")
	                            FROM "feedback" WHERE "feedback"."quality_id" = 1 AND "feedback"."employee_id" = 1) as Praise,
	                            (SELECT COUNT ("feedback"."quality_id")
	                            FROM "feedback" WHERE "feedback"."quality_id" = 2 AND "feedback"."employee_id" = 1) as Instruct,
	                            (SELECT COUNT ("feedback"."quality_id")
	                            FROM "feedback" WHERE "feedback"."quality_id" = 3 AND "feedback"."employee_id" = 1) as Correct
                                FROM "employee"
                                JOIN "feedback"
                                ON "feedback"."employee_id" = "employee"."id"
                                JOIN "quality_types"
                                ON "feedback"."quality_id" = "quality_types"."id"
                                WHERE "employee"."id" = 1
                                GROUP BY "employee"."id", "employee"."first_name", "quality_types"."name";`;
    pool.query(empFeedbackCntQuery)
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('error in GET/ employeeFeedbackCount', error);
        });

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