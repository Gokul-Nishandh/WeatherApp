const apiKey = "cd017e0cdc604860832170351252807"; // Replace with your actual WeatherAPI key

async function getWeather() {
  const city = document.getElementById("city-input").value.trim();
  const errorElem = document.getElementById("error-message");
  const card = document.getElementById("weather-card");
  errorElem.textContent = "";
  card.style.display = "none";

  if (!city) {
    errorElem.textContent = "Please enter a city name.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`
    );

    if (!response.ok) throw new Error("City not found or API error.");

    const data = await response.json();
    const current = data.current;
    const location = data.location;

    document.getElementById("city-name").textContent = `${location.name}, ${location.country}`;
    document.getElementById("temperature").textContent = `${current.temp_c}°C`;
    document.getElementById("weather-icon").src = `https:${current.condition.icon}`;
    document.getElementById("weather-icon").alt = current.condition.text;
    document.getElementById("weather-description").textContent = current.condition.text;
    document.getElementById("details").textContent =
      `Humidity: ${current.humidity}% | Wind: ${current.wind_kph} km/h`;

    card.style.display = "block";
  } catch (err) {
    errorElem.textContent = err.message;
  }
}
