const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET routes
 */
// gets all employees or all managers 
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
router.get('/employees', (req, res) => {
    
});
//this is getting all employees that exist
router.get('/allEmployees', (req, res) => {

});
/**
 * POST routes 
 */
// creates a new employee in the employee table and returns its id
// then adds employee to employee_manager junction table
router.post('/employee', (req, res) => {

});

// creates a new manager in the person table 
// then adds manager to the supervisor_manager junction table
router.post('/manager', (req, res) => {

});
/**
 * PUT routes
 */
// edits an employee's record 
router.put('/employee', (req, res) => {

});
// edits a manager's record in person table 
router.put('/manager', (req, res) => {

});
/**
 * DELETE routes
 */
//deletes employee from junction table and then deletes an employee's record 
router.delete('/employee', (req, res) => {

});
// deletes a manager/employee relationship then deletes a manager record
router.delete('/manager', (req, res) => {

});

module.exports = router;