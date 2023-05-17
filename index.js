const express = require('express');
const app = express();
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');


app.use(express.json());
app.use(cors());





mongoose.connect(process.env.DATABASE).then(()=> {
    console.log("Database Connected Successfully.");
})




app.get('/', async (req, res) => {
    res.send('api-mongo server is running')
});

app.listen(port, () => console.log(`api-mongo server is running on ${port}`));