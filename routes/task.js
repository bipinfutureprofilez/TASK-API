
const express = require('express')
const router = express.Router()

const {
    getTask,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
} = require('../controllers/task')

router.route('/').get(getTask).post(createTask);
router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask);


module.exports = router