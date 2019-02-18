// Require mongoose
const mongoose = require('mongoose');
// Creation d'un Schema
const Schema = mongoose.Schema;

let FactureSchema = new Schema ({
  numero : String,
  totalTTC : Number
});

// Exportation du model
module.exports = mongoose.model('Facture', FactureSchema);
