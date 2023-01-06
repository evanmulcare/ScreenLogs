//matches incoming requests, passes these requests to the corresponding controller function.

const express = require('express'); //setup for express router
const router = express.Router(); //instance of router
const logController = require('../controllers/logController'); //gives access to the controller and its functions.


//handlers for router
router.get('/report', logController.log_report);
router.get('/create', logController.log_create_get);
router.post('/logs', logController.log_create_post);
router.get('/logs/:id', logController.log_details);
router.get('/modify/:id', logController.log_modify_get);
router.post('/modify/:id', logController.log_modify_put);
router.delete('/logs/:id', logController.log_delete);

module.exports = router;    //export router with handlers to app.js