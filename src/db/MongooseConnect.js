const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.DB_URL;
mongoose.set('strictQuery', true);

const connect = async () => {
    await mongoose.connect(url);
    console.log('connected!');
}

module.exports = { connect };