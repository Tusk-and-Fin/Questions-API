-- start：psql -U user postgres
-- run: \i database/schema.sql
-- database: \c qa

DROP TABLE IF EXISTS "questions";
CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date BIGINT,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful INT DEFAULT 0
);

DROP TABLE IF EXISTS "answers";
CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INT REFERENCES questions(id),
  body VARCHAR(1000) NOT NULL,
  date BIGINT,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful INT DEFAULT 0
);

DROP TABLE IF EXISTS "photos";
CREATE TABLE photos (
  id SERIAL PRIMARY KEY NOT NULL,
  answer_id INT REFERENCES answers(id),
  url VARCHAR(255) NOT NULL
);


-- load csv files into postgres database
COPY questions
From '/Users/lizhang/hack-reactor/Questions-API/csvData/questions.csv'
DELIMITER ','
CSV HEADER;

COPY answers
From '/Users/lizhang/hack-reactor/Questions-API/csvData/answers.csv'
DELIMITER ','
CSV HEADER;

COPY photos
From '/Users/lizhang/hack-reactor/Questions-API/csvData/answers_photos.csv'
DELIMITER ','
CSV HEADER;

-- Reset the SERIAL sequence to the max
SELECT setval(pg_get_serial_sequence('questions', 'id'), (SELECT MAX(id) FROM questions));
SELECT setval(pg_get_serial_sequence('answers', 'id'), (SELECT MAX(id) FROM answers));
SELECT setval(pg_get_serial_sequence('photos', 'id'), (SELECT MAX(id) FROM photos));
-- Indexes
CREATE INDEX questions_product_id_index ON questions (product_id);

CREATE INDEX answers_question_id_index ON answers (question_id);

CREATE INDEX photos_answer_id_index ON photos (answer_id);