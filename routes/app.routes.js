const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const todo = require('./todo.routes');


router.get('/', (req, res) => {
	res.status(200).json({
		message: 'Welcome! API is online.',
	});
});


/**
 * Route to the controller actions
 */
router.use('/todo', todo)


// 404 routes if no other route matches request this error will be sent to error handler.
router.use((req, res, next) => {
	next(createError(404, `Path: ${req.path} not found`));
});

module.exports = router;