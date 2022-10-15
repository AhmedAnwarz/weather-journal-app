/* Global Variables */

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = (d.getMonth() + 1 )+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=3f18708a0866e937ef0a1e0a35d8459f&units=metric';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
    const zipID = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;

    getTemperture(baseURL, zipID, apiKey)
      .then((data) => {
        const temper = data.main.temp;
        console.log(data);
        postData('/postData', { date: newDate, temp: data.main.temp, feeling: feeling});
    })
    .then( (finalData) => {
      updateUI(finalData);
    })
};

/* Function to GET Web API Data*/
const getTemperture = async (baseURL, zip, key) =>{

    const res = await fetch(baseURL + zip + key)
    try {
        const data = await res.json();
        return data;
    } catch(error){
        console.log("error", error);
    }
}

/* Function to POST data */
async function postData( url = '', data = {}){
  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data), // body data type must match "Content-Type" header        
});

  try {
    console.log(data);
    //const newData = await response.json();
    return data
  }catch(error) {
  console.log("error", error);
  }
}

/* Function to GET Project Data */
  const updateUI = async (finalData) => {
    const request = await fetch('/getData');
    try{
      const finalData = await request.json();
      document.getElementById('date').innerHTML = 'Date: ' + finalData.date;
      document.getElementById('temp').innerHTML = 'Temperature: ' + finalData.temp;
      document.getElementById('content').innerHTML = 'Feelings: ' + finalData.feeling;
  
    }catch(error){
      console.log("error", error);
    }
  }