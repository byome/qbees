const FirebaseAdmin = require('firebase-admin');

const Config = require('../config/config.json');
const Cert = require('../config/cert.json');

FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(Cert),
  databaseURL: Config.databaseURL
});

module.exports = db = FirebaseAdmin.database();
