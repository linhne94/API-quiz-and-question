const express = require('express');
const quizRouter = express.Router();

const { getAllQuizzes, getQuizById, createQuiz, updateQuizById, deleteQuizById, populateQuizQuestionsByKeyword, deleteAllQuiz, createQuestionInQuiz } = require('../controller/quizController');
const { verifyUser } = require('../utils/verifyToken')

quizRouter.get('/', getAllQuizzes);
quizRouter.post('/', verifyUser, createQuiz);
quizRouter.post('/:quizId', verifyUser, createQuestionInQuiz);
quizRouter.delete('/', verifyUser, deleteAllQuiz);
quizRouter.get('/:quizId', getQuizById);
quizRouter.put('/:quizId', verifyUser, updateQuizById);
quizRouter.delete('/:quizId', verifyUser, deleteQuizById);
quizRouter.get('/:quizId/populate', populateQuizQuestionsByKeyword);

module.exports = quizRouter