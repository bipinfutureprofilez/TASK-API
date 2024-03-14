const {StatusCodes} = require('http-status-codes')

const notFoundMiddleware = (req, res) => {
    res.status(StatusCodes.NOT_FOUND).send('<h1>Not Found Route!</h1>');
}


module.exports = notFoundMiddleware
