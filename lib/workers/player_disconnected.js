const DB = require('../db');

const connectionsRef = DB.ref('connections');

module.exports = function(data, progress, resolve, reject) {
  connectionsRef.child(`${data.server}-${data.id}`).update({
    connected: false
  })
  .then(() => {
    resolve();
  });
};
