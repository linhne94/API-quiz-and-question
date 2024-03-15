const Question = require('../model/question');
const Quiz = require('../model/quiz')

const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('questions');
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller for '/quizzes/:quizId' endpoint
const getQuizById = async (req, res) => {
    const { quizId } = req.params;
    try {
        const quiz = await Quiz.findById(quizId).populate('questions');
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createQuiz = async (req, res) => {
    const { title, description, questions } = req.body;
    try {
        const quiz = await Quiz.create({ title, description, questions });
        res.status(201).json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateQuizById = async (req, res) => {
    const { quizId } = req.params;
    const { title, description, questions } = req.body;
    try {
        const quiz = await Quiz.findByIdAndUpdate(quizId, { title, description, questions }, { new: true });
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAllQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.deleteMany({});
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteQuizById = async (req, res) => {
    const { quizId } = req.params;
    try {
        const quiz = await Quiz.findByIdAndDelete(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const populateQuizQuestionsByKeyword = async (req, res) => {
    const { quizId } = req.params;
    try {
        const quiz = await Quiz.findById(quizId).populate({
            path: 'questions',
            match: {
                text: { $regex: /capital/i }
            }
        });
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createQuestionInQuiz = async (req, res) => {
    const quizId = req.params.quizId;
    // console.log(quizId);
    const newQuestion = new Question(req.body);
    try {
        const question = await newQuestion.save();

        // console.log(question._id)

        const updateQuiz = await Quiz.findByIdAndUpdate(
            quizId,
            { $push: { questions: question._id } },
            { new: true }
        );

        if (!updateQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        res.status(201).json({ data1: question, data2: updateQuiz });
    } catch (error) {
        res.status(500).json({ message: "cc" + error.message });
    }
};

module.exports = {
    createQuiz,
    deleteQuizById,
    getAllQuizzes,
    getQuizById,
    updateQuizById,
    populateQuizQuestionsByKeyword,
    deleteAllQuiz,
    createQuestionInQuiz
}