const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  eventsCount: { type: String, default: "12" },
  teamsCount: { type: String, default: "48" },
  leadingTeam: { type: String, default: "IT" },
  finalsDate: { type: String, default: "Feb 5" }
});

module.exports = mongoose.model('Stats', statsSchema);