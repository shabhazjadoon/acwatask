import axios from "axios";
import * as social from "../social/social";

export function init() {
    let loadMore = Array.from(document.querySelectorAll(".btn-loadmore-item"));
    if(loadMore){
        loadMore.forEach(btn => {
            let container = getClosest(btn, 'ul');
            // Get Page Number
            let page = (container.dataset.page === undefined)?   1 : parseInt(container.dataset.page);
            btn.addEventListener("click", function() {
                var loadMoreURL = this.getAttribute('data-api');
                if (loadMoreURL) {
                    let uri = loadMoreURL+'?page='+container.dataset.page
                    if (loadMoreURL.match(/\?./)) {
                    uri = loadMoreURL+'&page='+container.dataset.page
                    } 
                    loadMoreItems(uri,btn,page);
                }
            }); 

        });
    }   
}

function loadMoreItems(loadMoreURL,btn,page){
    var container = getClosest(btn, 'ul'),
        btnContainer = getClosest(btn, '.more'),
        btnContainerClone = btnContainer.cloneNode(true),
        spinner = "<div data-uk-spinner></div>";

    axios({
        method:'get',
        url:loadMoreURL
      })
        .then(function(response) {
            container.dataset.page= page+1;
            var hasMore = (response.data[response.data.length-1].includes("true")) ? true : false;

            if(response.data.length>0){

                //btnContainer.remove();
                btnContainer.parentNode.removeChild(btnContainer);
                response.data.forEach(elm => {
                    if(elm != response.data[response.data.length-1]){
                        container.innerHTML = container.innerHTML + elm;
                    }
                });
                bindingEvents(container);
                //social.init();

            }
            if(hasMore){
                container.appendChild(btnContainerClone);
                init();
            }

      });
      btnContainer.innerHTML = spinner;
}

function bindingEvents(container){
    let deleteBtns = Array.from(container.querySelectorAll(".delete-comment"));
    if(deleteBtns){
        deleteBtns.forEach(deleteBtn => {
            deleteBtn.addEventListener("click", function() {
                var commentURL = getClosest(this , 'li .item-content' ).getAttribute('data-api');
                social.deleteComment(commentURL,deleteBtn);
            }); 
        });
    }

    let editBtns = Array.from(container.querySelectorAll(".edit-comment"));
    if(editBtns){
        editBtns.forEach(editBtn => {
            editBtn.addEventListener("click", function() {
                var commentURL = getClosest(this , 'li .item-content' ).getAttribute('data-api');
                social.commentEditMode(editBtn);
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