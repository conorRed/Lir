let mongoose = require('mongoose');

const user = 'conor'; // REPLACE WITH YOUR DB SERVER
const pass = 'c0n0rredingt0n';      // REPLACE WITH YOUR DB NAME
const db = 'stats_library_test'
const uri = 'mongodb+srv://'+user+':'+pass+'@cluster0-yobu8.mongodb.net/'

class Database {
  constructor() {
    this._connect()
  }

_connect() {
    mongoose.connect(uri, {useNewUrlParser: true, dbName: db})
         .then(() => {
           console.log('Database connection to ' + db + ' successful')
         })
         .catch(err => {
           console.error('Database connection error')
         })
    process.on('SIGINT', function() {
      mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });
    mongoose.Promise = Promise
  }
}

module.exports = new Database()
