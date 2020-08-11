window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // Accessing the position coordinates via the above arrow function
            long = position.coords.longitude;
            lat = position.coords.latitude;


            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5cd8ebd1b8232208f3ab8c65716377a4`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {

                    //Getting elem. from the json tree and setting them to the DOM elem
                    const { temp } = data.main;
                    const { description } = data.weather[0];

                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = description;

                    locationTimezone.textContent = data.name;

                    console.log(moment());

                    //Set icon
                    // setIcons(icon, document.querySelector(".icon"));

                    var ikona = document.getElementById('ikonata');

                    ikona.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`


                    //Celsius to Kelvin
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "K") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.innerHTML = Math.floor(parseFloat(temperatureDegree.innerHTML) - 273.1);
                        } else {
                            temperatureSpan.textContent = "K";
                        }
                    });
                });

        });

    }


});