// document.addEventListener("DOMContentLoaded", () => {});
document.addEventListener("DOMContentLoaded", function () {
  //
  //
  //
  // header
  ///////////////////////////////////////////////////////////////////////
  let hTime = document.querySelector(".header__time"),
    hday = document.querySelector(".header__day");

  let optionsDate = {
      month: "long",
      day: "numeric",
      weekday: "long",
      timezone: "UTC",
    },
    optionsTime = {
      timezone: "UTC",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

  // refresh date and time;
  let intervalDate = setInterval(() => {
    let nowDate = new Date();
    hday.textContent = nowDate.toLocaleString("ru", optionsDate);
    hTime.textContent = nowDate.toLocaleString("ru", optionsTime);
  }, 1000);

  //
  //
  //
  // NOW
  /////////////////////////////////////////////////////////////////////////////////
  const cityInput = document.querySelector(".header__city"),
    cityBtn = document.querySelector(".header__btn");

  const city = document.querySelector(".name"),
    descr = document.querySelector(".descr"),
    temp = document.querySelector(".temp");
  const imgD = document.querySelector("div.img");

  // const img = document.querySelector("div.img");

  const apiK = "appid=b9403bd3a21b4b0ec3a33dd422a72880";
  const langRU = "lang=ru";
  const langEN = "lang=en";
  let lang = langRU;
  const add = `${apiK}&units=metric&${lang}`;
  let lon = 0,
    lat = 0;
  let imgDay = 0;

  cityBtn.addEventListener("click", () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&${add}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        lon = data.coord.lon;
        lat = data.coord.lat;

        imgDay = data.weather[0].icon;
        let imgURL = `http://openweathermap.org/img/wn/${imgDay}@2x.png`;

        city.textContent = data.name;
        descr.textContent = data.weather[0].description;
        temp.textContent = data.main.temp + "C";
        imgD.innerHTML = `<img src=${imgURL} alt='weather'>`;
      })
      .catch((err) => alert("Wrong City!!!"));

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily&${add}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("второй", data);
      });
  });

  // function icon(imgURL) {
  // const imgD = document.querySelector("div.img");
  // let image = document.createElement("img");
  // image.src = imgURL;
  // imgD.appendChild(image);
  // }
});
