"use strict";
import axios from "axios";
import UIkit from "uikit";
import * as videoModal from "../video/video";
import * as social from "../../components/social/social";

export function init() {
  let loadMore = Array.from(document.querySelectorAll(".btn-loadmore"));
  //let isEditing = false; console.log(loadMore);
  if (loadMore) {
    loadMore.forEach(element => {
      const buttonContainer = getClosest(element,'.uk-width-extend');
      const buttonContainerClone = getClosest(element,'.uk-width-extend').cloneNode(true);
      const spinnerContainer = getClosest(element,'.uk-text-center');
      let container =   getClosest(element, '.uk-grid');

      // Get Page Number
      let page = (container.dataset.page === undefined)?   1 : parseInt(container.dataset.page);
        //console.log(page);
      element.onclick = function (e) {
        e.preventDefault();   
        
        let uri = element.getAttribute('data-api')+'?page='+container.dataset.page
        if (element.getAttribute('data-api').match(/\?./)) {
          uri = element.getAttribute('data-api')+'&page='+container.dataset.page
        } 

        // Get Data and Append
        axios({
          method:'get',
          url:uri,
        })
          .then(function(response) {
          container.dataset.page= page+1;
          var hasMore = (response.data[response.data.length-1].includes("true")) ? true : false;
          if(response.data.length>0){
           // buttonContainer.remove(); // IE doesn't support .remove()  falling back to removeChild below
           buttonContainer.parentNode.removeChild(buttonContainer);
            response.data.forEach(elm => {
              if(elm != response.data[response.data.length-1]){
                container.innerHTML = container.innerHTML + elm;
              }
            });

            UIkit.grid(container);
           
            container.appendChild(buttonContainerClone);
            init();
            bindingEvents(container);
            // init video modal
            videoModal.init();
            if(!hasMore){
              buttonContainerClone.remove();
            }
          }
          else{
            buttonContainer.remove();
          }

        });
        
        spinnerContainer.innerHTML = "<div data-uk-spinner></div>";
      }
    });
  }
  
}


function bindingEvents(container){
  let subscribeBtns = Array.from(
    document.querySelectorAll(".subscribe-status")
  );
  if (subscribeBtns) {
    subscribeBtns.forEach(subscribeBtn => {
      subscribeBtn.addEventListener("click", function() {
        var subscribeURL = this.getAttribute("data-api");
        if (subscribeURL) {
          social.getSubscribeStatus(subscribeURL, subscribeBtn);
        }
      });
    });
  }

  let likeBtns = Array.from(document.querySelectorAll(".like-status"));
  if (likeBtns) {
    likeBtns.forEach(likeBtn => {
      likeBtn.addEventListener("click", function() {
        var newsURL = this.getAttribute("data-api");
        if (newsURL) {
          social.updateLikeStatus(newsURL, likeBtn);
        }
      });
    });
  }
  
}



function getClosest( elem, selector ) {

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
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.matches( selector ) ) return elem;
	}

	return null;

};

// export function save() {
//   //console.log('post to server');
//   axios
//     .get("/save-layout.json")
//     .then(function(response) {
//       _removeLoadSpinner();
//     })
//     .catch(function(error) {
//       console.log(error);
//       _removeLoadSpinner();
//     });
// }


// function _createLoadSpinner() {
//   let spingOverlay = document.createElement("div");
//   let spinIcon = document.createElement("div");

//   spinIcon.setAttribute("uk-spinner", "");
//   spinIcon.setAttribute("class", "uk-position-center");

//   spingOverlay.setAttribute(
//     "class",
//     "uk-overlay-primary uk-position-cover uk-animation-fade "
//   );
//   spingOverlay.appendChild(spinIcon);

//   return spingOverlay;
// }

// function _removeLoadSpinner() {
//   let editSwitch = document.querySelector(".page-edit-switch");
//   //
//   editSwitch
//     .querySelector(".uk-overlay-primary")
//     .classList.add("uk-animation-reverse");
//   setTimeout(() => {
//     var el = document.querySelector(".page-edit-switch .uk-overlay-primary");
//     el.parentNode.removeChild( el );

//     editSwitch.querySelector("span").innerHTML = "Edit";
//   }, 500);
// }
