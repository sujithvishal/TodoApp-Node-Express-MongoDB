const express= require("express");
const mongoose = require('mongoose');
const TodoModel = require('./models/todoModel');

const app = express();

//mongodb connection
mongoose.connect('mongodb+srv://username:password@cluster0.y7hzl.mongodb.net/todoDb?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(result=> app.listen(8080,()=>console.log('done..')))
.catch(err => console.log(err));
app.set('view engine','ejs');

//Middlewares
app.use(express.urlencoded({extended:true}));
app.use('/assets',express.static('assets'))

//Routes
app.get('/',(req,res)=>{
    TodoModel.find()
    .then(result=> res.render('index',{todos:result}))
    .catch(err=> console.log(err));
})

app.post('/',(req,res)=>{
    const todoModel = new TodoModel(req.body);
    todoModel.save()
    .then(result => res.redirect('/'))
    .catch(err=> console.log(err));
})

app.get('/todo/:id',(req,res)=>{
    TodoModel.findByIdAndDelete(req.params.id)
    .then(result => res.redirect('/'))
    .catch(err => console.log(err));
})


