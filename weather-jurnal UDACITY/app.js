document.addEventListener('dblclick', function (){
  alert ("This is Sherif's Forcast For Tody");
});

/* Global Variables */
// api in a var to be able to use
const api = "&appid=f30a89be53662ce60cb22cb1a5c11bf7";
// const myapi = '&appid=32309450fd583f5336be4a82e8f47db7';
// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={'32309450fd583f5336be4a82e8f47db7'}
// get the zipcode
const zipCode = document.getElementById("zip");
// get the value of the feeling
const feelings = document.getElementById("feelings");
const content = document.querySelector("#content");
const generate = document.getElementById("generate");

// function addevent
document.getElementById("generate").addEventListener("click", async () => {
  getWeather()
    .then((temp) => {
      postData("/postData", temp);
    })
    .then(() => addData("/getData"));
});

// alert(4);
const getWeather = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value}&units=metric${api}`;
  const res = await fetch(url);
  try {
    const userData = await res.json();
    console.log(`${userData.main.temp}°C`);
    return `${userData.main.temp}°C`;
  } catch (error) {
    console.log("error", error);
    return "Invalid Zip Code";
  }
};
// alert(4);
const postData = async (url = "", temp) => {
  const response = await fetch(url, {
    method: "POST", // *GET, this is the other method but post is more secure.
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: new Date(),
      temp: temp,
      feel: feelings.value,
    }), // body data type must match "Content-Type" header
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
// alert(4)
const addData = async function (url) {
  const request = await fetch(url);
  try {
    const data = await request.json();
    document.getElementById("date").innerHTML = `Date: ${data.date}`;
    document.getElementById("temp").innerHTML = `temp: ${data.temp}`;
    document.getElementById("content").innerHTML = `content: ${data.feel}`;
  } catch (error) {
    console.log("error", error);
  }
};
// alert(4);