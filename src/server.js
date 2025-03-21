const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { DbConnection } = require('./db/Connect');
const { connect } = require('./db/MongooseConnect');
const questionRoutes = require('./routes/QuestionRoutes');
const answerRoutes = require('./routes/AnswerRoutes');

console.log(connect())

const app = express();

app.use(express.json());
app.use(cors());
app.use(questionRoutes);
app.use(answerRoutes);

app.get('/api', (req, res) => {
    res.json({message: 'hello'})
});

const PORT = 8000;

app.listen(PORT || 8080, () => {
    console.log(`Application running on port ${PORT}`);
});