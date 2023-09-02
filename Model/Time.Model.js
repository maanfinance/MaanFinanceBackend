// models/countdownModel.js

const getCountdown = () => {
    const now = new Date();
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + 5);
    targetDate.setHours(now.getHours() + 60);
    targetDate.setMinutes(now.getMinutes() + 60);
    targetDate.setSeconds(now.getSeconds() + 60);
  
    let remainingTime = Math.max(targetDate - now, 0);
  
    const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
    remainingTime %= 24 * 60 * 60 * 1000;
    const hours = Math.floor(remainingTime / (60 * 60 * 1000));
    remainingTime %= 60 * 60 * 1000;
    const minutes = Math.floor(remainingTime / (60 * 1000));
    remainingTime %= 60 * 1000;
    const seconds = Math.floor(remainingTime / 1000);
  
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };
  
  module.exports = { getCountdown };
  