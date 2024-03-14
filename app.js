require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const helmet = require('helmet')
const cors = require('cors')
const { rateLimit } = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})

app.use(limiter)
app.use(helmet())
app.use(cors())
app.use(express.json())

const connectDB = require('./db/connect')

const authRouter = require('./routes/user')
const taskRouter = require('./routes/task')
const authentication = require('./middleWare/authentication')

app.use('/auth', authRouter);
app.use('/task', authentication, taskRouter)

const NotFoundMiddleware = require('./middleWare/notFoundMiddleware')
const errorHandler = require('./middleWare/errorHandler')

app.get('/', (req, res) => {
    res.send('<h1>Hello World...</h1>');
})
app.use(NotFoundMiddleware);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is running at ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start()



