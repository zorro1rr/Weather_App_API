var city = document.querySelector('.city');
var temp = document.querySelector('.temp');
var humidity = document.querySelector('.humidity');
var wS = document.querySelector('.wS');
var description = document.querySelector('.description');
var container2 = document.querySelector('.container2');
var button = document.querySelector('.btn');

// Sanitize and encode all HTML in from a 3rd party
var sanitizeHTML = function(str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
};


function requestData(event) {
    //grab user input for city
    var userInput = document.querySelector(".userInput").value;

    // Set up our HTTP request
    var xhr = new XMLHttpRequest();
    // Setup our listener to process request state changes
    xhr.onreadystatechange = function() {
        // Only run if the request is complete
        if (xhr.readyState !== 4) return;
        // Process our return data
        if (xhr.status >= 200 && xhr.status < 300) {
            // This will run when the request is successful
            var data = JSON.parse(xhr.responseText);

            //Set background based on weather data
            switch (data.weather[0].main) {
                case 'Clear':
                    document.body.style.backgroundImage = 'url("clear.jpg")'
                    break;
                case 'Clouds':
                    document.body.style.backgroundImage = 'url("cloudy.jpg")'
                    break;
                case 'Rain':
                case 'Drizzle':
                case 'Mist':
                    document.body.style.backgroundImage = 'url("rain.jpg")'
                    break;
                case 'Thunderstorm':
                    document.body.style.backgroundImage = 'url("storm.jpg")'
                    break;
                case 'Snow':
                    document.body.style.backgroundImage = 'url("snow1.jpg?t=")'
                    break;
                default:
                    break;
            }




            var wCity = data.name;
            city.innerHTML = wCity;
            var weatherIcon = document.getElementById('icon').src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';


            var descrip = data.weather[0].description;
            description.innerHTML = 'Description: ' + descrip;
            var wtemp = data.main.temp;
            temp.innerHTML = 'Temperature: ' + Math.floor(data.main.temp) + '&#176' + ' F';
            var windSpeed = data.wind.speed;
            wS.innerHTML = 'Wind Speed: ' + Math.floor(data.wind.speed) + ' mph';
            var wHumidity = data.main.humidity;
            humidity.innerHTML = 'Humidity: ' + wHumidity + '%';
            console.log(xhr);
        } else {
            // This will run when it's not
            container2.textContent = 'Error retrieving weather data, refresh page and please try again later';
            console.log(xhr);
        }
    };


    // added + userInput + variable to the middle of api url
    xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&units=imperial&appid=b54143e0f03ddd73038c29263a7266bd');
    xhr.send();
}



//setup event listeners for click on button and enter in input field.
button.addEventListener('click', requestData, false);

uI.addEventListener("keypress", function(e) {
    var key = e.which || e.keyCode || 0;
    if (key === 13) {
        requestData();
    }
});
