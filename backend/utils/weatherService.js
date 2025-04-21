const axios = require("axios");

async function getWeatherInfo() {
  const apiKey = "22ebc6019fbe520d4930361c9d721be5";
  const city = "Cairo";
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  console.log(response.data);
  return response.data;
}

module.exports = { getWeatherInfo };
