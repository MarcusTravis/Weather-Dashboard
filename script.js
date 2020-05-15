// GIVEN a weather dashboard with form inputs
    //using html, create divs needed for acceptance critera

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
    //make an input section for html to retrieve info for city
    //create onclick function for input button
    //use local storage to keep data inside divs or spans
    //button needs to make call to weather API
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=Gilbert,Arizona&appid=a2c6aeb70811d753296d3acafec7dceb";

      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
          console.log(results);
          console.log(response);
          console.log(response.main.temp);
          
          });


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