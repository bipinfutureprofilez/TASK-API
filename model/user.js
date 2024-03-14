require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name!'],
    },
    email: {
        type: String,
        required: [true, 'Please provide email!'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter correct email!'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password!'],
        minLength: 5,
    }
})

userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createToken = function() {
    return jwt.sign({ userId: this._id, userName: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES })
}

userSchema.methods.checkPassword = function(candidatePassword) {
    isMatch = bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model('user', userSchema);