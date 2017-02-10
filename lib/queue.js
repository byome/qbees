const Queue = require('firebase-queue');
const DB = require('./db');

const queueRef = DB.ref('queue');

module.exports = new Queue(queueRef, function(data, progress, resolve, reject) {
  let worker = require(`./workers/${data.event}`);
  worker(data, progress, resolve, reject);
});
