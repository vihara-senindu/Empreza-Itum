const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  imagePath: { type: String, required: true } 

});

module.exports = mongoose.model('About', aboutSchema);