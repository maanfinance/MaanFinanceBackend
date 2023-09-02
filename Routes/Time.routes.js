// routes/countdownRoutes.js

const express = require('express');
const router = express.Router();
const { getCountdown } = require('../Model/Time.Model');

// Middleware to reduce countdown values
const countdownMiddleware = (req, res, next) => {
    const countdown = getCountdown();
    
    // Reduce the countdown values by 1 second
    countdown.seconds -= 1;
    if (countdown.seconds < 0) {
      countdown.seconds = 59;
      countdown.minutes -= 1;
      if (countdown.minutes < 0) {
        countdown.minutes = 59;
        countdown.hours -= 1;
        if (countdown.hours < 0) {
          countdown.hours = 23;
          countdown.days -= 1;
          if (countdown.days < 0) {
            // If countdown reached 0, reset to 0
            countdown.days = 0;
            countdown.hours = 0;
            countdown.minutes = 0;
            countdown.seconds = 0;
          }
        }
      }
    }
    
    // Update the countdown object
    req.countdown = countdown;
    next();
  };
// Route to get the current countdown values
router.get('/countdown', countdownMiddleware, (req, res) => {
  const countdown = getCountdown();
  res.json(countdown);
});

module.exports = router;
