//import React from "react";
//import ReactDOM from "react-dom";
//import registerServiceWorker from "./registerServiceWorker";
//import Comments from "./app/Comments";

//import './components/swiper/swiper';
import Scrollbar from "smooth-scrollbar";
import * as widgets from "./components/widget/widget";
import * as social from "./components/social/social";
import * as loadMoreItems from "./components/load-more-items/load-more-items";
import * as editSwitch from "./widgets/edit-switch/edit-switch";
import * as loadMore from "./widgets/loadMore/loadMore";
import * as poll from "./widgets/poll/poll";
import * as customTabs from "./widgets/tabs/tabs";
import Calendar from "./widgets/calendar/calendar";
import "./widgets/weather/weather";
import * as videoModal from "./widgets/video/video";
import * as slimscroll from "./components/slimscroll/slimscroll";
import PeopleList from './widgets/people-section/people-section';
import MyNotifications from './widgets/my-notification/my-notifications';
import Groups from './widgets/my-groups/groups';
import MyFeed from './widgets/yammer-feed/yammer-feed';
import SearchResults from './widgets/yammer-search/yammer-search';


import Handlebars from 'handlebars/dist/handlebars';

//swiper
import "swiper/dist/css/swiper.css";
import * as slider from "./widgets/swiper/swiper";

//map
import "mapbox-gl/dist/mapbox-gl.css";
import * as map from "./widgets/map/map";

//uikit
import "uikit/dist/css/uikit.min.css";
import Icons from "uikit/dist/js/uikit-icons";
import UIkit from "uikit";

// styles
import "./index.scss";
//console.log(window.amp);

let peopleList = new PeopleList();
let myNotifications = new MyNotifications();
let groups = new Groups();
let feed = new MyFeed(); 
let search = new SearchResults();

//Icons
UIkit.use(Icons);

// closest
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
    i,
    el = this;
    do {
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== el) {}
    } while (i < 0 && (el = el.parentElement));
    return el;
  };
}

//Scrollbar
for (const value of document.getElementsByClassName("slimscroll")) {
  var options = {
    alwaysShowTracks: true
  };
  Scrollbar.init(value, options);
}

//toggles
let toggles = document.querySelectorAll("[uk-toggle]");
if (toggles.length) {
  [].map.call(toggles, toggle => {
    toggle.onclick = e => {
      toggle.classList.toggle("on");
      var resizeEvent = window.document.createEvent("UIEvents");
      resizeEvent.initUIEvent("resize", true, false, window, 0);
      window.dispatchEvent(resizeEvent);
    };
  });
}
//comments react
// if (document.getElementById("comments")) {
//   ReactDOM.render(<Comments />, document.getElementById("comments"));
//   registerServiceWorker();
// }

// Initialize Widgets Handler
widgets.init();

// Initialize social
social.init();

// Initialize Edit Functionality
editSwitch.init();

//Inititialize custom tabs
customTabs.init();

// init loadMore widget
loadMore.init();

// init loadMore items
loadMoreItems.init();

// init video modal
videoModal.init();

// init poll widget
poll.init();

// init swiper widget
slider.init();

//init map widget
map.init();

window.addEventListener("load", function() {
  //slim scroll
  slimscroll.init();
  var resizeEvent = window.document.createEvent("UIEvents");
  resizeEvent.initUIEvent("resize", true, false, window, 0);
  window.dispatchEvent(resizeEvent);
});

// UIkit.util.on(".uk-switcher", "show", function(e) {
//     console.log(e);
// });

//calendar init
Calendar(".widget-events");

//window.onload = function() {
document.body.removeAttribute("style");
//};







//Forum element toggle
$('.SecSelection .Sec-Fourms').click(function(){
   if($(this).is(":checked")){
    $('#Sec-Fourms').removeClass('uk-hidden');
    $('#Sec-IndNews').removeClass('uk-width-1-1@m').addClass('uk-width-1-2@m');
    
  }
  else if($(this).is(":not(:checked)")){
    $('#Sec-Fourms').addClass('uk-hidden');
    $('#Sec-IndNews').removeClass('uk-width-1-2@m').addClass('uk-width-1-1@m');  
   }
});

//News section toggle
$('.SecSelection .Sec-IndNews').click(function(){
  if($(this).is(":checked")){
   $('#Sec-IndNews').removeClass('uk-hidden');
   $('#Sec-Fourms').removeClass('uk-width-1-1@m').addClass('uk-width-1-2@m');
   
 }
 else if($(this).is(":not(:checked)")){
   $('#Sec-IndNews').addClass('uk-hidden');
   $('#Sec-Fourms').removeClass('uk-width-1-2@m').addClass('uk-width-1-1@m');  
  }
});



//WorkPlace
$('.SecSelection .Sec-Workspace').click(function(){

  if($(this).is(":checked")){
   $('#Sec-Workspace').removeClass('uk-hidden');
   $('#Sec-Notifications').removeClass('uk-width-1-1@l').addClass('uk-width-3-5@l');
   
 }
 else if($(this).is(":not(:checked)")){
   $('#Sec-Workspace').addClass('uk-hidden');
   $('#Sec-Notifications').removeClass('uk-width-3-5@l').addClass('uk-width-1-1@l');  
  }
});

//Notification
$('.SecSelection .Sec-Notifications').click(function(){
   
  if($(this).is(":checked")){
   $('#Sec-Notifications').removeClass('uk-hidden');
   $('#Sec-Workspace').removeClass('uk-width-1-1@l').addClass('uk-width-2-5@l');
   
 }
 else if($(this).is(":not(:checked)")){
   $('#Sec-Notifications').addClass('uk-hidden');
   $('#Sec-Workspace').removeClass('uk-width-2-5@l').addClass('uk-width-1-1@l');  
  }
});

//Events
$('.SecSelection .Sec-Events').click(function(){
  if($(this).is(":checked")){
   $('#Sec-Events').removeClass('uk-hidden');
 }
 else if($(this).is(":not(:checked)")){
   $('#Sec-Events').addClass('uk-hidden');
  }
});

//Offer
$('.SecSelection .Sec-Offers').click(function(){
   
  if($(this).is(":checked")){
   $('#Sec-Offers').removeClass('uk-hidden');
   $('#Sec-Poll').removeClass('uk-width-1-1@m').addClass('uk-width-1-3@m');
   
 }
 else if($(this).is(":not(:checked)")){
   $('#Sec-Offers').addClass('uk-hidden');
   $('#Sec-Poll').removeClass('uk-width-1-3@m').addClass('uk-width-1-1@m');  
  }
});

//poll
$('.SecSelection .Sec-Poll').click(function(){
   
  if($(this).is(":checked")){
   $('#Sec-Poll').removeClass('uk-hidden');
   $('#Sec-Offers').removeClass('uk-width-1-1@m').addClass('uk-width-2-3@m');
   
 }
 else if($(this).is(":not(:checked)")){
   $('#Sec-Poll').addClass('uk-hidden');
   $('#Sec-Offers').removeClass('uk-width-2-3@m').addClass('uk-width-1-1@m');  
  }
});



 