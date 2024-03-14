const User = require('../model/user');
const {StatusCodes} = require('http-status-codes');
const { BadRequestError } = require('../errors')

const userRegister = async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.createToken();
    res.status(StatusCodes.CREATED).json({ user: {name: user.name}, token})
}

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new BadRequestError('Please provide email, password!');
        }
        const user = await User.findOne({ email });
        if (!user) {
            throw new BadRequestError('Credentials Invalid');
        }

        const isCorrectPassword = await user.checkPassword(password);
        if (!isCorrectPassword) {
            throw new BadRequestError('Credentials Invalid');
        }

        const token = user.createToken();

        res.status(StatusCodes.OK).json({user: {name: user.name}, token})

    } catch (error) {
        next(error)
    }
}

module.exports = {
    userRegister,
    userLogin
}

