# **Travel Log**

A full stack application / list places you have traveled.

## **TODO**

- [x] Setup Server 
    - [x] Install Dependencies 
    - [x] Install / Setup Linter 
    - [X] Setup Express App 
    - [X] Setup Not Found and Error Middlewares 

- [x] Setup Mongoose Model(s) 

- [x] POST /logs 
  - Create a new log entry

- [x]  GET /logs
  - List all log enteries

- [x] Setup Client

- [x] Create Form to add a new entry 
- [x] Setup Map SDK client
- [x] List all log on map
<!--
&nbsp;
- Using Server basic dependencies
  - morgan
  - helmet
  - cors
  - express
-->
<!--
- using server dev dependencies
  - eslint 
  - nodemon
 -->
<!--
- using eslint
  - npx eslint --init
-->
---
&nbsp;
 # Log Entry

 * Title - Text
 * Description - Text
 * Comments - Text
 * Rating - scale 1 - 100
 * Image - Text - URL
 * Latitude - Number
 * Longitude - Number 
 * Created At - DateTime
 * Update At - DateTime


---
<!--
&nbsp;
# Databse connection checking

``const { connection } = mongoose;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});``
-->
