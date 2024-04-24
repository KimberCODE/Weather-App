const apiKey = '6027025999e349cb932143237242304';

const weatherUrl = 'http://api.weatherapi.com/v1';


//This is Current Weather for the Zip Entered
const currentWeather = weatherUrl + '/current.json?key=' + apiKey + '&q=';
const zipCodeBtn = document.getElementById('zip');
zipCodeBtn.addEventListener('click', function (event) {
    event.preventDefault()
    const headlines = document.getElementById('headline');
    headlines.innerHTML = '';
    const zipInput = document.getElementById('areaZip');
    const zipValue = zipInput.value



    fetch(currentWeather + zipValue).then((res) => {
        return res.json();

    })

        .then((data) => {
            const {
                location: { name, region, tz_id },
                current: { feelslike_f, humidity, precip_in, temp_f, wind_mph,
                    condition: { text, icon } }
            } = data;
            //Location:
            const cityName = document.getElementById('location');
            cityName.innerText = "Location " + name + ', ' + region;

            const timeZone = document.getElementById('short-description');
            timeZone.innerText = "Time Zone " + tz_id;
            //Current:
            const currentTemp = document.getElementById('current-temp');
            currentTemp.innerText = 'Current Temp ' + temp_f + '°';
            const feelsLike = document.getElementById('feels-like');
            feelsLike.innerText = "Feels Like " + feelslike_f + '°';
            const humid = document.getElementById('humid');
            humid.innerText = "Humidity " + humidity + '%';
            const rain = document.getElementById('rain');
            rain.innerText = "Rain " + precip_in + 'in';
            const wind = document.getElementById('wind');
            wind.innerText = "Wind " + wind_mph + 'mph';
            //Icon Condition:
            //THIS IS THE OLD ICON WAY
            // const statusIcon = document.getElementById('status-icon');
            // statusIcon.src = icon;

            //This was isnt working and i tried to add it dynamically but icon is still not appearing
            const statusImg = document.createElement('img');
            statusImg.classList.add('status-icon');
            statusImg.src = icon;
            headlines.appendChild(statusImg);




            // // Here i have declared all of my constant variables
            //         const locationImgBckgrnd = document.getElementById('location-img-bckgrd');
            //         const statusIcon = document.getElementById('status-icon');
            //         const btmContainerInfo = document.getElementById('btm-cont-info');
            //         const bottomDots = document.getElementById('precip-carousel-dots');


            //     });
            console.log(data);
        }).catch((err) => {
            console.error(err);
        });
});

