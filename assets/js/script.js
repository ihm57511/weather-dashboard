
    const locations = [];
    
    function init() {
        renderHistory();
    }
    
    function renderHistory() {
        $('#cityList').empty()
        const storedLocations = JSON.parse(localStorage.getItem("locations"))
        if (storedLocations !== null) {
            for (let i = 0; i < storedLocations.length; i++) {
                const cityBtn = $('<button>')
                cityBtn.text(storedLocations[i]);
                cityBtn.attr('class', 'list-group-item list-group-item-action cityBtn');
                $('#cityList').append(cityBtn)
            }
        }
        let city = storedLocations[storedLocations.length - 1]
        getWeather(city)
    }

    function getWeather(city) {
    const key = '14bb1d92baeff91e514399e3a7d89745'
    // const city = locations[locations - 1]
    const units = 'imperial'
    const cityURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key + '&units=' + units;
    const fiveDay = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + key + '&units=' + units;

    fetch(cityURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (weatherToday) {
            $('#today').empty();
            let lat = weatherToday.coord.lat;
            let lon = weatherToday.coord.lat;
            const uv = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=14bb1d92baeff91e514399e3a7d89745'
            const today = $('#today');
            const date = moment().format('DD/MM/YYYY');
            const icon = 'http://openweathermap.org/img/wn/' + weatherToday.weather[0].icon + '.png'
            const cityInfo = `
            <h1>${weatherToday.name} (${date}) <img src=${icon}></h1>
            <p>Temperature:${weatherToday.main.temp}</p>
            <p>Humidity:${weatherToday.main.humidity}</p>
            <p>Wind Speed:${weatherToday.wind.speed}</p>
            `;
            today.append(cityInfo)
            fetch(uv)
                .then(function(response) {
                    return response.json();
                })
            .then(function (uvIndex) {
                // console.log(uvIndex)
                const uv = `
                <p>UV Index:${uvIndex.value}</p>
                `;
                today.append(uv)
            })

        });
        


    fetch(fiveDay)
        .then(function (response) {
            return response.json();
        })
        .then(function (fiveDayweather) {
            $('#five-day').empty();
            fiveDayweather.list.forEach(function (weatherObject) {
                if (moment.unix(weatherObject.dt).format("H") === "13") {
                    createCard(weatherObject);
                }
            })
        });
        
        
        function createCard(weather) {
                const date = moment.unix(weather.dt).format('MM/DD/YYYY');
                const icon = 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '.png';
                const temp = weather.main.temp;
                const humidity = weather.main.humidity;
                const card = $('<div>').addClass("card bg-primary text-white m-2 p-2")
                const cardBody = `
                <h2>${date}</h2>
                <p><img src=${icon}></p>
                <p>Temperature: ${temp}</p>
                <p>Humidity: ${humidity}</p>
                `;
                card.append(cardBody)
                $('#five-day').append(card);
            }
    }      

    $(".searchBtn").click(function (event) {
        event.preventDefault();
        const city = $('input').val()
        if(!locations.includes(city)) {
            locations.push(city)
        }
        localStorage.setItem('locations', JSON.stringify(locations)) 
        renderHistory()
    })

    $('.list-group-item').on('click', function () {
        let city = $(this).text();
        console.log(city)
        getWeather(city)
    })

init();
