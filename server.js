// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

// Callback to debug
function listening() {
    console.log("Server is running!");
    console.log("Server runs on port: " + port);
}

// Initialize all route with a callback function
app.get('/getData', (req, res) =>{
  res.send(projectData);
});
 
// Callback function to complete GET '/all'
// Post Route
app.post('/postData', (req, res) => {
  console.log(req.body);
  const newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    feeling: req.body.feeling
    };
    projectData = newEntry;
});