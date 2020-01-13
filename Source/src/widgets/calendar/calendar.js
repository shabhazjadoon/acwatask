import Scrollbar from "smooth-scrollbar";
import axios from "axios";
import {
  setTimeout
} from "core-js/library/web/timers";

export default function Calendar(target) {
  var date = new Date();
  var calendar;
  var container;
  var calendarEventsContainer;
  var evContainer;
  var evEmptyContainer;
  var calendarContainerClass = ".calendar-wrapper";
  var calendarEventsClass = ".calendar-events";
  var eventsContainerClass = ".events-wrapper";
  var eventsEmptyContainerClass = ".events-empty";
  var data = [];


  container = document.querySelector(target + " " + calendarContainerClass);
  calendarEventsContainer = document.querySelector(target + " " + calendarEventsClass);
  evContainer = document.querySelector(target + " " + eventsContainerClass);
  evEmptyContainer = document.querySelector(target + " " + eventsEmptyContainerClass);

  if (container) {
    var apiURL = document.querySelector(target).getAttribute("data-api");

    axios
      .get(apiURL)
      .then(function (response) {
        if (container) {
          data = response.data;
          calendar = buildTable(date.getFullYear(), date.getMonth());
          container.appendChild(calendar);
          container.appendChild(buildControls(date));
          container.querySelector(".today").click();
        }
      })
      .catch(function (error) {
        //console.log(error);
      });
  }

  function buildTable(year, month) {
    var controlDate = new Date(year, month + 1, 0);
    var currDate = new Date(year, month, 1);
    var iter = 0;
    var ready = true;

    var table = newElement("table");
    var thead = newElement("thead");
    var tbody = newElement("tbody");
    var tr;

    if (currDate.getDay() !== 0) {
      iter = 0 - currDate.getDay();
    }

    while (ready) {
      if (currDate.getDay() === 6) {
        if (tr) {
          tbody.appendChild(tr);
        }
        tr = null;
      }

      if (!tr) {
        tr = newElement("tr");
      }

      currDate = new Date(year, month, ++iter);

      tr.appendChild(
        newDayCell(currDate, iter < 1 || +currDate > +controlDate)
      );

      if (+controlDate < +currDate && currDate.getDay() === 0) {
        ready = false;
      }
    }

    thead.innerHTML =
      '<tr><th colspan="7">' +
      getMonthName(controlDate.getMonth()) +
      " " +
      controlDate.getFullYear() +
      "</th></tr>" +
      "<tr>" +
      '<th class="day">Sun</th>' +
      '<th class="day">Mon</th>' +
      '<th class="day">Tue</th>' +
      '<th class="day">Wed</th>' +
      '<th class="day">Thu</th>' +
      '<th class="day">Fri</th>' +
      '<th class="day">Sat</th>' +
      "</tr>";

    table.appendChild(thead);
    table.appendChild(tbody);

    table.className = "calendar";
    table.setAttribute("cellspacing", 0);
    table.setAttribute("cellpadding", 0);
    table.setAttribute("data-period", year + "-" + month);

    return table;
  }

  function newDayCell(dateObj, isOffset) {
    var td = newElement("td");
    var ev = newElement("ul");
    var number = newElement("span");
    var isoDate = dateObj;
    var eventList = [];
    var todayDate = new Date();
    //isoDate = isoDate.slice(0, isoDate.indexOf("T"));
    number.innerHTML = dateObj.getDate();
    td.className = isOffset ? "day adj-month" : "day";

    // set today Class name
    if (todayDate.setHours(0, 0, 0, 0) == dateObj.setHours(0, 0, 0, 0)) {
      td.classList.add("today");
    }

    td.setAttribute("data-date", isoDate);
    td.appendChild(number);

    for (var i = 0; i < data.length; i++) {
      //console.log();
      if (
        new Date(data[i].date).setHours(0, 0, 0, 0) ===
        isoDate.setHours(0, 0, 0, 0)
      ) {
        //console.log(data[i]);
        eventList.push(data[i]);
        var item = newElement("li");
        //item.style.backgroundColor = data[i].color;
        item.className = "event-indicator event-" + data[i].color;
        ev.appendChild(item);
      }
    }
    td.appendChild(ev);
    addEventListener(td, "click", function (e) {
      clearEventContainer();
      if(evEmptyContainer){
          evEmptyContainer.setAttribute("hidden", "");
      }
      
          // calendarEventsContainer.querySelector("h2 [data-date]").innerHTML = isoDate.getDay() + "/" + parseInt(isoDate.getMonth()+ 1)  + "/" + isoDate.getFullYear();
          if (eventList.length > 0) {
            evContainer.appendChild(buildEvents(eventList));
            refreshListHeight();
          }
          else{
            if(evEmptyContainer){
              evEmptyContainer.removeAttribute("hidden");
            }
          }

          clearCurrentSelection();
          td.classList.add("on");
      
    });

    return td;
  }

  function newElement(tagName) {
    return document.createElement(tagName);
  }

  function clearCurrentSelection() {
    //calendar.querySelectorAll('td').classList.remove('on');
    var td = calendar.querySelector(".on");
    if (td) {
      td.classList.remove("on");
    }
  }

  function clearEventContainer() {
    evContainer.innerHTML = "";
  }

  function buildControls(date) {
    var div = newElement("div");
    var prevBtn = newElement("span");
    var nextBtn = newElement("span");

    prevBtn.innerHTML = "";
    prevBtn.className = "calendar-control";
    prevBtn.setAttribute("uk-icon", "icon: chevron-left");
    prevBtn.setAttribute("data-calendar-control", "prev");

    nextBtn.innerHTML = "";
    nextBtn.className = "calendar-control";
    nextBtn.setAttribute("uk-icon", "icon: chevron-right");

    nextBtn.setAttribute("data-calendar-control", "next");

    div.className = "calendar-controls";

    div.appendChild(prevBtn);
    div.appendChild(nextBtn);

    removeEventListener(
      document.querySelector(".widget-events .calendar-wrapper"),
      "click",
      calendarControlClick
    );
    addEventListener(
      document.querySelector(".widget-events .calendar-wrapper"),
      "click",
      calendarControlClick
    );

    function calendarControlClick(evt) {
      evt.preventDefault();
      if (!evt.target.getAttribute("data-calendar-control")) {
        return;
      }

      var target = evt.target;

      while (target.parentNode) {
        if (target.parentNode === container) {
          break;
        }

        target = target.parentNode;

        if (!target) {
          return;
        }
      }

      var action = evt.target.getAttribute("data-calendar-control");

      switch (action) {
        case "prev":
          date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
          break;
        case "next":
          date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
          break;
      }

      calendar = buildTable(date.getFullYear(), date.getMonth());

      container.removeChild(container.firstChild);
      container.insertBefore(calendar, container.firstChild);
    }

    return div;
  }

  function addEventListener(target, event, handler) {
    if (document.addEventListener) {
      target.addEventListener(event, handler, false);
    } else {
      target.attachEvent("on" + event, handler);
    }
  }

  function removeEventListener(target, event, handler) {
    if (document.removeEventListener) {
      target.removeEventListener(event, handler, false);
    } else {
      target.detachEvent("on" + event, handler);
    }
  }

  function newEventDiv(evt) {
    var div = newElement("a");
    div.setAttribute("href", evt.url);
    div.className = "item-content";

    var imgDiv = newElement("div");
    imgDiv.className = "uk-cover-container";
    imgDiv.style.backgroundImage = "url('" + evt.imageURL + "')";
    // imgDiv.innerHTML =
    //   '<img  uk-cover src="' +
    //   evt.imageURL +
    //   '" alt="' +
    //   evt.title +
    //   '" title="' +
    //   evt.title +
    //   '" />';

    var detailsDiv = newElement("div");
    detailsDiv.className = "item-details";
    var headLine = newElement("h4");
    headLine.innerHTML =
      evt.date +
      '<span> <span class="event-indicator event-' +
      evt.color +
      '"></span>' +
      '<span class="text">' +
      evt.title +
      "</span></span>";
    detailsDiv.appendChild(headLine);
    var eloc = newElement("p");
    eloc.innerHTML = '<span uk-icon="icon: location"></span>' + evt.location;
    detailsDiv.appendChild(eloc);
    var etime = newElement("p");
    etime.innerHTML = '<span uk-icon="icon: clock"></span>' + evt.time;
    detailsDiv.appendChild(etime);

    div.appendChild(imgDiv);
    div.appendChild(detailsDiv);

    return div;
  }

  function buildEvents(eventList) {
    var events = newElement("ul");
    events.className = "uk-list slimscroll";
    for (var i = 0; i < eventList.length; i++) {
      let ev = newElement("li");

      ev.appendChild(newEventDiv(eventList[i]));
      events.appendChild(ev);
    }

    // set list height

    var options = {
      alwaysShowTracks: true
    };
    Scrollbar.init(events, options);

    return events;
  }

  function getMonthName(i) {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return monthNames[i];
  }

  function refreshListHeight() {
    evContainer.querySelector(".uk-list").style.height =
      container.offsetHeight -
      document.querySelector(".calendar-events h2").offsetHeight -
      32 +
      "px";
  }
}