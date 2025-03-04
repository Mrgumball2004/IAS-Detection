import winston from 'winston';

// Create a logger instance
const logger = winston.createLogger({
  level: 'info', // Log level (e.g., 'info', 'warn', 'error')
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Human-readable timestamp
    winston.format.json() // Log in JSON format
  ),
  transports: [
    // Log to a file
    new winston.transports.File({ filename: 'logs/activity.log' }),
    // Log to the console (optional)
    new winston.transports.Console(),
  ],
});

export default logger;