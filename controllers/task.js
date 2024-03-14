const Task = require('../model/task')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')

const getTask = async (req, res) => {
    const { user_Id: user  } = req.user
    const tasks = await Task.find({ createdBy: user });
    res.status(StatusCodes.OK).json({ tasks })
}

const createTask = async (req, res) => {
    req.body.createdBy = req.user.user_Id;
    const task = await Task.create(req.body);
    res.status(StatusCodes.CREATED).json({ task });
}

const getSingleTask = async (req, res, next) => {
    try {
        const { id: taskId } = req.params
        const { user_Id: user } = req.user
        const task = await Task.findOne({ _id: taskId, createdBy: user });
        if (!task) {
            throw new NotFoundError(`Task not found with ${taskId}`);
        }
        res.status(StatusCodes.OK).json({ task });
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {
    try {
        const { id: taskId } = req.params;
        const { user_Id: user } = req.user;
        const task = await Task.findByIdAndUpdate({ _id: taskId, createdBy: user }, req.body, {new: true, runValidators: true});
        if (!task) {
            throw new NotFoundError(`Task not found with ${taskId}`);
        }
        res.status(StatusCodes.OK).json({ task });
    } catch (error) {
        next(error)
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const { id: taskId } = req.params;
        const { user_Id: user } = req.user;
        const task = await Task.findByIdAndDelete({ _id: taskId, createdBy: user });
        if (!task) {
            throw new NotFoundError(`Task not found with ${taskId}`);
        }
        res.status(StatusCodes.OK).json({ task });
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getTask,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
}