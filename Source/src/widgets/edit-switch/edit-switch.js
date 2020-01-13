"use strict";
import axios from "axios";

export function init() {
  let editSwitch = document.querySelector(".page-edit-switch");
  let isEditing = false;

  // Add Handle
  if (editSwitch) {
    editSwitch.onclick = function(ev) {
      ev.preventDefault();
      document.body.classList.toggle("edit-on");
      isEditing = !isEditing;

      if (!isEditing) {
        //

        editSwitch.appendChild(_createLoadSpinner());
        save();
      } else {
        editSwitch.querySelector("span").innerHTML = "Save";
      }
    };
  }
  return editSwitch;
}

export function save() {
  //console.log('post to server');
  axios
    .get("/save-layout.json")
    .then(function(response) {
      _removeLoadSpinner();
    })
    .catch(function(error) {
      console.log(error);
      _removeLoadSpinner();
    });
}

export function getPageLayout() {
  //console.log('get page layout'); return ["ss"]
}

function _createLoadSpinner() {
  let spingOverlay = document.createElement("div");
  let spinIcon = document.createElement("div");

  spinIcon.setAttribute("uk-spinner", "");
  spinIcon.setAttribute("class", "uk-position-center");

  spingOverlay.setAttribute(
    "class",
    "uk-overlay-primary uk-position-cover uk-animation-fade "
  );
  spingOverlay.appendChild(spinIcon);

  return spingOverlay;
}

function _removeLoadSpinner() {
  let editSwitch = document.querySelector(".page-edit-switch");
  //
  editSwitch
    .querySelector(".uk-overlay-primary")
    .classList.add("uk-animation-reverse");
  setTimeout(() => {
    var el = document.querySelector(".page-edit-switch .uk-overlay-primary");
    el.parentNode.removeChild( el );

    editSwitch.querySelector("span").innerHTML = "Edit";
  }, 500);
}
