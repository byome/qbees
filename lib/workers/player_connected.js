const DB = require('../db');

const connectionsRef = DB.ref('connections');
const playersRef = DB.ref('players');
const serversRef = DB.ref('servers');

module.exports = function(data, progress, resolve, reject) {
  playersRef
    .child(data.id)
    .once('value')
    .then((player) => {
      if (!player.exists()) {
        playersRef.child(data.id).set({ name: data.name });
        return playersRef.child(data.id);
      } else {
        return player.ref;
      }
    })
    .then((player) => {
      player.child(`servers/${data.server}`).set(true);
      serversRef.child(data.server).child(`players/${data.id}`).set(true);
      return player;
    })
    .then((player) => {
      connectionsRef.child(`${data.server}-${data.id}`).set({
        player: data.id,
        server: data.server,
        ipAddress: data.ipAddress,
        connected: true
      });
      serversRef.child(data.server).child(`connections/${data.server}-${data.id}`).set(true);
      player.child('connections').child(`${data.server}-${data.id}`).set(true);
    })
    .then(() => {
      resolve();
    });
};
