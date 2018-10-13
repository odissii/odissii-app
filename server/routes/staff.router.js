const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET routes
 */
// get all supervisors associated with a manager (req.user.id)
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
//gets a specific supervisor's profile to edit their details or delete them 
router.get('/supervisor/profile', (req, res) => {
    if(req.isAuthenticated){
        const supervisor = req.query.id;
        const query = `SELECT "id", "username", "first_name", "last_name", "employeeId", "email_address" FROM "person" WHERE "id" = $1;`;
        pool.query(query, [supervisor]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting supervisor profile', error);
            res.sendStatus(500); 
        })
    } else {
        res.sendStatus(403); 
    }
})
//gets a specific employee's profile to edit their details or delete them
router.get('/employee/profile', (req, res) => {
    if(req.isAuthenticated){
        const employee = req.query.id;
        const query = `SELECT "id", "first_name", "last_name", "employee"."employeeId", "image_path" FROM "employee" WHERE "id" = $1;`;
        pool.query(query, [employee]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting employee profile', error);
            res.sendStatus(500); 
        })
    } else {
        res.sendStatus(403); 
    }
})
// get all employees associated with a supervisor
router.get('/employees/:id', (req, res) => {
    if(req.isAuthenticated()) {
        const query = `SELECT * FROM employee LEFT JOIN supervisor_employee 
                        ON "employee"."id" = "supervisor_employee"."employee_id" 
                        WHERE "supervisor_employee"."supervisor_id" = ($1);`;
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
    if (req.isAuthenticated){
        const detailsToEdit = req.body; 
        const query = `UPDATE "employee" SET "first_name" = $1, "last_name" = $2, "employeeId" = $3, "image_path" = $4 WHERE "id" = $5;`;
        pool.query(query, [detailsToEdit.first_name, detailsToEdit.last_name, detailsToEdit.employee_ID, detailsToEdit.image_path, detailsToEdit.id]).then((results)=>{
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error updating employee', error);
            res.sendStatus(500);
        })
    } else { 
        res.sendStatus(403);
    }
});
// edits a supervisor's record in person table 
router.put('/supervisor', (req, res) => {
    if (req.isAuthenticated){
        const detailsToEdit = req.body; 
        const query = `UPDATE "person" SET "first_name" = $1, "last_name" = $2, "employeeId" = $3, "email_address" = $4, "username" = $5 WHERE "id" = $6;`;
        pool.query(query, [detailsToEdit.first_name, detailsToEdit.last_name, detailsToEdit.employee_ID, detailsToEdit.email_address, detailsToEdit.username, detailsToEdit.id]).then((results)=>{
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error updating supervisor', error);
            res.sendStatus(500);
        })
    } else { 
        res.sendStatus(403);
    }
});

/**
 * DELETE routes
 */
//deletes employee from junction table and then deletes an employee's record 
router.delete('/employee', (req, res) => {
    if (req.isAuthenticated){
    //     const employeeToEdit = req.query.id; 
    //     console.log(employeeToEdit); 
    //     (async () => {
    //         const client = await pool.connect();
    //         try {
    //             await client.query('BEGIN');
    //     const query = `SELECT "feedback"."id" as "feedback_id", "feedback_images"."id" as "feedback_images_id" FROM "feedback" FULL OUTER JOIN "feedback_images" ON "feedback"."id" = "feedback_images"."feedback_id" WHERE "employee_id" = $1`; 
    //     const result = client.query(query, [employeeToEdit]);
    //     const feedbackToDelete = result.rows[0];
    //     query = ``
    //         res.sendStatus(200);
    //     }).catch((error) => {
    //         console.log('Error deleting employee', error);
    //         res.sendStatus(500);
    //     })
    } else {
        res.sendStatus(403); 
    }
});
// deletes a supervisor/employee relationship then deletes a supervisor record
router.delete('/supervisor', (req, res) => {
    if (req.isAuthenticated){
        const supervisorToDelete = req.query.id; 
        console.log('req.body', req.body);
    (async () => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
    const query = `DELETE FROM "supervisor_manager" WHERE "supervisor_id" = $1;`;
    const values = [supervisorToDelete]; 
    const result = await client.query(query, values); 
    query = `DELETE FROM "person" WHERE "id" = $1;`;
    const deleting = await client.query(query, values);      
    await client.query('COMMIT'); 
    res.sendStatus(200);
    } catch(error){
        console.log('ROLLBACK', error);
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
})().catch((error) => {
    console.log('CATCH', error); 
    res.sendStatus(500); 
})
    } else {
        res.sendStatus(403); 
    }
});

module.exports = router;