const express = require('express');

const router = express.Router();
const questionsController = require('./controllers/questionsController.js');
const answersController = require('./controllers/answersController.js');

router.get('/qa/questions', questionsController.getQuestions);
router.get('/qa/questions/:question_id/answers', answersController.getAnswers);
router.post('/qa/questions', questionsController.addQuestion);
router.post('/qa/questions/:question_id/answers', answersController.addAnswer);
router.put('/qa/questions/:question_id/helpful', questionsController.updateQuestionHelpful);
router.put('/qa/answers/:answer_id/helpful', answersController.updateAnswerHelpful);
router.put('/qa/questions/:question_id/report', questionsController.updateQuestionReport);
router.put('/qa/answers/:answer_id/report', answersController.updateAnswerReport);
module.exports = router;
