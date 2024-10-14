const mongoose = require('mongoose')
const budgetModel = require('./models/budget_schema')


let url = 'mongodb://127.0.0.1:27017/personal-budget1';

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    
    budgetModel.find({})
    .then((data)=>{
        console.log(data);
        mongoose.connection.close();
    })
    .catch((connectionError)=>{
        console.log(connectionError)
    })
})
.catch((connectionError)=>{
    console.log(connectionError);
})