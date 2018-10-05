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
// creates a new employee 
router.post('/employee', (req, res) => {

});
// creates a new manager 
router.post('/manager', (req, res) => {

});
/**
 * PUT routes
 */
// edits an employee's record 
router.put('/employee', (req, res) => {

});
// edits a manager's record 
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
module.exports = router;