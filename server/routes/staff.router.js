const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET routes
 */
// get all supervisors associated with a superisor (req.user.id)
// should join with person and get first_name, last_name, username, person.id, role_id
router.get('/supervisors', (req, res) => {
    if(req.isAuthenticated){
        const query = `SELECT "supervisor_id", "first_name", "last_name" FROM "supervisor_manager" JOIN "person" ON "supervisor_id" = "person"."id" WHERE "manager_id" = $1 ORDER BY "last_name";`;
        pool.query(query, [req.user.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting supervisors', error); 
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403); 
    }

});
// get all employees associated with a supervisor
router.get('/employees/:id', (req, res) => {
    if(req.isAuthenticated()) {
        const query = `SELECT "employee"."id", "employee"."employeeId", "employee"."first_name", "employee"."last_name", "employee"."image_path", "supervisor_employee"."supervisor_id", COUNT("follow_up"."id")  as incomplete 
        FROM "follow_up" 
        RIGHT JOIN "employee" ON "employee"."id" = "follow_up"."employee_id" AND "follow_up"."completed" = false
        JOIN "supervisor_employee" ON "supervisor_employee"."employee_id" = "employee"."id"
        WHERE "supervisor_employee"."supervisor_id" = ($1)
        GROUP BY "employee"."id", "supervisor_employee"."supervisor_id";`;
        pool.query(query, [req.params.id])
        .then((response) => {
            res.send(response.rows);
        }).catch((error) => {
            console.log('GET supervisors employees failed', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});
//this is getting all employees that exist
router.get('/allEmployees', (req, res) => {
    if(req.isAuthenticated()) {
        const query = `SELECT * FROM "employee";`;
        pool.query(query)
        .then((response) => {
            res.send(response.rows);
        }).catch((error) => {
            console.log('all employee GET failed', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});
/**
 * POST routes 
 */
// creates a new employee in the employee table and returns its id
// then adds employee to manager_employee junction table
router.post('/employee', (req, res) => {

});

// creates a new supervisor in the person table 
// then adds supervisor to the manager_supervisor junction table
router.post('/supervisor', (req, res) => {

});
/**
 * PUT routes
 */
// edits an employee's record 
router.put('/employee', (req, res) => {

});
// edits a supervisor's record in person table 
router.put('/supervisor', (req, res) => {

});
/**
 * DELETE routes
 */
//deletes employee from junction table and then deletes an employee's record 
router.delete('/employee', (req, res) => {

});
// deletes a supervisor/employee relationship then deletes a supervisor record
router.delete('/supervisor', (req, res) => {

});

module.exports = router;