"use strict";
import axios from "axios";
import UIkit from "uikit";

export function init() {
  let poll = Array.from(document.querySelectorAll(".widget-poll"));
  //let isEditing = false; console.log(loadMore);
  if (poll) {
    poll.forEach(element => {
      const pollResult = element.querySelector(".poll-result");
      const pollResultWrapper = element.querySelector(".poll-result-wrapper");
      const submit = element.querySelector(".btn-submit");

      // show result if already voted
      if (
        element.getAttribute("data-result") &&
        element.getAttribute("data-result").length > 0
      ) {
        axios({
          method: "get",
          url: element.getAttribute("data-result")
        }).then(function(response) {
          pollResult.classList.add("on");
          response.data.forEach(elm => {
            pollResultWrapper.innerHTML =
              pollResultWrapper.innerHTML +
              getResultItem(elm[0], elm[1], elm[2], element);
          });
        });
      }
      if (pollResult && pollResult.querySelector(".uk-close")) {
        pollResult.querySelector(".uk-close").onclick = function(e) {
          e.preventDefault();
          pollResult.classList.remove("on");
          pollResultWrapper.innerHTML = "";
        };
      }
      if (submit) {
        // Get Data and Append
        submit.onclick = function(e) {
          e.preventDefault();
          if (element.querySelector('input[type="radio"]:checked')) {
            axios({
              method: "post",
              url:
                element.getAttribute("data-api") +
                "?qid=" +
                element.getAttribute("data-qid") +
                "&vote=" +
                element.querySelector('input[type="radio"]:checked').value,
              data: {
                qid: element.getAttribute("data-qid"),
                vote: element.querySelector('input[type="radio"]:checked').value
              }
            }).then(function(response) {
              pollResult.classList.add("on");
              response.data.forEach(elm => {
                pollResultWrapper.innerHTML =
                  pollResultWrapper.innerHTML +
                  getResultItem(elm[0], elm[1], elm[2], element);
                //console.log(elm);
              });
            });
          }
        };
      }

      //   }
    });
  }
}
function makeid() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function getResultItem(l, v, m, e) {
  let id = makeid();
  setTimeout(() => {
    document.getElementById(id).value = v;
  }, 500);
  return (
    '<div class="poll-result-item uk-grid-match uk-grid-collapse uk-grid uk-flex uk-flex-middle" uk-grid><div class="uk-width-1-1"><label>' +
    l +
    '</label></div> <div class="uk-width-1-1 uk-position-relative"> <span>' +
    v +
    '%</span> <progress id="' +
    id +
    '" value="0" max="' +
    m +
    '"></progress> </div> </div>'
  );
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
