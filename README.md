# System Design for Questions And Answers Service

Table of Contents
- [Description](#description)
- [Author](#author)
- [Built With](#built-with)
- [Project Overview & Demos](#project-overview--demos)

 ## Description
To revamp the existing Questions and Answers service on the e-commerce platform, enhancing its capabilities, scalability, and efficiency.

## Authors

- [**Eric Chang**](https://github.com/ESC8504)

## Built With


- ![](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
- ![](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
- ![](https://img.shields.io/badge/-Express-black?style=flat-square&logo=express&logoColor=white)
- ![](https://img.shields.io/badge/-Amazon_AWS-232F3E?style=flat-square&logo=amazon-aws&logoColor=white)
- ![](https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white)
- ![](https://img.shields.io/badge/-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
- ![](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)
- ![](https://img.shields.io/badge/-NGINX-009639?style=flat-square&logo=nginx&logoColor=white)
- ![](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)



## Project Overview & Demos

In this project, I replaced the existing API with a backend system that can support the project's full data set and scale to meet the demands of production traffic. I ensured that the backend system was optimized for scalability to guarantee reliable performance, even during high-traffic periods. It was essential to ensure that our system not only supported the current user base but was also future-proofed to anticipate and accommodate significant user growth. The e-commerce platform is now better equipped to handle user queries efficiently, even as the platform's user base expands exponentially.

### Random product_id GET Questions and GET answers

Scaled to 1000 requests per second for random sampling and bias selection for records within the last 10% of the dataset, which contains 100,000 records.
The average response time is less than 3ms, and the error rate is 0%.
Optimizations: PostgreSQL indexing, load balancer with 4 AWS EC2 servers running
   qa/questions?product_id=%{*:900000-1000000} || 1000 requests per second || 1ms 0% error rate
   ![Random GET Questions Sample](./assets/getQuestions_1000.png){:height="200px" width="400px"}
   qa/questions/%{*:900000-1000000}/answers || 1000 requests per second || 3ms 0% error rate
   ![Random GET Answers Sample](./assets/getAnswers_1000.png){:height="200px" width="400px"}

### Random questions_id POST Questions and POST answers

Scaled to 1000 requests per second for random sampling and bias selection for records within the last 10% of the dataset, which contains 100,000 records.
The average response time is less than 6ms, and the error rate is 0%.
Optimizations: PostgreSQL indexing, load balancer with 4 AWS EC2 servers running
   qa/questions || 1000 requests per second || 6ms 0% error rate
   ![Random POST Questions Sample](./assets/postQuestions_1000.png){:height="200px" width="400px"}
   qa/questions/%{*:1-100000}/answers || 1000 requests per second || 6ms 0% error rate
   ![Random POST Answers Sample](./assets/postAnswers_1000.png){:height="200px" width="400px"}

### Repeating product_id GET

Scaled to 10k requests per second for records within the newest 100 product_id in the dataset.
The average response time is less than 3ms, and the error rate is 0%.
Optimizations: PostgreSQL indexing, load balancer with 4 AWS EC2 servers running, NGINX Content Caching.
   qa/questions?product_id=%{*:999900-1000000}
   ![Repeating GET Questions Sample](./assets/getQuestions_10000.png){:height="200px" width="400px"}



