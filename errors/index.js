const CustomAPIError = require('./customError')
const BadRequestError = require('./badRequestError')
const UnauthenticatedError = require('./unauthenticatedError')
const NotFoundError = require('./notFoundError')

module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthenticatedError,
    NotFoundError
}