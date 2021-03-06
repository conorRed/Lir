let mongoose = require('mongoose');
var config = require('./env.json')[process.env.NODE_ENV || 'development'];

const user = 'conor'; // REPLACE WITH YOUR DB SERVER
const pass = 'c0n0rredingt0n';      // REPLACE WITH YOUR DB NAME
const db = config.database
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
    mongoose.Promise = Promise
  }
}

module.exports = new Database()
