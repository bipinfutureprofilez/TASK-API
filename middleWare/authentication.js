const jwt = require('jsonwebtoken')
const User = require('../model/user')
const { UnauthenticatedError, NotFoundError } = require('../errors')

const authentication = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthenticatedError('Authentication error!');
        }

        let token = authHeader.split(' ')[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (!payload) {
            throw new UnauthenticatedError('Authentication error!');
        }

        const { userId, userName } = payload

        const user = await User.findById({ _id: userId }).select('-password');
        if (!user) {
            throw new NotFoundError(`User doesn't exist.`)
        }
        req.user = { user_Id: user._id, user_Name: user.name }
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = authentication