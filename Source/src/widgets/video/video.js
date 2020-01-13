//// videoModal Module //////////////////

"use strict";
import UIkit from "uikit";
//import {amp} from "azure";

export function init() {
  //_clickHandler(); _closeModalHandler();
  let videoTiles = Array.from(document.querySelectorAll(".tile-video"));
  if (videoTiles) {
    videoTiles.forEach(element => {
      const videoOptions = {
        nativeControlsForTouch: false,
        controls: true,
        width: "100%",
        height: "auto"
      };

      const videoButton = element.querySelector(".icon-container a");
      if (videoButton) {
        const videoModal = element.querySelector(
          videoButton.getAttribute("href")
        );
        // check and excute only if the modal was no initialized before
        if (videoModal) {
          let vID = guidGenerator();
          var videlem = document.createElement("video");

          // Create Video Element
          videlem.id = vID;
          videlem.autoplay = true;
          videlem.className =
            "azuremediaplayer amp-default-skin amp-big-play-centered";
          let sourceMP4 = document.createElement("source");
          sourceMP4.type = "application/vnd.ms-sstr+xml";
          sourceMP4.src = videoModal.getAttribute("data-azure");
          videlem.appendChild(sourceMP4);

          UIkit.util.on(videoModal, "show", function() {
            if (!videoModal.querySelector(".uk-modal-dialog video")) {
              videoModal.querySelector(".uk-modal-dialog").appendChild(videlem);
            }
            let myPlayer = window.amp(vID, videoOptions);
            myPlayer.ready(function() {
              var myPlayer = this;
              myPlayer.play();
            });
          });
          UIkit.util.on(videoModal, "hide", function() {
            let myPlayer = window.amp(vID);
            myPlayer.pause();
          });
        }
      }
    });
  }
}

function guidGenerator() {
  var S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}
