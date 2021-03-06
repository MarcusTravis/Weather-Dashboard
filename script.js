
//Main body
const leftCol = document.getElementById("leftCol");
const rightCol = document.getElementById("rightCol");
const div1 = document.getElementById("div1");
const div2 = document.getElementById("div2");
const cityInfoSpan = document.getElementById("CIS");
const tempSpan = document.getElementById("tempSpan");
const humidSpan = document.getElementById("humidSpan");
const windSpan = document.getElementById("windSpan");

const UVSpan = document.createElement("div");

const linebreak = document.createElement("br");
const btn1 = document.getElementById("btn1");

let div5 = document.createElement("div");

function addText() {
  document.getElementById("input").innerHTML = e;
}

const localStorageString = localStorage.getItem("city");
let localStorageArray;

    if (localStorageString) {
    localStorageArray = JSON.parse(localStorageString);
    for (let i = 0; i < localStorageArray.length; i++) {
        let userInputSpan = document.createElement("button");
        userInputSpan.setAttribute("class", "bg-info rounded border text-center");
        userInputSpan.setAttribute("style", "width: 200px;");
        userInputSpan.setAttribute("value", localStorageArray[i]);
        userInputSpan.textContent = localStorageArray[i];
        div2.appendChild(div5);
        div5.prepend(userInputSpan);
        div5.setAttribute("id", "div5");
        div5.setAttribute("class", "d-flex flex-column justify-content-center");

        userInputSpan.addEventListener("click", addText);
        function addText() {
            if (userInputSpan === "") {
                return;
            }
            console.log(userInputSpan);
            document.getElementById("input").value = userInputSpan.textContent;
        }
    }
    } else {
    localStorageArray = [];
    localStorage.setItem("city", JSON.stringify(localStorageArray));
    }

    function clearAll() {
      localStorage.clear();
      window.location.reload();
    }
    
// This is the button that brings the magic to the page! Must be clicked with a city name inside the input in order to work
btn1.addEventListener("click", getInput);
//function that makes the button's magic happen
function getInput() {
  
  if (document.getElementById("input").value === "") {
    return;
  }
  // add a span with the user input inside span
  const div5 = document.createElement("div");
  const userInputSpan = document.createElement("button");
  userInputSpan.setAttribute("class", "bg-info rounded border text-center");
  userInputSpan.setAttribute("style", "width: 200px;");
  div2.appendChild(div5);
  div5.prepend(userInputSpan);

  //variable that get's user input and stores it in the URL for the ajax call
  const city = document.getElementById("input").value;
  // console.log(city);

  //gets user input and stores value in userInputSpan
  userInputSpan.innerHTML = city;

  const localStorageString2 = localStorage.getItem("city");
  const localStorageArray2 = JSON.parse(localStorageString2);

  //stores input value inside storageArray
  //stores array value in local storage when search button is press
  if (localStorageArray2) {
    localStorageArray2.push(city);
    localStorage.setItem("city", JSON.stringify(localStorageArray2));
  }

  //ajax call to get weather info
  const queryURL1 = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&appid=a2c6aeb70811d753296d3acafec7dceb`;
  $.ajax({
    url: queryURL1,
    method: "GET",
  }).then(function (response1) {
    //^ajax call to get weather info^

    //logs URL info into consle
    const icon = response1.weather[0].icon;
    const temp = response1.main.temp;
    const wind = response1.wind.speed;
    const humid = response1.main.humidity;
    const lat = response1.coord.lat;
    const lon = response1.coord.lon;
    console.log("Today's Weather response: ", response1);
    //^logs URL info into consle^

    //introduces moment to webpage and stores value inside variable for easier typing
    const m = moment();

    //Main div with current weather data, moment date added next to city name from user
    div3.setAttribute("class", "rounded");
    cityInfoSpan.innerText = city + ",   " + m.format("MMMM Do YYYY");
    cityInfoSpan.setAttribute(
      "class",
      "h1 rounded navbar justify-content-start bg-light"
    );
    const cityInfoDiv = document.createElement("div");
    cityInfoSpan.appendChild(cityInfoDiv);
    cityInfoDiv.innerHTML =
      '<img src="https://openweathermap.org/img/wn/' + icon + '@2x.png">';
    cityInfoDiv.setAttribute("class", "bg-info rounded-circle ml-5");
    //^Main div with current weather data, moment date added next to city name from user^

    //temp span for current weather located directly under city from user input
    tempSpan.innerText = "Tempurature: " + temp + "\xB0 F";
    tempSpan.setAttribute("class", "h4 pt-3 pb-3 rounded navbar bg-white");

    //humidity span for current weather located directly under city from user input
    humidSpan.textContent = "Humidity: " + humid + "%";
    humidSpan.setAttribute("class", "h4 pt-3 pb-3 rounded navbar bg-light");

    //wind speed span for current weather located directly under city from user input
    windSpan.textContent = "Wind Speed: " + wind + " mph";
    windSpan.setAttribute("class", "h4 pt-3 pb-3 rounded navbar bg-white");

    const queryURL2 = `https://api.openweathermap.org/data/2.5/uvi?appid=a2c6aeb70811d753296d3acafec7dceb&lat=${lat}&lon=${lon}`;
    $.ajax({
      url: queryURL2,
      method: "GET",
    }).then(function (response2) {
      console.log("UV Index response: ", response2);
      const UV = response2.value;

      //Creates button to display UV value form API
      const uvButton = document.createElement("button");
      uvButton.textContent = UV;

      //Adds content inside UV span
      div3.appendChild(UVSpan);
      UVSpan.textContent = "UV Index: ";
      UVSpan.setAttribute("class", "h4 pt-3 pl-3 pb-3 mb-0 rounded bg-light");

      //Adds uv button that displays uv value
      UVSpan.appendChild(uvButton);
      uvButton.setAttribute("class", "rounded");

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

      const queryURL3 = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${city}&appid=a2c6aeb70811d753296d3acafec7dceb`;
      $.ajax({
        url: queryURL3,
        method: "GET",
      }).then(function (response3) {
        console.log("5 day forecast response: ", response3);

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
        div4.setAttribute("class", "mt-5");

        const day1Icon = response3.list[4].weather[0].icon;
        const day2Icon = response3.list[12].weather[0].icon;
        const day3Icon = response3.list[20].weather[0].icon;
        const day4Icon = response3.list[28].weather[0].icon;
        const day5Icon = response3.list[36].weather[0].icon;

        const day1temp = response3.list[4].main.temp;
        const day2temp = response3.list[12].main.temp;
        const day3temp = response3.list[20].main.temp;
        const day4temp = response3.list[28].main.temp;
        const day5temp = response3.list[36].main.temp;

        const day1humidity = response3.list[4].main.humidity;
        const day2humidity = response3.list[12].main.humidity;
        const day3humidity = response3.list[20].main.humidity;
        const day4humidity = response3.list[28].main.humidity;
        const day5humidity = response3.list[36].main.humidity;

        day1.setAttribute(
          "class",
          "d-inline-block h5 m-1 ml-2 p-3 bg-info rounded text-white"
        );
        day1One.innerText = m.add(1, "days").format("MMMM Do YYYY");
        day1Two.innerHTML =
          '<img src="https://openweathermap.org/img/wn/' +
          day1Icon +
          '@2x.png">';
        day1Three.innerText =
          "Temp: " +
          Math.round(day1temp) +
          "\xB0 F" +
          "\r\n" +
          "Humidity: " +
          day1humidity +
          "%";

        day2.setAttribute(
          "class",
          "d-inline-block h5 m-1 p-3 bg-info rounded text-white"
        );
        day2One.innerText = m.add(1, "days").format("MMMM Do YYYY");
        day2Two.innerHTML =
          '<img src="https://openweathermap.org/img/wn/' +
          day2Icon +
          '@2x.png">';
        day2Three.innerText =
          "Temp: " +
          Math.round(day2temp) +
          "\xB0 F" +
          "\r\n" +
          "Humidity: " +
          day2humidity +
          "%";

        day3.setAttribute(
          "class",
          "d-inline-block h5 m-1 p-3 bg-info rounded text-white"
        );
        day3One.innerText = m.add(1, "days").format("MMMM Do YYYY");
        day3Two.innerHTML =
          '<img src="https://openweathermap.org/img/wn/' +
          day3Icon +
          '@2x.png">';
        day3Three.innerText =
          "Temp: " +
          Math.round(day3temp) +
          "\xB0 F" +
          "\r\n" +
          "Humidity: " +
          day3humidity +
          "%";

        day4.setAttribute(
          "class",
          "d-inline-block h5 m-1 p-3 bg-info rounded text-white"
        );
        day4One.innerText = m.add(1, "days").format("MMMM Do YYYY");
        day4Two.innerHTML =
          '<img src="https://openweathermap.org/img/wn/' +
          day4Icon +
          '@2x.png">';
        day4Three.innerText =
          "Temp: " +
          Math.round(day4temp) +
          "\xB0 F" +
          "\r\n" +
          "Humidity: " +
          day4humidity +
          "%";

        day5.setAttribute(
          "class",
          "d-inline-block h5 m-1 p-3 bg-info rounded text-white"
        ) + "%";
        day5One.innerText = m.add(1, "days").format("MMMM Do YYYY");
        day5Two.innerHTML =
          '<img src="https://openweathermap.org/img/wn/' +
          day5Icon +
          '@2x.png">';
        day5Three.innerText =
          "Temp: " +
          Math.round(day5temp) +
          "\xB0 F" +
          "\r\n" +
          "Humidity: " +
          day5humidity +
          "%";

        day1One.setAttribute("class", "h4");
        day2One.setAttribute("class", "h4");
        day3One.setAttribute("class", "h4");
        day4One.setAttribute("class", "h4");
        day5One.setAttribute("class", "h4");
      });
    });
  });
}
