const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.DB_URL;
const client = new MongoClient(url);

// test purposes only, but I believe this db does not exist anymore
const dbName = process.env.DB_NAME;

const DbConnection = async () => {
    await client.connect();
    console.log('connected to server');
    return 'done';
}

module.exports = { DbConnection };
