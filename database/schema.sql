-- start：psql -U user postgres
-- run: \i database/schema.sql
-- database: \c qa

DROP TABLE IF EXISTS "questions";
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  date BIGINT,
  helpful INT DEFAULT 0,
  reported BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS "answers";
CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INT REFERENCES questions(id),
  body VARCHAR(1000) NOT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  date BIGINT,
  helpful INT DEFAULT 0,
  reported BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS "photos";
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
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