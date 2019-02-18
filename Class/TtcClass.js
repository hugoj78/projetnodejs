// exports de la class Tax
module.exports = class Ttc {

  // Constructeur de la class Tax
  constructor(ht, tva) {
    this.ht = ht;
    this.tva = tva;
  }

  // Calcule prix TTC
  calculateTTC() {
    return this.ht + (this.ht * this.tva / 100);
  }
}
