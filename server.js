const express = require('express');
const app = express();
const cors = require('cors')


const fs = require('fs');
const path = require('path');
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose')
const budgetModel = require('./Models/myschema')
let url = 'mongodb://127.0.0.1:27017/personal_budget'

app.get("/budget", (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to database")
            // Fetch
            budgetModel.find({})
                .then((data) => {
                    res.send(data);
                    mongoose.connection.close();
                })
                .catch((connectionError) => {
                    console.log(connectionError);
                })
        })
        .catch((connectionError) => {
            console.log(connectionError);
        })
})

app.get('/hello', (req,res) => {
    res.send('Hello World! This is Lokesh');
});
app.post("/addNewBudget", (req, res) => {

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            // Insert
            let newData = new budgetModel(req.body);
            budgetModel.insertMany(newData)
            .then((data)=>{

                res.send("Data Entered Successfully")
                mongoose.connection.close();
            })
            .catch((connectionError)=>{
                res.send(connectionError.message)
            })
        })
        .catch((connectionError) => {
            res.send(connectionError);
        })
})

app.listen(port,()=>{
    console.log(`Server is currently running on port ${port}`);
});