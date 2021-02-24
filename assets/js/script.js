var key = '14bb1d92baeff91e514399e3a7d89745'
var city = 'charlotte'
var units = 'imperial'
var cityURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key + '&units=' + units;
var fiveDay = 'api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + key + '&units=' + units;
var lat = ;
var lon = ; 
var uv = 'http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid=14bb1d92baeff91e514399e3a7d89745'

// ***** use current weather lat and lon to pss on to uv ***********
fetch(cityURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })