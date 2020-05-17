// GIVEN a weather dashboard with form inputs
    //using html, create divs needed for acceptance critera

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
    //make an input section for html to retrieve info for city
    //create onclick function for input button
    //use local storage to keep data inside divs or spans
    //button needs to make call to weather API
    var leftCol = document.getElementById("leftCol");
    var rightCol = document.getElementById("rightCol");
    var input = document.createElement("input");
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var div3 = document.createElement("div");
    var cityInfoSpan = document.createElement("span");
    var tempSpan = document.createElement("span");
    var humidSpan = document.createElement("span");
    var windSpan = document.createElement("span");
    var UVSpan = document.createElement("div");
    var linebreak = document.createElement("br");
    // var div4 = document.createElement("div")
    var btn1 = document.createElement("button");
    
    leftCol.setAttribute("class", "h2 pl-5 pr-5 pb-5  border rounded bg-light");
    leftCol.appendChild(div1);
    leftCol.appendChild(div2);
    rightCol.appendChild(div3);
    
    div1.textContent = ("Search for a city:");
    div1.setAttribute("class", "h1");
    

    div2.appendChild(input);
    input.setAttribute("class", "mt-3");
    input.setAttribute("placeholder", "Search...");
    input.setAttribute("id", "input");
    div2.appendChild(btn1);
    btn1.setAttribute("class", "fa fa-search 3x bg-primary rounded border p-1 m-0 ml-1");
    
    div3.appendChild(cityInfoSpan);
    
    
    btn1.addEventListener("click", getInput) 
    
        function getInput() {

            let inputVal = document.getElementById("input").value;
            const city = inputVal;
            
            console.log(city);
            
            
            
            const queryURL1 = `http://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&appid=a2c6aeb70811d753296d3acafec7dceb`
            $.ajax({
                url: queryURL1,
                method: "GET"
            })
            .then(function(response) {

                const temp = response.main.temp;
                const wind = response.wind.speed;
                const humid = response.main.humidity;
                const lat = response.coord.lat
                const lon = response.coord.lon
                // console.log(response);
                
                div3.setAttribute("class", "border rounded")
                cityInfoSpan.innerText = (city);
                cityInfoSpan.setAttribute("class", "h1 navbar bg-light")

                div3.appendChild(tempSpan);
                tempSpan.innerText = ("Tempurature: " + temp);
                tempSpan.setAttribute("class", "h4 pt-3 rounded bg-white navbar");
                
                div3.appendChild(humidSpan);
                humidSpan.textContent = ("Humidity: " + humid);
                humidSpan.setAttribute("class", "h4 pt-3 navbar bg-light");
                
                div3.appendChild(windSpan);
                windSpan.textContent = ("Wind Speed: " + wind);
                windSpan.setAttribute("class", "h4 pt-3 rounded bg-white navbar");
                
                
                
                
                var queryURL2 = `http://api.openweathermap.org/data/2.5/uvi?appid=a2c6aeb70811d753296d3acafec7dceb&lat=${lat}&lon=${lon}`;
                $.ajax({
                    url: queryURL2,
                    method: "GET"
                })
                .then(function(response) {
                    // console.log(response)
                    const UV = response.value
                    
                    //Creates button to display UV value form API
                    var uvButton = document.createElement("button");
                    uvButton.textContent = (UV);
                    //Adds UV span inside div3
                    div3.appendChild(UVSpan);
                    //Adds content inside UV span
                    UVSpan.textContent = ("UV Index: ");
                    UVSpan.setAttribute("class", "h4 pt-3 pl-3 rounded bg-light");
                    //Adds uv button that displays uv value
                    UVSpan.appendChild(uvButton);
                    uvButton.setAttribute("class", "rounded")

                    //colors uv button background depending on how high or low uv index is.
                    if (response.value > 0) {
                        uvButton.setAttribute("class", "bg-success rounded");
                    }
                    if (response.value > 3) {
                        uvButton.setAttribute("class", "bg-warning rounded");
                    }
                    if (response.value > 7) {
                        uvButton.setAttribute("class", "bg-danger rounded");
                    }
                    
                });
            });
        }


        // WHEN I view current weather conditions for that city
    // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
    //display info retrieved for API
    
    // WHEN I view the UV index
    // THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
    //set class attributes to properly style uv index div using bootstrap
    
    // WHEN I view future weather conditions for that city
    // THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
    
    
    // WHEN I click on a city in the search history
    // THEN I am again presented with current and future conditions for that city
    
    // WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast