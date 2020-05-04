// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
let express = require('express');
let bodyParser = require('body-parser')

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
let port = 8800;

const server = app.listen(port, listening);

function listening() {
    console.log("server running"); 
    console.log(`Server running on: ${port}`);
}

app.use(express.static('website'));

// Callback function to complete Get All
app.get('/all', (request, response) => {
    response.send(projectData);
    console.log("SendWeather called");
});

// Post route
app.post('/add', (request, response) => {
    console.log(request.body);
    projectData = {
        temperature : request.body.temperature,
        date : request.body.date,
        feelings : request.body.feelings
    };
    response.send(projectData);
    console.log(projectData);
});