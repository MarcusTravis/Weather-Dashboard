    
    
    // GIVEN a weather dashboard with form inputs
    //using html, create divs needed for acceptance critera

    // WHEN I search for a city
    // THEN I am presented with current and future conditions for that city and that city is added to the search history
    //make an input section for html to retrieve info for city
    //create onclick function for input button
    //use local storage to keep data inside divs or spans
    //button needs to make call to weather API
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
    const body = document.getElementById("body");
    body.setAttribute("class", "bg-dark");

    //Header
    const header = document.getElementById("header");
    header.setAttribute("class", "col display-3 font-weight-bolder text-center pb-3 pt-3 bg-info text-dark");
    header.innerText = ("The Weather Dashboard");
    //Header

    //Main body
    const leftCol = document.getElementById("leftCol");
    const rightCol = document.getElementById("rightCol");
    const input = document.createElement("input");
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    const div4 = document.createElement("div");
    div4.setAttribute("id", "div4");
    //Main body

    //Variables of Current(today's) weather portion of info 
    const cityInfoSpan = document.createElement("span");
    const tempSpan = document.createElement("span");
    const humidSpan = document.createElement("span");
    const windSpan = document.createElement("span");
    const UVSpan = document.createElement("div");
    //Variables of Current(today's) weather portion of info 

    const linebreak = document.createElement("br");
    const btn1 = document.createElement("button");
    
    //Page is split between two main columns, a left and a right column
    leftCol.setAttribute("class", "h2 pl-5 pr-5 pb-5  border rounded bg-light");
    leftCol.appendChild(div1);
    leftCol.appendChild(div2);
    rightCol.appendChild(div3);
    rightCol.appendChild(div4);
    //Page is split between two main columns, a left and a right column
    
    //div1 goes inside leftCol
    div1.textContent = ("Search for a city:");
    div1.setAttribute("class", "h1");
    //div1 goes inside leftCol
    
    
    //div2 goes inside leftCol next to input element so the button has it's own dedicated spot 
    div2.appendChild(input);
    input.setAttribute("class", "mt-3 rounded");
    input.setAttribute("placeholder", "Search...");
    input.setAttribute("id", "input");
    div2.appendChild(btn1);
    btn1.setAttribute("class", "fa fa-search 3x bg-info rounded border p-1 m-0 ml-1");
    //div2 goes inside leftCol next to input element so the button has it's own dedicated spot
    
    //div3 goes inside rightCol and holds all the info for today's date and weather
    div3.appendChild(cityInfoSpan);
   
    //This is the button that brings the magic to the page! Must be clicked with a city name inside the input in order to work 
    btn1.addEventListener("click", getInput);
    
    //when user clicks on search button, we will want to turn input into string
    //add input value to variable then
    //turn value into a string then use setItem method to add string to local storage
    //take value  from local storage to create button or buttons and make event listener for quick searches

        
        //function that makes the button's magic happen
        function getInput() {
            
            
            //variable that get's user input and stores it in the URL for the ajax call
            const city = document.getElementById("input").value;
            console.log(city);
            
            
            //ajax call to get weather info
            const queryURL1 = `http://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&appid=a2c6aeb70811d753296d3acafec7dceb`
            $.ajax({
                url: queryURL1,
                method: "GET"
            })
            .then(function(response1) {
                //ajax call to get weather info
                
                //logs URL info into consle
                const icon = response1.weather[0].icon;
                const temp = response1.main.temp;
                const wind = response1.wind.speed;
                const humid = response1.main.humidity;
                const lat = response1.coord.lat
                const lon = response1.coord.lon
                console.log("Today's Weather response:");
                console.log(response1);
                //logs URL info into consle
                
                const m = moment();
                
                div3.setAttribute("class", "rounded")
                cityInfoSpan.innerText = (city + ",   " + m.format("MMMM Do YYYY"));
                cityInfoSpan.setAttribute("class", "h1 rounded navbar justify-content-start bg-light")
                const cityInfoDiv = document.createElement("div");
                cityInfoSpan.appendChild(cityInfoDiv);
                cityInfoDiv.innerHTML = ("<img src=\"http://openweathermap.org/img/wn/" + icon + "@2x.png\">");
                cityInfoDiv.setAttribute("class", "bg-info rounded-circle ml-5");
                
                
                div3.appendChild(tempSpan);
                tempSpan.innerText = ("Tempurature: " + temp + "\xB0 F");
                tempSpan.setAttribute("class", "h4 pt-3 pb-3 rounded navbar bg-white");
                
                div3.appendChild(humidSpan);
                humidSpan.textContent = ("Humidity: " + humid + "%");
                humidSpan.setAttribute("class", "h4 pt-3 pb-3 rounded navbar bg-light");
                
                div3.appendChild(windSpan);
                windSpan.textContent = ("Wind Speed: " + wind + " mph");
                windSpan.setAttribute("class", "h4 pt-3 pb-3 rounded navbar bg-white");
                
                
                
                
                const queryURL2 = `http://api.openweathermap.org/data/2.5/uvi?appid=a2c6aeb70811d753296d3acafec7dceb&lat=${lat}&lon=${lon}`;
                $.ajax({
                    url: queryURL2,
                    method: "GET"
                })
                .then(function(response2) {
                    console.log("UV Index response:")
                    console.log(response2)
                    const UV = response2.value
                    
                    //Creates button to display UV value form API
                    const uvButton = document.createElement("button");
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
                    
                    
                    const queryURL3 = `http://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${city}&appid=a2c6aeb70811d753296d3acafec7dceb`;
                    $.ajax({
                        url: queryURL3,
                        method: "GET"
                    })
                    .then(function(response3) {

                        
                        console.log("5 day forecast response:");
                        console.log(response3);
                        
                        const day1 = document.createElement("div");
                        const day1One = document.createElement("div");
                        const day1Two = document.createElement("div");
                        const day1Three = document.createElement("div");
                        
                        const day2 = document.createElement("div");
                        const day2One = document.createElement("div");
                        const day2Two = document.createElement("div");
                        const day2Three = document.createElement("div");
                        
                        
                        const day3 = document.createElement("div");
                        const day3One = document.createElement("div");
                        const day3Two = document.createElement("div");
                        const day3Three = document.createElement("div");
                        
                        const day4 = document.createElement("div");
                        const day4One = document.createElement("div");
                        const day4Two = document.createElement("div");
                        const day4Three = document.createElement("div");
                        
                        const day5 = document.createElement("div");
                        const day5One = document.createElement("div");
                        const day5Two = document.createElement("div");
                        const day5Three = document.createElement("div");
                        
                        //empties div4 before prepending
                        $("#div4").empty();

                        div4.appendChild(day1);
                        day1.appendChild(day1One);
                        day1.appendChild(day1Two);
                        day1.appendChild(day1Three);
                        
                        div4.appendChild(day2);
                        day2.appendChild(day2One);
                        day2.appendChild(day2Two);
                        day2.appendChild(day2Three);
                        
                        div4.appendChild(day3);
                        day3.appendChild(day3One);
                        day3.appendChild(day3Two);
                        day3.appendChild(day3Three);
                        
                        div4.appendChild(day4);
                        day4.appendChild(day4One);
                        day4.appendChild(day4Two);
                        day4.appendChild(day4Three);
                        
                        div4.appendChild(day5);
                        day5.appendChild(day5One);
                        day5.appendChild(day5Two);
                        day5.appendChild(day5Three);
                        div4.setAttribute("class", "mt-5")
                        
                        
                        const day1Icon = response3.list[4].weather[0].icon;
                        const day2Icon = response3.list[12].weather[0].icon;
                        const day3Icon = response3.list[20].weather[0].icon;
                        const day4Icon = response3.list[28].weather[0].icon;
                        const day5Icon = response3.list[36].weather[0].icon;
                        
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
                        
                        
                        day1.setAttribute("class", "d-inline-block h5 m-1 ml-2 p-3 bg-info rounded text-white")
                        day1One.innerText = (m.add(1, 'days').format("MMMM Do YYYY"));
                        day1Two.innerHTML = ("<img src=\"http://openweathermap.org/img/wn/" + day1Icon + "@2x.png\">");
                        day1Three.innerText = ("Temp: " + Math.round(day1temp) + "\xB0 F" + "\r\n" + "Humidity: " +  day1humidity + "%");
                        
                        
                        day2.setAttribute("class", "d-inline-block h5 m-1 p-3 bg-info rounded text-white")
                        day2One.innerText = (m.add(1, 'days').format("MMMM Do YYYY"));
                        day2Two.innerHTML = ("<img src=\"http://openweathermap.org/img/wn/" + day2Icon + "@2x.png\">");
                        day2Three.innerText = ("Temp: " + Math.round(day2temp) + "\xB0 F" + "\r\n" + "Humidity: " +  day2humidity + "%");
                        
                        
                        day3.setAttribute("class", "d-inline-block h5 m-1 p-3 bg-info rounded text-white")
                        day3One.innerText = (m.add(1, 'days').format("MMMM Do YYYY"));
                        day3Two.innerHTML = ("<img src=\"http://openweathermap.org/img/wn/" + day3Icon + "@2x.png\">");
                        day3Three.innerText = ("Temp: " + Math.round(day3temp) + "\xB0 F" + "\r\n" + "Humidity: " +  day3humidity + "%");
                        
                        
                        day4.setAttribute("class", "d-inline-block h5 m-1 p-3 bg-info rounded text-white")
                        day4One.innerText = (m.add(1, 'days').format("MMMM Do YYYY"));
                        day4Two.innerHTML = ("<img src=\"http://openweathermap.org/img/wn/" + day4Icon + "@2x.png\">");
                        day4Three.innerText = ("Temp: " + Math.round(day4temp) + "\xB0 F" + "\r\n" + "Humidity: " +  day4humidity + "%");
                        
                        
                        day5.setAttribute("class", "d-inline-block h5 m-1 p-3 bg-info rounded text-white") + "%"
                        day5One.innerText = (m.add(1, 'days').format("MMMM Do YYYY"));
                        day5Two.innerHTML = ("<img src=\"http://openweathermap.org/img/wn/" + day5Icon + "@2x.png\">");
                        day5Three.innerText = ("Temp: " + Math.round(day5temp) + "\xB0 F" + "\r\n" + "Humidity: " +  day5humidity + "%");
                        
                        day1One.setAttribute("class", "h4")
                        day2One.setAttribute("class", "h4")
                        day3One.setAttribute("class", "h4")
                        day4One.setAttribute("class", "h4")
                        day5One.setAttribute("class", "h4")
                        
                        
                        
                        
                    });  
                    
                });
            });
        }
    
        