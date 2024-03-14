const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide task name!']
    },
    status: {
        type: String,
        enum: ['working', 'completed', 'pending'],
        message: '{VALUE} is not supported',
        default: 'working',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: [true, 'Please provide user authentication'],
    }
}, {timestamps: true})


module.exports = mongoose.model('task', taskSchema)