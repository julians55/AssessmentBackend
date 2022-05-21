const express = require('express');
require('dotenv').config();

const configExpress = require('./config/express')
const connectDB = require('./config/database');
const routes = require('./routes/routes');

const app = express();

configExpress(app);
connectDB();
routes(app);

const port = process.env.PORT || 8080;

app.get('/', (req, res) =>{
    res.send("Assessment server");
})

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})