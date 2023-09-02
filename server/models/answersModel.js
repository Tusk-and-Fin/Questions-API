const db = require('../db.js');

module.exports = {
  getAnswersByQuestionId: (questionId, page = 1, count = 5) => {
    /* All columns from the answers table, get all photo url in to a single arr,
    joining the photos table with the answers table on the condition
    that the id of the answers table matches the answer id in the photos table.
    Filtering the results to only include answers for a specific question.
    Grouping the results by answer id. */
    const text = 'SELECT answers.*, array_agg(photos.url) as photos FROM answers LEFT JOIN photos ON answers.id = photos.answer_id WHERE question_id = $1 GROUP BY answers.id LIMIT $2 OFFSET $3;';
    const offset = (page - 1) * count;
    const values = [questionId, count, offset];
    return db.query(text, values);
  },
  addAnswer: (questionId, body, name, email, photos) => {
    // Imediate get the id
    const text = 'INSERT INTO answers (question_id, body, date, answerer_name, answerer_email) VALUES ($1, $2, $3, $4, $5) RETURNING id;';
    const values = [questionId, body, Date.now(), name, email];
    return db.query(text, values)
      .then((response) => {
        const answerId = response.rows[0].id;
        if (photos.length > 0) {
          const photoText = 'INSERT INTO photos (answer_id, url) VALUES ($1, $2);';
          for (let url of photos) {
            db.query(photoText, [answerId, url]);
          }
        }
      });
  },
  updateAnswerHelpful: (answerId) => {
    const text = 'UPDATE answers SET helpful = helpful + 1 WHERE id = $1;';
    const values = [answerId];
    return db.query(text, values);
  },
  updateAnswerReport: (answerId) => {
    const text = 'UPDATE answers SET reported = true WHERE id = $1;';
    const values = [answerId];
    return db.query(text, values);
},
};
