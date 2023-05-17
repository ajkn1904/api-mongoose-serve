const express = require('express');
const app = express();
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(express.json());
app.use(cors());





/*
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Database Connected Successfully.");
})


const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    sec: String,
    roll: Number,
    grade: String
});


const Student = mongoose.model('Student', studentSchema)

 app.post('/api/v1/student', (req, res,next)=>{
    res.send('working');
}) 

 app.get('/api/v1/students', async (req, res) => {
    try{
        const students = await Student.find({});
        res.send(students)
        }
        catch(e){
            res.status(400).json({
                error: e.massage,
            })
            }           
            
       }) */



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7splzic.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {

        await client.connect();

        const studentsCollection = client.db('apiMongoose').collection('students');


        app.get('/students', async (req, res) => {
            const query = { };
            const result = await studentsCollection.find(query).toArray()
            res.send(result)
        })


        app.post('/addStudent', async (req, res) => {
            const student = req.body
            const result = await studentsCollection.insertOne(student)
            res.send(result)
        })


         }
        finally {
    
        }
    }
    run().catch(console.log);
    
    


        app.get('/', async (req, res) => {
            res.send('api-mongo server is running')
        });

        app.listen(port, () => console.log(`api-mongo server is running on ${port}`));