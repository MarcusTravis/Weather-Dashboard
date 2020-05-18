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
    var div4 = document.createElement("div")
    var cityInfoSpan = document.createElement("span");
    var tempSpan = document.createElement("span");
    var humidSpan = document.createElement("span");
    var windSpan = document.createElement("span");
    var UVSpan = document.createElement("div");
    var linebreak = document.createElement("br");
    var btn1 = document.createElement("button");
    
    leftCol.setAttribute("class", "h2 pl-5 pr-5 pb-5  border rounded bg-light");
    leftCol.appendChild(div1);
    leftCol.appendChild(div2);
    rightCol.appendChild(div3);
    rightCol.appendChild(div4);
    
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
            .then(function(response1) {

                const temp = response1.main.temp;
                const wind = response1.wind.speed;
                const humid = response1.main.humidity;
                const lat = response1.coord.lat
                const lon = response1.coord.lon
                console.log("Today's Weather response:");
                console.log(response1);

                const m = moment();
                
                div3.setAttribute("class", "border rounded")
                cityInfoSpan.innerText = (city + ",   " + m.format("MMMM Do YYYY"));
                cityInfoSpan.setAttribute("class", "h1 navbar bg-light")

                div3.appendChild(tempSpan);
                tempSpan.innerText = ("Tempurature: " + temp + "\xB0 F");
                tempSpan.setAttribute("class", "h4 pt-3 rounded bg-white navbar");
                
                div3.appendChild(humidSpan);
                humidSpan.textContent = ("Humidity: " + humid + "%");
                humidSpan.setAttribute("class", "h4 pt-3 pb-3 navbar bg-light");
                
                div3.appendChild(windSpan);
                windSpan.textContent = ("Wind Speed: " + wind + " mph");
                windSpan.setAttribute("class", "h4 pt-3 rounded bg-white navbar");
                
                
                
                
                var queryURL2 = `http://api.openweathermap.org/data/2.5/uvi?appid=a2c6aeb70811d753296d3acafec7dceb&lat=${lat}&lon=${lon}`;
                $.ajax({
                    url: queryURL2,
                    method: "GET"
                })
                .then(function(response2) {
                    console.log("UV Index response:")
                    console.log(response2)
                    const UV = response2.value
                    
                    //Creates button to display UV value form API
                    var uvButton = document.createElement("button");
                    uvButton.textContent = (UV);
                    //Adds UV span inside div3
                    div3.appendChild(UVSpan);
                    //Adds content inside UV span
                    UVSpan.textContent = ("UV Index: ");
                    UVSpan.setAttribute("class", "h4 pt-3 pl-3 pb-3 mb-0 rounded bg-light");
                    //Adds uv button that displays uv value
                    UVSpan.appendChild(uvButton);
                    uvButton.setAttribute("class", "rounded")

                    //colors uv button background depending on how high or low uv index is.
                    if (response2.value > 0) {
                        uvButton.setAttribute("class", "bg-success rounded");
                    }
                    if (response2.value > 4) {
                        uvButton.setAttribute("class", "bg-warning rounded");
                    }
                    if (response2.value > 8) {
                        uvButton.setAttribute("class", "bg-danger rounded");
                    }


                        var queryURL3 = `http://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${city}&appid=a2c6aeb70811d753296d3acafec7dceb`;
                    $.ajax({
                        url: queryURL3,
                        method: "GET"
                    })
                    .then(function(response3) {
                    
                        console.log("5 day forecast response:");
                        console.log(response3);

                        const day1 = document.createElement("div");
                        const day2 = document.createElement("div");
                        const day3 = document.createElement("div");
                        const day4 = document.createElement("div");
                        const day5 = document.createElement("div");

                        div4.appendChild(day1);
                        div4.appendChild(day2);
                        div4.appendChild(day3);
                        div4.appendChild(day4);
                        div4.appendChild(day5);
                        div4.setAttribute("class", "mt-5")

                        
                        const day1Icon = response3.list[4].weather[0].description;
                        const day2Icon = response3.list[12].weather[0].description;
                        const day3Icon = response3.list[20].weather[0].description;
                        const day4Icon = response3.list[28].weather[0].description;
                        const day5Icon = response3.list[36].weather[0].description;
                        
                        const day1temp = response3.list[4].main.temp
                        const day2temp = response3.list[12].main.temp
                        const day3temp = response3.list[20].main.temp
                        const day4temp = response3.list[28].main.temp
                        const day5temp = response3.list[36].main.temp
                        
                        const day1humidity = response3.list[4].main.humidity
                        const day2humidity = response3.list[12].main.humidity
                        const day3humidity = response3.list[20].main.humidity
                        const day4humidity = response3.list[28].main.humidity
                        const day5humidity = response3.list[36].main.humidity
                        
                        
                        day1.innerText = (m.add(1, 'days').format("MMMM Do YYYY") + "\r\n" + "" + day1Icon + "\r\n" + "Temp: " + Math.round(day1temp) + "\xB0 F" + "\r\n" + "Humidity: " +  day1humidity + "%");
                        day1.setAttribute("class", "d-inline-block h4 m-1 ml-2 p-3 bg-primary rounded text-white")
                        
                        day2.innerText = (m.add(1, 'days').format("MMMM Do YYYY") + "\r\n" + "" + day2Icon + "\r\n" + "Temp: " + Math.round(day2temp) + "\xB0 F" + "\r\n" + "Humidity: " +  day2humidity + "%");
                        day2.setAttribute("class", "d-inline-block h4 m-1 p-3 bg-primary rounded text-white")
                        
                        day3.innerText = (m.add(1, 'days').format("MMMM Do YYYY") + "\r\n" + "" + day3Icon + "\r\n" + "Temp: " + Math.round(day3temp) + "\xB0 F" + "\r\n" + "Humidity: " +  day3humidity + "%");
                        day3.setAttribute("class", "d-inline-block h4 m-1 p-3 bg-primary rounded text-white")
                        
                        day4.innerText = (m.add(1, 'days').format("MMMM Do YYYY") + "\r\n" + "" + day4Icon + "\r\n" + "Temp: " + Math.round(day4temp) + "\xB0 F" + "\r\n" + "Humidity: " +  day4humidity + "%");
                        day4.setAttribute("class", "d-inline-block h4 m-1 p-3 bg-primary rounded text-white")
                        
                        day5.innerText = (m.add(1, 'days').format("MMMM Do YYYY") + "\r\n" + "" + day5Icon + "\r\n" + "Temp: " + Math.round(day5temp) + "\xB0 F" + "\r\n" + "Humidity: " +  day5humidity + "%");
                        day5.setAttribute("class", "d-inline-block h4 m-1 p-3 bg-primary rounded text-white") + "%"
                        
                        
                        
                        
                    });  
                    
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