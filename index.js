const express = require('express');
const app = express();
const morgan = require('morgan');
const routes = require('./routes/app.routes');
const config = require('./config/app.config');
const limiter = require('./middlewares/ratelimit.middleware');
const logger =  require('./logger/app.logger');

// Configure morgan to use the logger function
app.use(morgan(config.APP.MORGAN_LEVEL, { stream: { write: logger } }));

// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));


// Apply rate limiting to the '/api/' route
app.use('/api/', limiter); 

// use the imported routes
app.use("/api/", routes);

// Error handler
app.use((error, req, res, next) => {
	if (!req) {
		return next(error);
	}
	res.status(error.status || 500).json({
		errors: {
			status: error.status || 500,
			name: error.name || "Unknown error",
			message: error.message || "Internal server error"
		}
	});
});

app.listen(config.APP.PORT, function(){
  console.log(`Server is running at http://localhost:${config.APP.PORT}`);
});