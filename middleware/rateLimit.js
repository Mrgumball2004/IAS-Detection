import rateLimit from 'express-rate-limit';
import logger from '../logger.js'; // Import the logger


// Global rate limiter: Applies to all routes
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  handler: (req, res) => {
    logger.warn(`Global rate limit exceeded - IP: ${req.ip}, Path: ${req.path}`);
    res.status(429).json({ message: 'Too many requests from this IP, please try again later.' });
  },
});

// Rate limiter for login endpoint
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: 'Too many login attempts, please try again later.',
  handler: (req, res) => {
    logger.warn(`Login rate limit exceeded - IP: ${req.ip}, Path: ${req.path}`);
    res.status(429).json({ message: 'Too many login attempts, please try again later.' });
  },
});