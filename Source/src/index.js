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







//Sec-Values
//Forum element toggle
// $('.SecSelection .Sec-Weather').click(function(){
//   if($(this).is(":checked")){
//    $('#Sec-Weather').removeClass('uk-hidden');
//    //$('#Sec-IndNews').removeClass('uk-width-1-1@m').addClass('uk-width-1-2@m');
   
//  }
//  else if($(this).is(":not(:checked)")){
//    $('#Sec-Weather').addClass('uk-hidden');
//   // $('#Sec-IndNews').removeClass('uk-width-1-2@m').addClass('uk-width-1-1@m');  
//   }
// });





$('.SecSelection .Sec-Weather').click(function(){ 
  debugger;
  if($(this).is(":checked")){
      if($('#Sec-Values').hasClass('uk-hidden')){
        $('#Sec-Banner').removeClass('uk-width-1-1@l  uk-animation-scale-rigt').addClass('uk-width-2-3@l');
      }
  $('#Sec-Weather').addClass('uk-hidden');
   $('#Sec-Weather').removeClass('uk-hidden').addClass('uk-animation-scale-down');
 }
 else if($(this).is(":not(:checked)")){
      //check if services section is hidden or not
        if($('#Sec-Values').hasClass('uk-hidden')){
               $('#Sec-Banner').removeClass('uk-width-2-3@l').addClass('uk-width-1-1@l uk-animation-scale-right'); 
        }
        $('#Sec-Weather').addClass('uk-hidden');
        $('#Sec-Values').addClass('uk-animation-scale-up');
  }
 });




 $('.SecSelection .Sec-Values').click(function(){ 
  debugger;
  if($(this).is(":checked")){
      if($('#Sec-Weather').hasClass('uk-hidden')){
        $('#Sec-Banner').removeClass('uk-width-1-1@l  uk-animation-scale-up').addClass('uk-width-2-3@l');
      }
  $('#Sec-Values').addClass('uk-hidden');
   $('#Sec-Values').removeClass('uk-hidden  uk-animation-scale-down');
 }
 else if($(this).is(":not(:checked)")){
      //check if services section is hidden or not
        if($('#Sec-Weather').hasClass('uk-hidden')){
               $('#Sec-Banner').removeClass('uk-width-2-3@l').addClass('uk-width-1-1@l uk-animation-scale-right'); 
        }
        $('#Sec-Values').addClass('uk-hidden');
  }
 });

 
















$('.SecSelection .Sec-Values').click(function(){
  if($(this).is(":checked")){
   $('#Sec-Values').removeClass('uk-hidden');
   //$('#Sec-IndNews').removeClass('uk-width-1-1@m').addClass('uk-width-1-2@m');
   
 }
 else if($(this).is(":not(:checked)")){
   $('#Sec-Values').addClass('uk-hidden');
  // $('#Sec-IndNews').removeClass('uk-width-1-2@m').addClass('uk-width-1-1@m');  
  }
});



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



//Forum element toggle
$('.SecSelection .Sec-Fourms').click(function(){
  if($(this).is(":checked")){ 
     $('#Sec-Fourms').removeClass('uk-hidden');
     $('#Sec-IndNews').removeClass('uk-width-1-1@m uk-animation-slide-right').addClass('uk-animation-slide-left uk-width-1-2@m');
   
   }
   else if($(this).is(":not(:checked)")){
 
    $('#Sec-Fourms').addClass('uk-animation-slide-right uk-hidden');
     $('#Sec-IndNews').removeClass('uk-animation-slide-left  uk-width-1-2@m').addClass('uk-width-1-1@m uk-animation-scale-up'); 
  }
});



//News section toggle
$('.SecSelection .Sec-IndNews').click(function(){
 if($(this).is(":checked")){
  $('#Sec-IndNews').removeClass('uk-hidden').addClass('uk-animation-slide-left');
  $('#Sec-Fourms').removeClass('uk-width-1-1@m uk-animation-slide-left').addClass('uk-animation-slide-right uk-width-1-2@m');
  
}
else if($(this).is(":not(:checked)")){
  $('#Sec-IndNews').addClass('uk-hidden').removeClass('uk-animation-slide-left');
  $('#Sec-Fourms').removeClass('uk-width-1-2@m uk-animation-slide-right').addClass('uk-width-1-1@m uk-animation-scale-up');  
 }
});



//WorkPlace
$('.SecSelection .Sec-Workspace').click(function(){

 if($(this).is(":checked")){
  $('#Sec-Workspace').removeClass('uk-hidden');
  $('#Sec-Notifications').removeClass('uk-width-1-1@l  uk-animation-slide-right').addClass('uk-animation-slide-left uk-width-3-5@l');
  
}
else if($(this).is(":not(:checked)")){
  $('#Sec-Workspace').addClass('uk-animation-slide-right uk-hidden');
  $('#Sec-Notifications').removeClass('uk-animation-slide-left  uk-width-3-5@l').addClass('uk-width-1-1@l uk-animation-scale-up');  
 }
});

//Notification
$('.SecSelection .Sec-Notifications').click(function(){
  
 if($(this).is(":checked")){
  $('#Sec-Notifications').removeClass('uk-hidden').addClass('uk-animation-slide-left');
  $('#Sec-Workspace').removeClass('uk-width-1-1@l uk-animation-slide-left').addClass('uk-animation-slide-right uk-width-2-5@l');
  
}
else if($(this).is(":not(:checked)")){
  $('#Sec-Notifications').addClass('uk-hidden').removeClass('uk-animation-slide-left');
  $('#Sec-Workspace').removeClass('uk-width-2-5@l uk-animation-slide-right').addClass('uk-width-1-1@l uk-animation-scale-up');  
 }
});

//Events
$('.SecSelection .Sec-Events').click(function(){
 if($(this).is(":checked")){
  $('#Sec-Events').removeClass('uk-hidden uk-animation-scale-down').addClass('uk-animation-scale-up');
}
else if($(this).is(":not(:checked)")){
  $('#Sec-Events').addClass('uk-animation-scale-down uk-hidden').removeClass('uk-animation-scale-down');
 }
});



//poll

$('.SecSelection .Sec-Poll').click(function(){ 
 debugger;
 if($(this).is(":checked")){
     if($('#PollServices').hasClass('uk-hidden')){
       $('#PollServices').removeClass('uk-hidden');
       $('#Sec-Offers').removeClass('uk-width-1-1@m  uk-animation-scale-up').addClass('uk-width-2-3@m');
     }
  $('#Sec-Poll').removeClass('uk-hidden  uk-animation-scale-up');
  $('#Sec-Services').removeClass('uk-animation-scale-up');
  
}
else if($(this).is(":not(:checked)")){
     //check if services section is hidden or not
       if($('#Sec-Services').hasClass('uk-hidden')){
              $('#PollServices').addClass('uk-hidden');
              $('#Sec-Offers').removeClass('uk-width-2-3@m').addClass('uk-width-1-1@m uk-animation-scale-up'); 
       }
       
       $('#Sec-Poll').addClass('uk-hidden uk-animation-scale-up');
       $('#Sec-Services').addClass('uk-animation-scale-up');
 }
});



// Services
$('.SecSelection .Sec-Services').click(function(){
 debugger; 
 if($(this).is(":checked")){
 
  $('#Sec-Services').removeClass('uk-hidden  uk-animation-scale-up');
  $('#Sec-Poll').removeClass('uk-animation-scale-up');
  $('#PollServices').removeClass('uk-hidden');
  $('#Sec-Offers').removeClass('uk-width-1-1@m  uk-animation-scale-up').addClass('uk-width-2-3@m');
  
}
else if($(this).is(":not(:checked)")){
   //check if Poll section is hidden or not
   if($('#Sec-Poll').hasClass('uk-hidden')){
     $('#PollServices').addClass('uk-hidden');
     $('#Sec-Offers').removeClass('uk-width-2-3@m').addClass('uk-width-1-1@m uk-animation-scale-up'); 
 }
  $('#Sec-Services').addClass('uk-hidden uk-animation-scale-up');
  $('#Sec-Poll').addClass('uk-animation-scale-up');  
 }
});


//Offer & promotions
$('.SecSelection .Sec-Offers').click(function(){
 debugger;
 if($(this).is(":checked")){ 
    $('#Sec-Offers').removeClass('uk-hidden').addClass('uk-animation-slide-right'); 
    $('#PollServices').removeClass('uk-width-1-1@m uk-animation-slide-right').addClass('uk-animation-slide-left uk-width-1-3@m');
  
  }
  else if($(this).is(":not(:checked)")){

   $('#Sec-Offers').addClass('uk-hidden');
    $('#PollServices').removeClass('uk-animation-slide-left  uk-width-1-3@m').addClass('uk-width-1-1@m uk-animation-scale-up'); 
 }
});
// $(window).on("load", function(){

//  let SelectedBoxs = [
//    { "ClassName":"Sec-Fourms", "Value":"false"},
//    { "ClassName":"Sec-IndNews", "Value":"true"},
//    { "ClassName":"Sec-Workspace", "Value":"true"}
//  ];

//  for(let i=0; i<SelectedBoxs.length; i++)
//  {
//    var item=SelectedBoxs[i];
//        if(item!=null)
//        {
//        var checkboxClass =item.ClassName;
//        var value =item.Value;

//        if(value=='false'){
//          debugger;
//          $('.'+checkboxClass).trigger('click');
//        } 
//        }
// }
// });