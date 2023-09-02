const Questions = require('../models/questionsModel.js');

module.exports = {
  getQuestions: (req, res) => {
    const productId = req.query.product_id;
    const { page = 1, count = 5 } = req.query;
    Questions.getQuestionsByProductId(productId, page, count)
      .then((response) => {
        const result = {
          product_id: productId,
          results: response.rows,
        }
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error getting questions');
      });
  },
  addQuestion: (req, res) => {
    const { body, name, email } = req.body;
    const productId = req.body.product_id;
    console.log(`Body: ${body}, Name: ${name}, Email: ${email}, Product ID: ${productId}`);
    Questions.addQuestion(body, name, email, productId)
      .then(() => res.status(201).send('Question added'))
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error adding question');
      });
  },
  updateQuestionHelpful: (req, res) => {
    const questionId = req.params.question_id;
    Questions.updateQuestionHelpful(questionId)
      .then(() => res.status(204).send())
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error updating question as helpful');
      });
  },
  updateQuestionReport: (req, res) => {
    const questionId = req.params.question_id;
    Questions.updateQuestionReport(questionId)
      .then(() => res.status(204).send())
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error reporting question');
      });
  },
};
