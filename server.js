
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));

//Spin up the server
const port = 6060;
const server = app.listen(port, listening);


// Callback to debug
function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};

// GET route
app.get('/get', sendData)

function sendData (request, response) {
    response.send(projectData)
}

// POST route
app.post('/post', addData)

function addData (request, response) {
    projectData['date'] = request.body.date;
    projectData['temp'] = request.body.temp;
    projectData['location'] = request.body.location;
    projectData['content'] = request.body.content;
    response.send(projectData)
}
