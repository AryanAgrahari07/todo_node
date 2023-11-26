const { Task } = require("../models/task");


const newTask = async (req,res,next) => {

    const {title, description} = req.body;

    await Task.create({
        title, 
        description, 
        user: req.user,
    })

    res.status(201).json({
        success: true,
        message: "task added successfully",
    })
}

const getmytask = async (req,res,next) => {
    const userid = req.user._id;

    const tasks = await Task.find({user : userid});

    res.status(200).json({
        success:true,
        tasks,
    });
}

const updateTask = async (req,res,next) => {
    const {id} = req.params;

    const task = await Task.findById(id);

    task.isCompleted = !task.isCompleted;

    await task.save();
    res.json({
        success: true,
        message:"task updated",
    })
}


const deleteTask = async (req,res,next) => {
    const {id} = req.params;

    const task = await Task.findById(id);

    task.isCompleted = !task.isCompleted;

    if(!task){
        return res.json({
            success: true,
            message: "No task"
        })
    }
    await task.deleteOne();
    res.json({
        success: true,
        message:"task deleted",
    })
}

module.exports = {newTask , getmytask , updateTask, deleteTask}