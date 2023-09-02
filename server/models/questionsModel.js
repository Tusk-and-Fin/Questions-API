const db = require('../db.js');

module.exports = {
  getQuestionsByProductId: (productId, page = 1, count = 5) => {
    const text = 'SELECT * FROM questions WHERE product_id = $1 LIMIT $2 OFFSET $3;';
    const offset = (page - 1) * count;
    const values = [productId, count, offset];
    return db.query(text, values);
  },
  addQuestion: (body, name, email, productId) => {
    const text = 'INSERT INTO questions (product_id, body, date, asker_name, asker_email) VALUES ($1, $2, $3, $4, $5);';
    const values = [productId, body, Date.now(), name, email];
    return db.query(text, values);
  },
  updateQuestionHelpful: (questionId) => {
    const text = 'UPDATE questions SET helpful = helpful + 1 WHERE id = $1;';
    const values = [questionId];
    return db.query(text, values);
  },
  updateQuestionReport: (questionId) => {
    const text = 'UPDATE questions SET reported = true WHERE id = $1;';
    const values = [questionId];
    return db.query(text, values);
  },
};
