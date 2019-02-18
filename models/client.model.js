// Require mongoose
const mongoose = require('mongoose');
// Creation d'un Schema
const Schema = mongoose.Schema;

let ClientSchema = new Schema ({
  name : String,
  adresse : String,
  cp : Number,
  ville : String,
  refname : String,
  refprenom : String,
  refposte : String,
  telephone : Number,
  prospect : Boolean
});

// Exportation du model
module.exports = mongoose.model('Client', ClientSchema);
