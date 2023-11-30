import express from 'express'
import mongoose from 'mongoose'
import Tasks from './models/tasksModel.js';

const app=express()
app.use(express.json())
const port = 5555;


app.get('/', async(req, res)=>{
    const tasks = await Tasks.find()
    res.json(tasks)
})

app.post('/', async(req, res)=>{
    const { title, date, finished } = req.body;

    const newTask = new Tasks({
        title, date, finished
    });

    const task = await newTask.save();

    res.json(task)


})

app.put('/:id', async(req, res)=>{
    const { title, date, finished } = req.body;

    const task = await Tasks.findById(req.params.id)

    if (task) {

        task.title = title
        task.date = date
        task.finished=finished

        const updatedTask = await task.save();
        res.json(updatedTask)
    }

    
})

app.delete('/:id', async(req, res)=>{
    const task = await Tasks.findByIdAndDelete(req.params.id)
    res.json({message:"task deleted!"})
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

mongoose.connect("mongodb+srv://abdirahmankaahiye25:abdirahmankaahiye25@cluster0.gjedh8k.mongodb.net/mytasks?retryWrites=true&w=majority").then(()=>{
    console.log('Connected to database');
})



