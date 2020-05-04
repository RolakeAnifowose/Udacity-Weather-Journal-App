/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=";
const apiKey = "&appid=c0d63d50a46291dc81fdd6a749835666";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Function to GET Web API Data*/
const getWeatherCondition = async (url) => {
    const response = await fetch(url) 
    try {
        const data = await response.json();
        console.log(data);
        return(data);
    } catch(error) {
        console.log("Error", error);
    }
}

//Async POST
let postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "http://localhost:8800/"
        },
        body: JSON.stringify(data)
    }) 
    try{
        const newData = await response.json();
        return newData;
    }catch (error) {
        console.log("Error", error);
    }
}

// Update UI
const updateUI = async () => {
    const request = await fetch('http://localhost:8800/all');
    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.temperature;
      console.log(allData.temperature);
      document.getElementById('content').innerHTML = allData.feelings;
  
    }catch(error){
      console.log("error", error);
    }
  }

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', getWeather);

/* Function called by event listener */
function getWeather(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeatherCondition(`${baseUrl}${zip}${apiKey}`)
    .then(
        function(data){
        //Add data to post request
        postData('http://localhost:8800/add', {temperature: data.main.temp, date: newDate, feelings: feelings});
    })
    .then(function(){
        updateUI()
    })
}