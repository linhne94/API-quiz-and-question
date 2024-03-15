var express = require('express');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

const questionRouter = require('./route/question')
const quizRouter = require('./route/quiz');
const authRouter = require('./route/auth');

mongoose.set("strictQuery", false);
const connect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/PE-test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB connect successful.');
    } catch (err) {
        console.log('MongoDB connect fail');
    }
};


app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/questions', questionRouter)
app.use('/api/v1/quizzes', quizRouter)
app.use('/api/v1/auth', authRouter)

app.listen(port, () => {
    connect()
    console.log('server listening on port ', port)
})