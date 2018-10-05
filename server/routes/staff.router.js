const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET routes
 */
// gets all employees or all managers  
router.get('/', (req, res) => {
    
});
/**
 * POST routes 
 */
// creates a new employee 
router.post('/', (req, res) => {

});
/**
 * PUT routes
 */
// edits an employee's record 
router.put('/', (req, res) => {

});
/**
 * DELETE routes
 */
// deletes an employee's record 
router.delete('/', (req, res) => {

});
module.exports = router;