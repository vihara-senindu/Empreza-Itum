const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema({
  targetDate: { type: Date, required: true },
  isEnabled: { type: Boolean, default: true },
  endMessage: { type: String, default: "EVENT STARTED!" }
});

module.exports = mongoose.model('Timer', timerSchema);