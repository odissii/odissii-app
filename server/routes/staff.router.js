const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET routes
 */
// gets all employees or all managers 
// should join with person and get first_name, last_name, username, person.id, role_id
router.get('/', (req, res) => {
    
});
/**
 * POST routes 
 */
// creates a new employee in the employee table
router.post('/employee', (req, res) => {

});
// adds employee to employee_manager junction table
router.post('/employee/junction', (req, res) => {

});
// creates a new manager in the person table 
router.post('/manager', (req, res) => {

});
// add to the supervisor_manager junction table
router.post('/manager/junction', (req, res) => {

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
// deletes an employee's record 
router.delete('/employee', (req, res) => {

});
// deletes a manager 
router.delete('/manager', (req, res) => {

});
// deletes a manager/employee relationship 
router.delete('/manager/junction', (req, res) => {

});
module.exports = router;