const express = require('express');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./dbConnect/DbConnect')
const routes = require('./routes/routes')

dotenv.config({ path: './.env' });
const app = express();
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const port = process.env.PORT || 4000;


app.use(bodyParser.json());
app.use(cors());

const db = connectDB(host, user, password, database);

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use('/api', routes);


app.get('/', (req, res) => {
    res.json({ message: "Working" })
})


app.listen(port, () => {
    console.log(`server is running on ${port}`);
})



module.exports = app;

