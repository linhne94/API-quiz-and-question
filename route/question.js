const express = require('express');
const questionRouter = express.Router();
const { verifyUser } = require('../utils/verifyToken')

const { getAllQuestions, getQuestionById, createQuestion, updateQuestionById, deleteQuestionById, deleteAllQuestion, createQuestionInQuiz } = require('../controller/questionController');

questionRouter.get('/', getAllQuestions);
questionRouter.delete('/', verifyUser, deleteAllQuestion);
questionRouter.post('/', verifyUser, createQuestion);
questionRouter.get('/:questionId', getQuestionById);
questionRouter.put('/:questionId', verifyUser, updateQuestionById);
questionRouter.delete('/:questionId', verifyUser, deleteQuestionById);


module.exports = questionRouter;