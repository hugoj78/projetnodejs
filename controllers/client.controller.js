// Require du model : Client, Facture
const Client = require('../models/client.model.js');
const Facture = require('../models/facture.model.js');

// Creation d'un client
exports.createClient = (req, res) => {
  // on recupère les informations qu'on stock dans un tableau
  let client = new Client({
    name : req.body.name,
    adresse : req.body.adresse,
    cp : req.body.cp,
    ville : req.body.ville,
    refname : req.body.refname,
    refprenom : req.body.refprenom,
    refposte : req.body.refposte,
    telephone : req.body.telephone,
    prospect : req.body.prospect
  })

  // on sauvegarde dans la base de données
  client.save((err) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Client Created');
    }
    res.send(client);
  })
}

// Update client
exports.updateUser = (req, res) => {
  Client.findByIdAndUpdate(req.body.id, req.body, function(err, client) {
    if(err){
       console.log(err);
     }
     console.log('client updated');
     res.send(req.body);
   })
  }

//delete by id
exports.deleteUser = function (req , res ) {
  const id = req.body.id;
  Client.findByIdAndDelete(id , function (err, client) {
    if(err){
      console.log(err);
    }
    console.log("Client deleted");
    res.send('Client deleted');
  })
}

exports.getOneClient = function(req, res){
  let id = req.params.id;
  Client.findById(id, function(err, client){
    if(err){
      console.log(err);
    }
    res.send(client);
  })
}

// Creation Facture
exports.createFacture = (req, res) => {

  Client.findOne({name : req.body.name}, (err, client) => {
    if (err) {
      console.log(err);
    }
    else {

      const fs = require('fs');

      if (fs.existsSync('invoices'+ '/' + req.body.name)) {
        console.log('file exist');
      }
      else {
        fs.mkdirSync(('./invoices/' + req.body.name), (err) => {
        console.log("repository created");
        })
      }


      Facture.find((err, fact) => {

        const count = fact.length +1

        // Require class : TaxClass
        const Ht = require ('../class/TaxClass.js');
        const Ttc = require ('../class/TtcClass.js');

        const clientHT = new Ht(req.body.cout, req.body.horaire);

        const ht = clientHT.calculateHT();

        const clientTTC = new Ttc(ht, req.body.priceTva)

        const ttc = clientTTC.calculateTTC();

        // On stock la date au moment present
        const date = new Date();

        const tva = req.body.tva;

        const content = `numero_facture : F${count}, \ninfo_client : ${req.body.name} - ${client.adresse} - ${client.cp} - ${client.ville}, \ndate : ${date}, \nprestation : ${req.body.prestation}, \nheure : ${req.body.horaire}, \nprix : ${req.body.cout}, \ncoutHT : ${ht}, \npriceTva : ${req.body.priceTva}, \ncoutTTC : ${ttc}`;

        fs.appendFile('invoices/' + req.body.name + '/F' + count + '.' + req.body.format, content, (err) => {
          if(err) {
            console.log(err);
          }
          else {
            console.log("file edited");
          }
        })

        let facture = new Facture({
          numero : 'F'+count,
          totalTTC : ttc
        })

        // on sauvegarde dans la base de données
        facture.save((err) => {
          if (err) {
            console.log(err);
          }
          else {
            console.log('Facture Created');
          }
          res.send(facture);
        })
        // On verifie que le dossier assets existe bien sinon on le recréer
        if (fs.existsSync('assets')) {
          console.log('assets repository exist');
        }
        else {
          fs.mkdirSync('assets', (err) => {
            console.log("assets repository created");
          })
        }

        fs.appendFile('./assets/facture.log', `date : ${date}, nom : ${client.name}\n`, (err) => {
          if(err) {
            console.log(err);
          }
          else {
            console.log("file edited");
          }
        })
      })
    }
  })
}

exports.getTotalTtc = (req, res) => {
  Facture.find((err, facture) => {
    if(err) {
      console.log(err);
    };

    let ttc = 0;

    for (let i = 0; i < facture.length; i++) {
      ttc += facture[i].totalTTC
    }
    res.send(`Prix Total TTC : ${ttc} € `);
  });
}

exports.createComm = (req, res) => {

  const fs = require('fs');

  if (fs.existsSync('notes'+ '/' + req.body.name)) {
    console.log('file exist');
  }
  else {
    fs.mkdirSync(('./notes/' + req.body.name), {recursive: true}, (err) => {
    console.log("repository created");
    })
  }

  if (req.body.qn === "true") {
    const content = `${req.body.note}\n${req.body.note2}\n`;

    fs.appendFileSync('./notes/' + req.body.name + '/notes.'+req.body.format , content, (err) => {
      if(err) {
        console.log(err);
      }
      else {
        console.log("note file edited");
      }
    })
  } else {
    const content = `${req.body.note}\n`;

    fs.appendFileSync('./notes/' + req.body.name + '/notes.'+req.body.format , content, (err) => {
      if(err) {
        console.log(err);
      }
      else {
        console.log("note file edited");
      }
    })
  }

}
