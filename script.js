const apiKey = '6027025999e349cb932143237242304';

const weatherUrl = 'http://api.weatherapi.com/v1';


//This is Current Weather for the Zip Entered
const currentWeather = weatherUrl + '/current.json?key=' + apiKey + '&q=';
const zipCodeBtn = document.getElementById('zip');
zipCodeBtn.addEventListener('click', function (event) {
    event.preventDefault()

    //This clears the info before the .fetch()
    const headlines = document.getElementById('headline');
    headlines.innerHTML = '';
    const weatherBrkdwn = document.getElementById('weather-breakdowns');
    weatherBrkdwn.innerHTML = '';

    const zipInput = document.getElementById('areaZip');
    const zipValue = zipInput.value


    //---------------------------------------------------------------------------------------

    // Create 3 functions at the top of the page that combine the individual precipitation buttons with the dots (no text) 


    // const bottomDots = document.getElementById('precip-carousel-dots');
    //-----------------------------------------------------------------------------------------
    fetch(currentWeather + zipValue).then((res) => {
        return res.json();

    })
        .then((data) => {
            const {
                location: { name, region, tz_id },
                current: { feelslike_f, humidity, pressure_in, pressure_mb, precip_in, precip_mm, temp_f, wind_mph, wind_degree, wind_dir, gust_mph,
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

            //This is how the mentor helped me get the icon working.
            const statusImg = document.createElement('img');
            statusImg.classList.add('status-icon');
            statusImg.src = icon;
            currentTemp.appendChild(statusImg);


//-----------------------------------------------------------------

        //Precipitation Area:

    //Humidity
            const humid = document.getElementById('humid');
            const humidCircleBtn = document.getElementById('circle-1');
            const humidityBtnEvent = (btn) => {
                btn.addEventListener('click', function () {
                    const headlines = document.getElementById('headline');
                    headlines.innerText = '';
                    const weatherBrkdwn = document.getElementById('weather-breakdowns');
                    weatherBrkdwn.innerHTML = '';
                    headlines.innerText = 'Humidity ';
                    const humidPercent = document.createElement('p');
                    humidPercent.innerText = "Humidity " + humidity + '%';
                    const pressureIn = document.createElement('p');
                    pressureIn.innerText = "Pressure " + pressure_in + 'in';
                    const pressureMetric = document.createElement('p');
                    pressureMetric.innerText = "Pressure (metric) " + pressure_mb + 'mb';
                    weatherBrkdwn.appendChild(humidPercent);
                    weatherBrkdwn.appendChild(pressureIn);
                    weatherBrkdwn.appendChild(pressureMetric);

                })
            }
            humidityBtnEvent(humid)
            humidityBtnEvent(humidCircleBtn)

    //Rain
            const rain = document.getElementById('rain');
            const rainCircleBtn = document.getElementById('circle-2');
            const rainBtnEvent = (btn) => {
                btn.addEventListener('click', function () {
                    const headlines = document.getElementById('headline');
                    headlines.innerText = '';
                    weatherBrkdwn.innerHTML = '';
                    headlines.innerText = 'Rain';
                    const precipIn = document.createElement('p');
                    precipIn.innerText = precip_in + ' in';
                    const precipMM = document.createElement('p');
                    precipMM.innerText = precip_mm + ' mm';
                    weatherBrkdwn.appendChild(precipIn);
                    weatherBrkdwn.appendChild(precipMM);
    
                })
            }    

            rainBtnEvent(rain);
            rainBtnEvent(rainCircleBtn);

    //Wind 

            const wind = document.getElementById('wind');
            const windCircleBtn = document.getElementById('circle-2');
            const windBtnEvent = (btn) => {
                btn.addEventListener('click', function () {
                    const headlines = document.getElementById('headline');
                    headlines.innerText = '';
                    const weatherBrkdwn = document.getElementById('weather-breakdowns');
                    weatherBrkdwn.innerHTML = '';
                    headlines.innerText = 'Wind';
                    //wind_mph, wind_degree, wind_dir, gust_mph
                    const windMPH = document.createElement('p');
                    windMPH.innerText = 'Speed: ' + wind_mph + 'mph';
                    const windDeg = document.createElement('p');
                    windDeg.innerText = wind_degree + '°';
                    const windDirect = document.createElement('p');
                    windDirect.innerText = wind_dir;
                    const windGust = document.createElement('p');
                    windGust.innerText = 'Gust: ' + gust_mph + 'mph';
                    weatherBrkdwn.appendChild(windMPH);
                    weatherBrkdwn.appendChild(windDeg);
                    weatherBrkdwn.appendChild(windDirect);
                    weatherBrkdwn.appendChild(windGust);
    
                })
            }
            windBtnEvent(wind);
            windBtnEvent(windCircleBtn);

            //---------------------------------------------------------------------------------

            //         const locationImgBckgrnd = document.getElementById('location-img-bckgrd');


            console.log(data);
        }).catch((err) => {
            console.error(err);
        });
});

