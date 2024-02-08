const config = require('./../config/app.config');
const fs = require('fs').promises;

const logger = async (logData) => {
    const logFilePath = config.APP.BASE_PATH+'/logs/app.log';

    try {
      // Write log asynchronously
      await fs.appendFile(logFilePath, logData + '\n', 'utf8');
    } catch (error) {
      console.error('Error writing log:', error.message);
    }
  };
  
module.exports = logger;