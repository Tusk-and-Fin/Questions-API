const Answers = require('../models/answersModel.js');

module.exports = {
  getAnswers: (req, res) => {
    const questionId = req.params.question_id;
    const { page = 1, count = 5 } = req.query;

    Answers.getAnswersByQuestionId(questionId, page, count)
      .then((response) => {
        const result = {
          question: questionId,
          page,
          count,
          results: response.rows,
        }
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  addAnswer: (req, res) => {
    const questionId = req.params.question_id;
    const { body, name, email, photos = [] } = req.body;
    Answers.addAnswer(questionId, body, name, email, photos)
      .then(() => res.status(201).send('Answer added'))
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error adding answer');
      });
  },
  updateAnswerHelpful: (req, res) => {
    const answerId = req.params.answer_id;
    Answers.updateAnswerHelpful(answerId)
      .then(() => res.status(204).send())
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error updating answer as helpful');
      });
  },
  updateAnswerReport: (req, res) => {
    const answerId = req.params.answer_id;
    Answers.updateAnswerReport(answerId)
      .then(() => res.status(204).send())
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error reporting answer');
      });
  },
};
