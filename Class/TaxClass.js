// exports de la class Tax
module.exports = class Tax {

  // Constructeur de la class Tax
  constructor(horaire, cout) {
    this.horaire = horaire;
    this.cout = cout;
  }

  // Calcule prix HT
  calculateHT() {
    return (this.cout * this.horaire);
  }
}
