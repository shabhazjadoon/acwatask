import mapboxgl from "mapbox-gl";
import axios from "axios";
import * as loadmore from "../loadMore/loadMore";

export function init() {

  let maps = document.querySelectorAll("[map-container]");
  if (maps.length) {
    [].map.call(maps, function (map) {
      var uri = (map.getAttribute('data-api'));
      if (!uri) {
        var mapPropObj = setMapProp(map);
        intiateMap(map, mapPropObj);
      }
      getData(uri, function (jsonData) {
        if (jsonData !== "error") {
          var mapPropObj = setMapProp(map);
          var mapObj = intiateMap(map, mapPropObj); 
          var placeholder = getClosest(map, "#map-filter-placeholder");
          var url = (map.getAttribute('data-api'));
          if (url) {
            var Pins = drawMapMarkers(mapObj, jsonData, placeholder);
          }
         
          var filterMap = (placeholder) ? filterMap = placeholder.querySelector('#map-filter') : filterMap = null;
          if (filterMap) {
            filterMap.addEventListener("click", function () {
              var parent = getClosest(this, "#map-form");
              var Fvalues = colectfilters(parent);
              var Svalue = placeholder.querySelector('#portfolio-search').value;
              fillPortfolioList(filterMap, Fvalues, Svalue);

              if (url) {
                url = url + '?search=' + Svalue + '&filter=' + JSON.stringify(Fvalues);
                getData(url, function (newJSONData) {
                  if (newJSONData !== "error") {
                    if (Pins) {
                      removeMarkers(map, Pins);
                    }
                    Pins = drawMapMarkers(mapObj, newJSONData, placeholder);
                  }
                });
                url = (map.getAttribute('data-api'));
              }


            });
          }
          var search = (placeholder) ? search = placeholder.querySelector('#portfolio-search') : search = null;
          if (search) {
            search.addEventListener("keydown", function (e) {
              if (e.keyCode === 13) {
                var Svalue = this.value;
                var Fvalues = colectfilters(placeholder.querySelector("#map-form"));
                fillPortfolioList(this, Fvalues, Svalue);
                if (url) {
                  url = url + '?search=' + Svalue + '&filter=' + JSON.stringify(Fvalues);
                  getData(url, function (searchedJSON) {

                    if (searchedJSON !== "error") {
                      if (Pins) {
                        removeMarkers(map, Pins);
                      }
                      Pins = drawMapMarkers(mapObj, searchedJSON, placeholder);
                    }

                  });
                  url = (map.getAttribute('data-api'));
                }
              }
            });
          }
        } else {
          var mapPropObj = setMapProp(map);
          var mapObj = intiateMap(map, mapPropObj);
          var placeholder = getClosest(map, "#map-filter-placeholder");
          var filterMap = (placeholder) ? filterMap = placeholder.querySelector('#map-filter') : filterMap = null;
          if (filterMap) {
            filterMap.addEventListener("click", function () {
              var parent = getClosest(this, "#map-form");
              var Fvalues = colectfilters(parent);
              var Svalue = placeholder.querySelector('#portfolio-search').value;
              fillPortfolioList(filterMap, Fvalues, Svalue);
            });
          }
          var search = (placeholder) ? search = placeholder.querySelector('#portfolio-search') : search = null;
          if (search) {
            search.addEventListener("keydown", function (e) {
              if (e.keyCode === 13) {
                var Svalue = this.value;
                var Fvalues = colectfilters(placeholder.querySelector("#map-form"));
                fillPortfolioList(this, Fvalues, Svalue);
              }

            });
          }
        }

      });

    });
  }


  var resetMapFilter = document.getElementById("reset-map-filter");
  if (resetMapFilter) {
    resetMapFilter.addEventListener("click", function () {
      resetFilters(this);
    });
  }

  var cancelMapFilter = document.getElementById("cancel-filters");
  if (cancelMapFilter) {
    cancelMapFilter.addEventListener("click", function () {
      resetFilters(this);
      // getClosest(this, ".filter").querySelector('.open-filters').click();
    });
  }

  var dropdownFilters = document.getElementById("dropdown-filters");
  if (dropdownFilters) {
    dropdownFilters.addEventListener("hidden", function () {
      resetFilters(this.querySelector('#cancel-filters'));
    });
  }
  
}

var mapProp = {
  mapKey: 'pk.eyJ1IjoicmFuYWFiYmFzc3kiLCJhIjoiY2plY3NieGh4MXo1ejJ5cGU4MjluNnZkcCJ9.ep5C3uw_L5J0oW4BGPPHMQ',
  markers: [],
  zoom: 2,
  style: "dark",
  coordinates: [46.738586, 24.774265]
}

function resetFilters(btn){
  var filter_form = getClosest(btn, "#map-form");
  if (filter_form) {
    filter_form.reset();
  }
}

function getData(url, callback) {
  axios.get(url)
    .then(function (myJson) {
      callback(myJson);
    }).catch(function (error) {
      if (error.response) {
        if (error.response.status === 404) {
          callback("error");
        }
      }
    });
}

function setMapProp(elem) {
  var obj = JSON.parse(elem.getAttribute('map-container'));
  if (obj.lang && obj.lat)
    obj.style = !(obj.style) ? obj.style = mapProp.style : obj.style;
  obj.zoom = !(obj.zoom) ? obj.zoom = mapProp.zoom : obj.zoom;
  obj.coordinates = !(obj.long && obj.lat) ? obj.coordinates = mapProp.coordinates : [obj.long, obj.lat];

  return obj;
}

function intiateMap(elem, obj) {
  mapboxgl.accessToken = mapProp.mapKey;
  var mapbox = new mapboxgl.Map({
    container: elem,
    center: obj.coordinates,
    zoom: obj.zoom
  });
  var mapObj = mapbox;

  if (obj.style === "streets") {
    mapbox.setStyle("mapbox://styles/mapbox/streets-v9");
  } else if (obj.style === "drk") {
    mapbox.setStyle("mapbox://styles/mapbox/dark-v9");
  } else if (obj.style === "dark") {
    mapbox.setStyle("mapbox://styles/ranaabbassy/cjfwdea285or52rpg05j4yqum");
  }

  if (obj.long && obj.lat) {
    var el = document.createElement('div');
    //el.style.backgroundImage="URL('static/mapPin.png')";
    el.className = "marker";
    var icon = '<span uk-icon="icon: ap_mapPin; ratio:1.5"></span>';
    el.innerHTML = icon;

    new mapboxgl.Marker(el)
      .setLngLat(obj.coordinates)
      .addTo(mapbox);
  }

  return mapObj;
}

function drawMapMarkers(mapbox, markers, placeholder) {
  var pins = [];
  if (Object.keys(markers.data).length > 0) {
    markers.data.Locators.forEach(function (marker, i) {
      var el = document.createElement('div');
      el.style.backgroundImage = "URL('" + marker.icon + "')";
      const markup = ` 
      <a>
        <span>${marker.country}</span>
      </a>
        `;
      el.innerHTML = markup;
      el.className = "marker";
      
      el.querySelector('a').addEventListener('click', function(event) {
        event.preventDefault();
        // window.location.href = `?country=${marker.countryId}`;

        //on click change country filter value and submit filter
        var countryFilter = placeholder.querySelector("[country-filter]");

        if(countryFilter){
          countryFilter.value = marker.countryId;
          var filterMap =  placeholder.querySelector('#map-filter');
          if (filterMap) {
            filterMap.click();
          }
        }

      }, false);

      var pin = new mapboxgl.Marker(el)
        .setLngLat(marker.coordinates)
        .addTo(mapbox);

      pins[i] = pin;
    });
  }
  return pins;
}

function colectfilters(prnt) {
  var elems = prnt.elements;
  var data = {};
  var checkVal = [];
  var elemName = "";

  for (var i = 0; i < elems.length; i++) {
    if (
      (elems[i].tagName === "SELECT" && elems[i].selectedIndex !== "0") ||
      elems[i].checked ||
      (elems[i].type === "textbox" && elems[i].value !== "")
    ) {
      if (elems[i].tagName === "SELECT") {
        checkVal = [];
        checkVal.push(elems[i].value);
        data[elems[i].name] = checkVal;
        checkVal = [];
      } else {
        if (elems[i].name === elemName) {
          checkVal.push(elems[i].value);
        } else {
          elemName = elems[i].name;
          checkVal = [];
          checkVal.push(elems[i].value);
        }
        data[elems[i].name] = checkVal;
      }


    }
  }
  return data;
}

function removeMarkers(map, pins) {

  pins.forEach(function (pin) {
    pin.remove();
  });

}

function fillPortfolioList(elem, Fvalues, Svalue) {
  var portfolioItem,
    listURL = getClosest(elem, '#map-filter-placeholder').getAttribute('data-api'),
    parent = getClosest(elem, "#map-filter-placeholder").nextElementSibling;

  listURL = listURL + '?search=' + Svalue + '&filter=' + JSON.stringify(Fvalues);
  axios({
      method: 'post',
      url: listURL
    })
    .then(function (response) {
      if (response.data.length > 0) {
        let elemntsToDelete = parent.children;
        for (var i = elemntsToDelete.length; i >= elemntsToDelete.length; i--) {
          if (!(i <= 1)) {
            //elemntsToDelete[i-1].remove();  // IE doesn't support .remove()  falling back to removeChild below
            elemntsToDelete[i - 1].parentNode.removeChild(elemntsToDelete[i - 1]);
          }
        }

        response.data.forEach(elm => {
          if (elm !== response.data[response.data.length]) {
            portfolioItem = document.createElement("div");
            portfolioItem.className = "uk-width-extend uk-width-1-2@m uk-width-1-4@l";
            portfolioItem.innerHTML = elm;
            parent.appendChild(portfolioItem);
            //parent.insertBefore(portfolioItem, parent.children[parent.children.length-1]); 
          }
        });

        var loadBtn = parent.querySelector('.btn-loadmore');
        if (loadBtn) {
          getClosest(loadBtn, '.uk-width-extend').classList.remove("uk-width-1-2@m");
          getClosest(loadBtn, '.uk-width-extend').classList.remove("uk-width-1-4@l");
          var newUrl = parent.querySelector('.btn-loadmore').getAttribute('data-api') + '?search=' + Svalue + '&filter=' + JSON.stringify(Fvalues);
          parent.querySelector('.btn-loadmore').setAttribute('data-api', newUrl);
          let container = getClosest(parent.querySelector('.btn-loadmore'), '.uk-grid').removeAttribute('data-page');
          loadmore.init();
        }

      }
    });
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
      function (s) {
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

};