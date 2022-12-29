const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.DB_URL;
const client = new MongoClient(url);

const dbName = 'fran-db';

const DbConnection = async () => {
    await client.connect();
    console.log('connected to server');
    return 'done';
}

// const connect = () => {
//     DbConnection()
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
// //.finally(() => client.close());
// }

module.exports = { DbConnection };