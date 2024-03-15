const Question = require('../model/question');
const Quiz = require('../model/quiz');

const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getQuestionById = async (req, res) => {
    const { questionId } = req.params;
    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const createQuestion = async (req, res) => {
    const { text, options, keywords, correctAnswerIndex } = req.body;
    try {
        const question = await Question.create({ text, options, keywords, correctAnswerIndex });

        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ message: "cc" + error.message });
    }
};

const updateQuestionById = async (req, res) => {
    const { questionId } = req.params;
    const { text, options, keywords, correctAnswerIndex } = req.body;
    try {
        const question = await Question.findByIdAndUpdate(questionId, { text, options, keywords, correctAnswerIndex }, { new: true });
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteQuestionById = async (req, res) => {
    const { questionId } = req.params;
    try {
        const question = await Question.findByIdAndDelete(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAllQuestion = async (req, res) => {
    try {
        const question = await Question.deleteMany({});
        if (!question) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createQuestion,
    deleteQuestionById,
    getAllQuestions,
    getQuestionById,
    updateQuestionById,
    deleteAllQuestion
}