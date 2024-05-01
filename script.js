
//Here is my API key and endpoint
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
    headlines.style.margin = 0;

    const weatherBrkdwn = document.getElementById('weather-breakdowns');
    weatherBrkdwn.innerHTML = '';

    const zipInput = document.getElementById('areaZip');
    const zipValue = zipInput.value


    //-----------------------------------------------------------------------------------------
    //Here is my fetch from my API amd the .then() for what to do with my response information

    fetch(currentWeather + zipValue).then((res) => {
        return res.json();

    })
        .then((data) => {
            const {
                location: { name, region, tz_id },
                current: { feelslike_f, humidity, pressure_in, pressure_mb, precip_in, precip_mm, temp_f, wind_mph, wind_degree, wind_dir, gust_mph,
                    condition: { text, icon } }
            } = data;

            //Here I am dynamically creating and grabbing information from/on the HTML file

            //Location:
            const cityName = document.getElementById('location');
            cityName.innerText = name + ', ' + region;

            //Current:
            const timeZone = document.getElementById('short-description');
            timeZone.innerText = tz_id;
            const currentTemp = document.getElementById('current-temp');
            currentTemp.innerText = 'Current Temp ' + temp_f + '°';
            const feelsLike = document.getElementById('feels-like');
            feelsLike.innerText = "Feels Like " + feelslike_f + '°';

            //Icon:
            const iconCont = document.getElementById('icon-cont');
            iconCont.innerHTML = '';
            const statusImg = document.createElement('img');
            statusImg.classList.add('status-icon');
            statusImg.src = icon;
            iconCont.appendChild(statusImg);



            //-----------------------------------------------------------------

            //Precipitation Area:
            //These 3 functions pull together my text and circle buttons to do the same thing when clicked.

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
                    pressureMetric.style.margin = 0;
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
                    precipMM.style.margin = 0;
                    precipMM.innerText = precip_mm + ' mm';
                    weatherBrkdwn.appendChild(precipIn);
                    weatherBrkdwn.appendChild(precipMM);

                })
            }

            rainBtnEvent(rain);
            rainBtnEvent(rainCircleBtn);

            //Wind 

            const wind = document.getElementById('wind');
            const windCircleBtn = document.getElementById('circle-3');
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
                    windGust.style.margin = 0;
                    windGust.innerText = 'Gust: ' + gust_mph + 'mph';
                    weatherBrkdwn.appendChild(windMPH);
                    weatherBrkdwn.appendChild(windDeg);
                    weatherBrkdwn.appendChild(windDirect);
                    weatherBrkdwn.appendChild(windGust);

                })
            }
            windBtnEvent(wind);
            windBtnEvent(windCircleBtn);

            //-----------------------------------------------------------------------------

            //Here is my .catch() for errors logged to the console.

            console.log(data);
        }).catch((err) => {
            console.error(err);
        });
});

