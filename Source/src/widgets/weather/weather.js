import "core-js";
import RainRenderer from "./rain-renderer";
import Raindrops from "./raindrops";
import loadImages from "./image-loader";
import createCanvas from "./create-canvas";
import TweenLite from "gsap";
import Quint from "gsap";
import times from "./times";
import { random, chance } from "./random";
import axios from "axios";
import UIkit from "uikit";
import moment from "moment";

let widget,
  locations,
  locationsId,
  rawWeatherData,
  textureRainFg,
  textureRainBg,
  textureStormLightningFg,
  textureStormLightningBg,
  textureFalloutFg,
  textureFalloutBg,
  textureSunFg,
  textureSunBg,
  textureDrizzleFg,
  textureDrizzleBg,
  dubaiTexture,
  dubaiTextureRain,
  dubaiTextureStorm,
  dubaiTextureFog,
  dubaiTextureHot,
  dubaiTextureCloud,
  cairoTexture,
  cairoTextureRain,
  cairoTextureStorm,
  cairoTextureFog,
  cairoTextureHot,
  cairoTextureCloud,
  riyadhTexture,
  riyadhTextureRain,
  riyadhTextureStorm,
  riyadhTextureFog,
  riyadhTextureHot,
  riyadhTextureCloud,
  ammanTexture,
  ammanTextureRain,
  ammanTextureStorm,
  ammanTextureFog,
  ammanTextureHot,
  ammanTextureCloud,
  rabatTexture,
  rabatTextureRain,
  rabatTextureStorm,
  rabatTextureFog,
  rabatTextureHot,
  rabatTextureCloud,
  muscatTexture,
  muscatTextureRain,
  muscatTextureStorm,
  muscatTextureFog,
  muscatTextureHot,
  muscatTextureCloud,
  johannesburgTexture,
  johannesburgTextureRain,
  johannesburgTextureStorm,
  johannesburgTextureFog,
  johannesburgTextureHot,
  johannesburgTextureCloud,
  madridTexture,
  madridTextureRain,
  madridTextureStorm,
  madridTextureFog,
  madridTextureHot,
  madridTextureCloud,
  istanbulTexture,
  istanbulTextureRain,
  istanbulTextureStorm,
  istanbulTextureFog,
  istanbulTextureHot,
  istanbulTextureCloud,
  hanoiTexture,
  hanoiTextureRain,
  hanoiTextureStorm,
  hanoiTextureFog,
  hanoiTextureHot,
  hanoiTextureCloud,
  dropColor,
  dropAlpha;

let textureFg, textureFgCtx, textureBg, textureBgCtx;

let textureBgSize = {
  width: 700,
  height: 329
};
let textureFgSize = {
  width: 700,
  height: 329
};

let raindrops, renderer, canvas;

let parallax = {
  x: 0,
  y: 0
};

let weatherData = null;
let curWeatherData = null;
let blend = {
  v: 0
};

// t --> textures arrat l --> locations array
function loadTextures() {
  widget = document.querySelector(".widget-weather");
  if (widget) {
    locations = widget.getAttribute("data-locations").split(",");
    locationsId = widget.getAttribute("data-country");

    //     //////////// Prep Textures
    //     var textures = [
    //       {name: "dropAlpha",src: widget.getAttribute("data-dropAlpha").toString()},
    //       {name: "dropColor",src: widget.getAttribute("data-dropColor").toString()}
    //     ]
    // for(var i = 0; i<locations.length;i++){
    //   textures.push({
    //     name: locations[i].toLowerCase() +"Texture",
    //     src: "img/weather/dubai/clear.png"
    //   });
    //   textures.push({
    //     name: locations[i].toLowerCase() +"TextureRain",
    //     src: "img/weather/dubai/clear.png"
    //   })
    //   textures.push({
    //     name: locations[i].toLowerCase() +"TextureStorm",
    //     src: "img/weather/dubai/storm.png"
    //   });
    //   textures.push({
    //     name: locations[i].toLowerCase() +"TextureFog",
    //     src: "img/weather/dubai/fog.png"
    //   })
    //   textures.push({
    //     name: locations[i].toLowerCase() +"TextureHot",
    //     src: "img/weather/dubai/hot.png"
    //   })
    // }

    var textures = [
      { name: "dropAlpha", src: widget.getAttribute("data-dropAlpha") },
      { name: "dropColor", src: widget.getAttribute("data-dropColor") }
    ];

    for (var z = 0; z < locations.length; z++) {
      textures.push(
        {
          name: locations[z].toLowerCase() + "Texture",
          src: widget
            .querySelector("[data-weather=" + locations[z].toLowerCase() + "]")
            .getAttribute("data-background")
        },
        {
          name: locations[z].toLowerCase() + "TextureRain",
          src:
            widget
              .querySelector(
                "[data-weather=" + locations[z].toLowerCase() + "]"
              )
              .getAttribute("data-background-rain").length > 0
              ? widget
                  .querySelector(
                    "[data-weather=" + locations[z].toLowerCase() + "]"
                  )
                  .getAttribute("data-background-rain")
              : widget
                  .querySelector(
                    "[data-weather=" + locations[z].toLowerCase() + "]"
                  )
                  .getAttribute("data-background")
        },
        {
          name: locations[z].toLowerCase() + "TextureStorm",
          src:
            widget
              .querySelector(
                "[data-weather=" + locations[z].toLowerCase() + "]"
              )
              .getAttribute("data-background-storm").length > 0
              ? widget
                  .querySelector(
                    "[data-weather=" + locations[z].toLowerCase() + "]"
                  )
                  .getAttribute("data-background-storm")
              : widget
                  .querySelector(
                    "[data-weather=" + locations[z].toLowerCase() + "]"
                  )
                  .getAttribute("data-background")
        },
        {
          name: locations[z].toLowerCase() + "TextureFog",
          src:
            widget
              .querySelector(
                "[data-weather=" + locations[z].toLowerCase() + "]"
              )
              .getAttribute("data-background-fog").length > 0
              ? widget
                  .querySelector(
                    "[data-weather=" + locations[z].toLowerCase() + "]"
                  )
                  .getAttribute("data-background-fog")
              : widget
                  .querySelector(
                    "[data-weather=" + locations[z].toLowerCase() + "]"
                  )
                  .getAttribute("data-background")
        },
        {
          name: locations[z].toLowerCase() + "TextureHot",
          src:
            widget
              .querySelector(
                "[data-weather=" + locations[z].toLowerCase() + "]"
              )
              .getAttribute("data-background-hot").length > 0
              ? widget
                  .querySelector(
                    "[data-weather=" + locations[z].toLowerCase() + "]"
                  )
                  .getAttribute("data-background-hot")
              : widget
                  .querySelector(
                    "[data-weather=" + locations[z].toLowerCase() + "]"
                  )
                  .getAttribute("data-background")
        },
        {
          name: locations[z].toLowerCase() + "TextureCloud",
          src:
            widget
              .querySelector(
                "[data-weather=" + locations[z].toLowerCase() + "]"
              )
              .getAttribute("data-background-cloud").length > 0
              ? widget
                  .querySelector(
                    "[data-weather=" + locations[z].toLowerCase() + "]"
                  )
                  .getAttribute("data-background-cloud")
              : widget
                  .querySelector(
                    "[data-weather=" + locations[z].toLowerCase() + "]"
                  )
                  .getAttribute("data-background")
        }
      );
    }

    loadImages(textures).then(images => {
      for (var x = 0; x < locations.length; x++) {
        //console.log(images.eval(locations[x]+'Texture').img);
      }
      if (images.dubaiTexture) {
        dubaiTexture = images.dubaiTexture.img;
        dubaiTextureRain = images.dubaiTextureRain.img;
        dubaiTextureStorm = images.dubaiTextureStorm.img;
        dubaiTextureFog = images.dubaiTextureFog.img;
        dubaiTextureHot = images.dubaiTextureHot.img;
      }

      if (images.cairoTexture) {
        cairoTexture = images.cairoTexture.img;
        cairoTextureRain = images.cairoTextureRain.img;
        cairoTextureStorm = images.cairoTextureStorm.img;
        cairoTextureFog = images.cairoTextureFog.img;
        cairoTextureHot = images.cairoTextureHot.img;
      }
      if (images.riyadhTexture) {
        riyadhTexture = images.riyadhTexture.img;
        riyadhTextureRain = images.riyadhTextureRain.img;
        riyadhTextureStorm = images.riyadhTextureStorm.img;
        riyadhTextureFog = images.riyadhTextureFog.img;
        riyadhTextureHot = images.riyadhTextureHot.img;
      }

      if (images.ammanTexture) {
        ammanTexture = images.ammanTexture.img;
        ammanTextureRain = images.ammanTextureRain.img;
        ammanTextureStorm = images.ammanTextureStorm.img;
        ammanTextureFog = images.ammanTextureFog.img;
        ammanTextureHot = images.ammanTextureHot.img;
      }
      if (images.rabatTexture) {
        rabatTexture = images.rabatTexture.img;
        rabatTextureRain = images.rabatTextureRain.img;
        rabatTextureStorm = images.rabatTextureStorm.img;
        rabatTextureFog = images.rabatTextureFog.img;
        rabatTextureHot = images.rabatTextureHot.img;
      }
      if (images.muscatTexture) {
        muscatTexture = images.muscatTexture.img;
        muscatTextureRain = images.muscatTextureRain.img;
        muscatTextureStorm = images.muscatTextureStorm.img;
        muscatTextureFog = images.muscatTextureFog.img;
        muscatTextureHot = images.muscatTextureHot.img;
      }

      if (images.johannesburgTexture) {
        johannesburgTexture = images.johannesburgTexture.img;
        johannesburgTextureRain = images.johannesburgTextureRain.img;
        johannesburgTextureStorm = images.johannesburgTextureStorm.img;
        johannesburgTextureFog = images.johannesburgTextureFog.img;
        johannesburgTextureHot = images.johannesburgTextureHot.img;
      }
      if (images.madridTexture) {
        madridTexture = images.madridTexture.img;
        madridTextureRain = images.madridTextureRain.img;
        madridTextureStorm = images.madridTextureStorm.img;
        madridTextureFog = images.madridTextureFog.img;
        madridTextureHot = images.madridTextureHot.img;
      }
      if (images.istanbulTexture) {
        istanbulTexture = images.istanbulTexture.img;
        istanbulTextureRain = images.istanbulTextureRain.img;
        istanbulTextureStorm = images.istanbulTextureStorm.img;
        istanbulTextureFog = images.istanbulTextureFog.img;
        istanbulTextureHot = images.istanbulTextureHot.img;
      }
      if (images.hanoiTexture) {
        hanoiTexture = images.hanoiTexture.img;
        hanoiTextureRain = images.hanoiTextureRain.img;
        hanoiTextureStorm = images.hanoiTextureStorm.img;
        hanoiTextureFog = images.hanoiTextureFog.img;
        hanoiTextureHot = images.hanoiTextureHot.img;
      }

      // Amman
      // Rabat
      // Muscat
      // Johannesburg
      // Madrid
      // Istanbul
      // Hanoi

      textureRainFg = images.dubaiTexture.img;
      textureRainBg = images.dubaiTexture.img;
      textureFalloutFg = images.dubaiTexture.img;
      textureFalloutBg = images.dubaiTexture.img;
      textureStormLightningFg = images.dubaiTexture.img;
      textureStormLightningBg = images.dubaiTexture.img;
      textureSunFg = images.dubaiTexture.img;
      textureSunBg = images.dubaiTexture.img;
      textureDrizzleFg = images.dubaiTexture.img;
      textureDrizzleBg = images.dubaiTexture.img;

      dropColor = images.dropColor.img;
      dropAlpha = images.dropAlpha.img;

      loadWeatherData(locations);
    });
  }
}
loadTextures();
function loadWeatherData(locations) {
  //console.log(locations.join("','"));
  // proccess locations
  let queryLocations = [];
  locations.forEach(element => {
    switch (element) {
      case "Hanoi":
      case "hanoi":
        queryLocations.push("Hà Nội");
        break;
      default:
        queryLocations.push(element);
    }
  });
  //console.log(textures);
  // Call weather data from API and render

  // let api = 'https://query.yahooapis.com/v1/public/yql?format=json&q=';
  // let q = "select item.condition, item.title  from weather.forecast where woeid in (select " +
  //     "woeid from geo.places(1) where text in ('"+queryLocations.join("','")+"nd u')) a='c'";

  // var param='';
  // let api = 'https://weather-ydn-yql.media.yahoo.com/forecastrss?w=2502265'
  // var timeStamp = Math.floor( (new Date().getTime()) / 1000);
  // var nonce = randomString(16);
  // var signature = oauthSignature.generate('GET', 'https://weather-ydn-yql.media.yahoo.com/forecastrss?w=2502265', param, 'a5e4d0d687b7b158a9e460abb5e1404e33ae00d0',{ encodeSignature: false})

  // var config = {
  //   headers: {
  //     oauth_consumer_key : 'dj0yJmk9bm9yWGtWWU9GZmRaJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTNm',
  //     oauth_timestamp : timeStamp ,
  //     oauth_signature_method : 'HMAC-SHA1',
  //     oauth_signature : signature,
  //     oauth_nonce: nonce,
  //     oauth_version : '1.0',
  //     'Access-Control-Allow-Origin': '*',
  //     'Content-Type': 'application/json;charset=utf-8',
  //     'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
  //     // crossdomain: true
  //   }
  //  };

  let q = queryLocations.join(",");
  console.log(q);
  let key = "e7681f47f58061413f93eedf690b3285";
  let api =
    "https://api.openweathermap.org/data/2.5/group?id=" +
    locationsId +
    "&units=metric&APPID=" +
    key;
  axios
    // .get(api ,config)
    .get(api, { crossdomain: true })
    .then(function(response) {
      // save raw data to be used in setupWeather
      // rawWeatherData = response.data.query.results.channel;
      rawWeatherData = response.data.list;

      init();
    })
    .catch(function(error) {
      // console.log(error);
      //_removeLoadSpinner();
    });
}
function init() {
  canvas = document.querySelector(".weather-canvas");
  if (canvas) {
    var dpi = window.devicePixelRatio;
    canvas.width = window.innerWidth * dpi;
    canvas.height = window.innerHeight * dpi;

    raindrops = new Raindrops(
      canvas.width,
      canvas.height,
      dpi,
      dropAlpha,
      dropColor,
      {
        trailRate: 1,
        trailScaleRange: [0.2, 0.45],
        collisionRadius: 0.45,
        dropletsCleaningRadiusMultiplier: 0.28
      }
    );

    textureFg = createCanvas(textureFgSize.width, textureFgSize.height);
    textureFgCtx = textureFg.getContext("2d");
    textureBg = createCanvas(textureBgSize.width, textureBgSize.height);
    textureBgCtx = textureBg.getContext("2d");

    generateTextures(textureRainFg, textureRainBg);

    renderer = new RainRenderer(
      canvas,
      raindrops.canvas,
      textureFg,
      textureBg,
      null,
      {
        brightness: 1.04,
        alphaMultiply: 6,
        alphaSubtract: 3
        // minRefraction:256, maxRefraction:512
      }
    );

    setupEvents();
  }

  // check if default data supplied
  let widget = document.querySelector(".widget-weather");
  let dflt = widget.getAttribute("data-default");
  console.log(dflt);
  if (dflt) {
    // get href
    updateWeather(
      widget
        .querySelector('.slideshow__nav a[data-value="' + dflt + '"]')
        .getAttribute("href")
    );
    updateWeatherNav();
  }

  let nextSwitch = widget.querySelector(".uk-slidenav-next");
  if (nextSwitch) {
    nextSwitch.addEventListener("click", function() {
      nextCity();
    });
  }
  let prevSwitch = widget.querySelector(".uk-slidenav-previous");
  if (prevSwitch) {
    prevSwitch.addEventListener("click", function() {
      prevCity();
    });
  }
}
function setupEvents() {
  setupParallax();
  setupWeather();
  setupFlash();
}
function setupParallax() {
  document.addEventListener("mousemove", event => {
    let x = event.pageX;
    let y = event.pageY;

    TweenLite.to(parallax, 1, {
      x: (x / canvas.width) * 2 - 1,
      y: (y / canvas.height) * 2 - 1,
      ease: Quint.easeOut,
      onUpdate: () => {
        renderer.parallaxX = parallax.x;
        renderer.parallaxY = parallax.y;
      }
    });
  });
}
function setupFlash() {
  setInterval(() => {
    if (chance(curWeatherData.flashChance)) {
      flash(
        curWeatherData.bg,
        curWeatherData.fg,
        curWeatherData.flashBg,
        curWeatherData.flashFg
      );
    }
  }, 500);
}
function setupWeather() {
  setupWeatherData();

  // setup link toggles
  var navLinks = document.querySelectorAll(".widget-weather .nav-item");
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener(
      "click",
      function(event) {
        // display the current click count inside the clicked div
        event.preventDefault();
        updateWeather(this.getAttribute("href"));
        //updateWeatherNav()
      },
      false
    );
  }

  updateWeather();
}
function setupWeatherData() {
  let defaultWeather = {
    raining: true,
    minR: 20,
    maxR: 50,
    rainChance: 0.35,
    rainLimit: 6,
    dropletsRate: 50,
    dropletsSize: [3, 5.5],
    trailRate: 1,
    trailScaleRange: [0.25, 0.35],
    fg: textureRainFg,
    bg: textureRainBg,
    flashFg: null,
    flashBg: null,
    flashChance: 0,
    collisionRadiusIncrease: 0.0002
  };

  function weather(data) {
    return Object.assign({}, defaultWeather, data);
  }
  // prep data / map from weather API to custom weather data
  for (var i = 0; i < locations.length; i++) {
    var l = locations[i].toLowerCase();
    // var c = rawWeatherData[i].item.condition;
    var aa = rawWeatherData[i];
    var c;
    switch (aa.weather[0].icon) {
      case "11d":
      case "11n":
        c = "storm";
        break;
      case "10d":
      case "10n":
        c = "rain";
        break;
      case "13d":
      case "13n":
      case "09d":
      case "09n":
        c = "showers";
        break;

      case "50d":
      case "50n":
        c = "fog";
        break;
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        c = "cloud";
        break;
      case "01d":
      case "01n":
      case "02d":
      case "02n":
        c = "sunny";
        break;

      default:
        break;
    }
    var o = {};
    switch (c) {
      // case 0:
      // case 1:
      // case 2:
      // case 3:
      // case 4:
      case "storm":
        o[l] = weather({
          maxR: 55,
          rainChance: 0.4,
          dropletsRate: 80,
          dropletsSize: [3, 5.5],
          trailRate: 2.5,
          trailScaleRange: [0.25, 0.4],
          fg: eval(l + "TextureRain"),
          bg: eval(l + "TextureRain"),
          flashFg: eval(l + "TextureStorm"),
          flashBg: eval(l + "TextureStorm"),
          flashChance: 0.2
        });
        break;

      // case 5:
      // case 6:
      // case 7:
      // case 8:
      // case 9:
      // case 10:
      case "rain":
        o[l] = weather({
          minR: 10,
          maxR: 40,
          rainChance: 0.15,
          rainLimit: 2,
          dropletsRate: 10,
          dropletsSize: [3.5, 6],
          fg: eval(l + "TextureRain"),
          bg: eval(l + "TextureRain")
        });
        break;

      // case 11:
      // case 12:
      // case 13:
      // case 14:
      // case 15:
      // case 16:
      // case 17:
      // case 18:
      // case 35:
      case "showers":
        o[l] = weather({
          minR: 10,
          maxR: 40,
          rainChance: 0.35,
          dropletsRate: 50,
          raining: true,
          trailRate: 2.5,
          fg: eval(l + "TextureRain"),
          bg: eval(l + "TextureRain")
        });
        break;

      // case 19:
      // case 20:
      // case 21:
      // case 22:
      // case 24:
      case "fog":
        o[l] = weather({
          minR: 10,
          maxR: 40,
          rainChance: 0,
          rainLimit: 0,
          dropletsRate: 0,
          dropletsSize: [0, 0],
          fg: eval(l + "TextureFog"),
          bg: eval(l + "TextureFog")
        });
        break;

      // case 25:
      // case 26:
      // case 27:
      // case 29:
      // case 30:
      // case 44:
      case "cloud":
        o[l] = weather({
          rainChance: 0,
          rainLimit: 0,
          droplets: 0,
          raining: false,
          fg: eval(l + "TextureFog"),
          bg: eval(l + "TextureFog")
        });
        break;

      // case 23:
      // case 28:
      // case 31:
      // case 32:
      // case 33:
      // case 34:
      case "sunny":
        o[l] = weather({
          rainChance: 0,
          rainLimit: 0,
          droplets: 0,
          raining: false,
          fg: eval(l + "Texture"),
          bg: eval(l + "Texture")
        });
        break;

      default:
        o[l] = weather({
          rainChance: 0,
          rainLimit: 0,
          droplets: 0,
          raining: false,
          fg: eval(l + "Texture"),
          bg: eval(l + "Texture")
        });
        break;
    }
    weatherData = Object.assign({}, weatherData, o);

    let offset = parseInt(
      widget
        .querySelector("[data-weather=" + l + "]")
        .getAttribute("data-offset")
    );
    widget.querySelector(
      "[data-weather=" + l + "] .slide__element--date span:first-of-type"
    ).innerHTML = moment()
      .utc()
      .add(offset, "hours")
      .format("ll");
    widget.querySelector(
      "[data-weather=" + l + "] .slide__element--date span:last-of-type"
    ).innerHTML = moment()
      .utc()
      .add(offset, "hours")
      .format("LT");

    widget.querySelector(
      "[data-weather=" + l + "] .slide__element--temp span"
    ).innerHTML = Math.trunc(aa.main.temp) + "°";
    widget.querySelector(
      "[data-weather=" + l + "] .slide__element--condition span"
    ).innerHTML = aa.weather[0].main;
  }
}
function updateWeather(hash) {
  //let hash = window.location.hash;
  let currentSlide = null;
  let currentNav = null;

  if (hash != "" && hash != "undefined") {
    currentSlide = document.querySelector(hash);
  }
  if (currentSlide == null) {
    currentSlide = document.querySelector(".slide");
    hash = "#" + currentSlide.getAttribute("id");
  }
  currentNav = document.querySelector("[href='" + hash + "']");
  let data =
    weatherData[currentSlide.getAttribute("data-weather").toLowerCase()];
  curWeatherData = data;

  raindrops.options = Object.assign(raindrops.options, data);

  raindrops.clearDrops();

  TweenLite.fromTo(
    blend,
    1,
    {
      v: 0
    },
    {
      v: 1,
      onUpdate: () => {
        generateTextures(data.fg, data.bg, blend.v);
        renderer.updateTextures();
      }
    }
  );

  let lastSlide = document.querySelector(".slide--current");
  if (lastSlide != null) lastSlide.classList.remove("slide--current");

  let lastNav = document.querySelector(".nav-item--current");
  if (lastNav != null) lastNav.classList.remove("nav-item--current");

  currentSlide.classList.add("slide--current");
  currentNav.classList.add("nav-item--current");
}

function flash(baseBg, baseFg, flashBg, flashFg) {
  let flashValue = {
    v: 0
  };
  function transitionFlash(to, t = 0.025) {
    return new Promise((resolve, reject) => {
      TweenLite.to(flashValue, t, {
        v: to,
        ease: Quint.easeOut,
        onUpdate: () => {
          generateTextures(baseFg, baseBg);
          generateTextures(flashFg, flashBg, flashValue.v);
          renderer.updateTextures();
        },
        onComplete: () => {
          resolve();
        }
      });
    });
  }

  let lastFlash = transitionFlash(1);
  times(random(2, 7), i => {
    lastFlash = lastFlash.then(() => {
      return transitionFlash(random(0.1, 1));
    });
  });
  lastFlash = lastFlash
    .then(() => {
      return transitionFlash(1, 0.1);
    })
    .then(() => {
      transitionFlash(0, 0.25);
    });
}
function generateTextures(fg, bg, alpha = 1) {
  textureFgCtx.globalAlpha = alpha;
  textureFgCtx.drawImage(fg, 0, 0, textureFgSize.width, textureFgSize.height);

  textureBgCtx.globalAlpha = alpha;
  textureBgCtx.drawImage(bg, 0, 0, textureBgSize.width, textureBgSize.height);
}
function updateWeatherNav() {
  var slider = widget.querySelector(".uk-slider"),
    navParent = widget.querySelector(".slideshow__nav"),
    currentcity = getClosest(
      navParent.querySelector("a.nav-item--current"),
      "li"
    ),
    cities = navParent.children,
    citiesAR = Array.prototype.slice.call(cities),
    currentCityIndex = citiesAR.indexOf(currentcity);

  UIkit.slider(slider).show(currentCityIndex);
}
function nextCity() {
  var nextCity,
    cityCount = widget.querySelector(".slideshow__nav").childElementCount,
    currentcity = getClosest(
      widget.querySelector(".slideshow__nav a.nav-item--current"),
      "li"
    ),
    citiesAR = Array.prototype.slice.call(
      widget.querySelector(".slideshow__nav").children
    ),
    currentCityIndex = citiesAR.indexOf(currentcity);

  if (currentCityIndex == cityCount - 1) {
    nextCity = citiesAR[0];
  } else {
    nextCity = currentcity.nextElementSibling;
  }

  nextCity.querySelector("a.nav-item").click();
}

function prevCity() {
  var prevCity,
    cityCount = widget.querySelector(".slideshow__nav").childElementCount,
    currentcity = getClosest(
      widget.querySelector(".slideshow__nav a.nav-item--current"),
      "li"
    ),
    citiesAR = Array.prototype.slice.call(
      widget.querySelector(".slideshow__nav").children
    ),
    currentCityIndex = citiesAR.indexOf(currentcity);

  if (currentCityIndex == 0) {
    prevCity = citiesAR[cityCount - 1];
  } else {
    prevCity = currentcity.previousElementSibling;
  }

  prevCity.querySelector("a.nav-item").click();
}

function getClosest(elem, selector) {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
      };
  }

  // Get closest match
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }

  return null;
}

function randomString(length) {
  var charset =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~";
  var result = "";

  while (length > 0) {
    var bytes = new Uint8Array(16);
    var random = window.crypto.getRandomValues(bytes);

    random.forEach(function(c) {
      if (length == 0) {
        return;
      }
      if (c < charset.length) {
        result += charset[c];
        length--;
      }
    });
  }
  return result;
}
