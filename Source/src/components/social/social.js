import axios from "axios";
import moment from "moment";
import UIkit from "uikit";
import * as loadMoreItems from "../load-more-items/load-more-items";

export function init() {
  let subscribeBtns = Array.from(
    document.querySelectorAll(".subscribe-status")
  );
  if (subscribeBtns) {
    subscribeBtns.forEach(subscribeBtn => {
      subscribeBtn.addEventListener("click", function() {
        var subscribeURL = this.getAttribute("data-api");
        if (subscribeURL) {
          getSubscribeStatus(subscribeURL, subscribeBtn);
        }
      });
    });
  }

  let statusBtns = Array.from(document.querySelectorAll(".event-status"));
  if (statusBtns) {
    statusBtns.forEach(statusBtn => {
      statusBtn.addEventListener("click", function() {
        var eventURL = this.getAttribute("data-api");
        if (eventURL) {
          getEventStatus(eventURL, statusBtn);
        }
      });
    });
  }

  let commentViewBtns = Array.from(
    document.querySelectorAll(".smootly-scroll")
  );
  if (commentViewBtns) {
    commentViewBtns.forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth"
        });
      });
    });
  }

  let likeBtns = Array.from(document.querySelectorAll(".like-status"));
  if (likeBtns) {
    likeBtns.forEach(likeBtn => {
      likeBtn.addEventListener("click", function() {
        var newsURL = this.getAttribute("data-api");
        if (newsURL) {
          updateLikeStatus(newsURL, likeBtn);
        }
      });
    });
  }

  let commentBtns = Array.from(document.querySelectorAll(".add-comment"));
  if (commentBtns) {
    commentBtns.forEach(commentBtn => {
      commentBtn.addEventListener("click", function(event) {
        var commentArea = getClosest(this, "div").querySelector("textarea");
        var commentURL = commentArea.getAttribute("data-api");
        if (
          commentURL &&
          commentArea.value.trim() !== "" &&
          commentArea.value.trim() !== undefined
        ) {
          addComment(commentURL, commentArea);
        } else {
          commentArea.value = "";
        }
      });
    });
  }

  let deleteBtns = Array.from(document.querySelectorAll(".delete-comment"));
  if (deleteBtns) {
    deleteBtns.forEach(deleteBtn => {
      deleteBtn.addEventListener("click", function() {
        var commentURL = getClosest(this, "li .item-content").getAttribute(
          "data-api"
        );
        deleteComment(commentURL, deleteBtn);
      });
    });
  }

  let editBtns = Array.from(document.querySelectorAll(".edit-comment"));
  if (editBtns) {
    editBtns.forEach(editBtn => {
      editBtn.addEventListener("click", function() {
        var commentURL = getClosest(this, "li .item-content").getAttribute(
          "data-api"
        );
        commentEditMode(editBtn);
      });
    });
  }

  let markAllBtns = Array.from(document.querySelectorAll(".mark-asread-btn"));
  if (markAllBtns) {
    markAllBtns.forEach(markAllBtn => {
      markAllBtn.addEventListener("click", function() {
        var notificationURL = this.getAttribute("data-api");
        if (notificationURL) {
          markAsRead(notificationURL, markAllBtn);
        }
      });
    });
  }

  let notifyBtns = Array.from(document.querySelectorAll(".notification-btn"));
  if (notifyBtns) {
    notifyBtns.forEach(notifyBtn => {
      notifyBtn.addEventListener("click", function(e) {
        var notifyURL = this.getAttribute("data-api");
        if (notifyURL) {
          e.preventDefault();
          notifyStatus(notifyURL, notifyBtn);
        }
      });
    });
  }
}

let currentComment;

function markAsRead(notificationURL, btn) {
  //var newStatus, id;

  if (notificationURL.match(/\?./)) {
    notificationURL = notificationURL + "&status=read";
  } else {
    notificationURL = notificationURL + "?status=read";
  }

  axios({
    method: "post",
    url: notificationURL
  }).then(function(response) {
    var parent = getClosest(btn, ".uk-dropdown");
    let notifyItems = Array.from(parent.querySelectorAll("li.unread"));
    if (notifyItems) {
      notifyItems.forEach(item => {
        item.classList.remove("unread");
      });
      getClosest(btn , ".actions").querySelector('.notify-btn .notification').remove();
    }
  });
}

function notifyStatus(notificationURL, btn) {
  var parent = getClosest(btn, "li");
  var newLocation = btn.getAttribute("href");
  if (parent.classList.contains("unread")) {
    if (notificationURL.match(/\?./)) {
      notificationURL =
        notificationURL +
        "&status=read" +
        "&notificationId=" +
        btn.getAttribute("notification-id");
    } else {
      notificationURL =
        notificationURL +
        "?status=read" +
        "&notificationId=" +
        btn.getAttribute("notification-id");
    }

    axios({
      method: "post",
      url: notificationURL
    }).then(function(response) {
      parent.classList.remove("unread");
      if (newLocation) {
        window.location.href = newLocation;
      }
    });
  } else {
    if (newLocation) {
      window.location.href = newLocation;
    }
  }
}

export function getSubscribeStatus(subscribeURL, btn) {
  var newStatus;
  var statusClass = "";

  newStatus = btn.classList.contains("subscribed")
    ? "unsubscribe"
    : "subscribe";

  if (subscribeURL.match(/\?./)) {
    subscribeURL =
      subscribeURL +
      "&status=" +
      newStatus +
      "&categoryId=" +
      btn.getAttribute("data-id");
  } else {
    subscribeURL =
      subscribeURL +
      "?status=" +
      newStatus +
      "&categoryId=" +
      btn.getAttribute("data-id");
  }

  axios({
    method: "post",
    url: subscribeURL
  }).then(
    function(response) {
      if (newStatus === "subscribe") {
        btn.classList.add("subscribed");
        statusClass = "danger";
      } else {
        btn.classList.remove("subscribed");
        statusClass = "primary";
      }
      UIkit.notification(newStatus + "d  Succesfully !", {
        pos: "bottom-right",
        status: statusClass
      });
    },
    function(error) {
      UIkit.notification("Error in subscription !", { pos: "bottom-right" });
    }
  );
}

function getEventStatus(eventURL, btn) {
  var attendeesNo,
    newStatus,
    widget = getClosest(btn, ".widget-article");

  newStatus = btn.dataset.status === "attend" ? "Unattend" : "attend";
  if (newStatus === "attend") {
    btn.innerHTML = "Unattend";
    btn.dataset.status = "attend";
  } else {
    btn.innerHTML = "Attend";
    btn.dataset.status = "unattend";
  }

  if (eventURL.match(/\?./)) {
    eventURL = eventURL + "&status=" + newStatus;
  } else {
    eventURL = eventURL + "?status=" + newStatus;
  }

  axios({
    method: "post",
    url: eventURL
    // data: {
    //     status: newStatus
    //   }
  }).then(function(response) {
    attendeesNo = response.data.attendees;
    widget.querySelector("p.attendees-no span").innerHTML = attendeesNo;
  });
}

export function updateLikeStatus(newsURL, btn) {
  var newStatus, likesNo;
  var parent = getClosest(btn, "li");

  newStatus = parent.classList.contains("liked") ? "unlike" : "like";
  

  if (newsURL.match(/\?./)) {
    newsURL = newsURL + "&status=" + newStatus;
  } else {
    newsURL = newsURL + "?status=" + newStatus;
  }

  axios({
    method: "post",
    url: newsURL
    // data: {
    //     status: newStatus
    //   }
  }).then(function(response) {
    likesNo = response.data.likes;
    parent.querySelector("span:last-of-type").innerHTML = likesNo;
    newStatus === "like"
    ? parent.classList.add("liked")
    : parent.classList.remove("liked");
  });
}

function addComment(commentURL, commentArea) {
  var commentsNo,
    commentDate,
    widget = getClosest(commentArea, ".widget-article"),
    commentList = widget.querySelector(".tile-comments ul "),
    commentTxt = commentArea.value.trim();

  commentArea.value = "";

  var hstatus,
    dstatus,
    month,
    hour = moment().hour(),
    min = moment().minute(),
    day = moment().date(),
    year = moment().year();

  const monthAR = [
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
  month = monthAR[moment().month()];

  if (hour > 12) {
    hour = hour - 12;
    hstatus = "pm";
  } else {
    hstatus = "am";
  }

  if (day === 1) {
    dstatus = "st";
  } else if (day === 2) {
    dstatus = "nd";
  } else if (day === 3) {
    dstatus = "rd";
  } else {
    dstatus = "th";
  }

  commentDate = {
    time: hour + ":" + min + " " + hstatus,
    date: day + dstatus + " " + month + " " + year
  };
  commentDate = JSON.stringify(commentDate);

  if (commentURL.match(/\?./)) {
    commentURL =
      commentURL + "&comment=" + commentTxt + "&commentDate=" + commentDate;
  } else {
    commentURL =
      commentURL + "?comment=" + commentTxt + "&commentDate=" + commentDate;
  }

  axios({
    method: "post",
    url: commentURL
    // data: {
    //     content: commentTxt,
    //     Date: commentDate
    //   }
  }).then(function(response) {
    commentsNo = response.data.comments;
    widget.querySelector(
      ".tile-social-icons .comments span:last-of-type"
    ).innerHTML = commentsNo;
    widget.querySelector(".tile-comments h5 span:last-of-type").innerHTML =
      commentsNo + " comments";

    var newComment = document.createElement("li");
    const markup = `
                <div class='item-content' data-api='${commentURL}'>
                    <a href='#'>
                        <div class='uk-cover-container' style="background-image:url('${
                          response.data.image
                        }')"></div>
                    </a>
                    <div class='item-details'>
                        <div class='comment-header'>
                            <div class='info'>
                                <span>${response.data.name}</span>
                                <span>${response.data.rol}</span>
                            </div>
                            <div class='comment-options uk-inline'>
                                <button class='uk-button' type='button'>
                                    <span uk-icon='icon: more'></span>
                                </button>
                                <div uk-dropdown='mode: click; pos: bottom-right;'>
                                    <ul>
                                    <li><a class="edit-comment"><span uk-icon='icon: pencil'></span>Edit</a></li>
                                    <li><a class="delete-comment"><span uk-icon='icon: trash'></span>Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class='comment-body'>
                            <p>
                            ${commentTxt}
                            </p>
                        </div>
                        <div class='comment-footer'>
                            <span>${hour}:${min} ${hstatus}</span>
                            <span>${day}
                            <sup>${dstatus}</sup> ${month} ${year}
                            </span>
                        </div>
                    </div>
                </div>`;
    newComment.innerHTML = markup;
    var deleteBtn = newComment.querySelector(".delete-comment");
    var editBtn = newComment.querySelector(".edit-comment");
    newComment.addEventListener("click", function(e) {
      if (e.target && e.target == deleteBtn) {
        var commentURL = getClosest(e.target, "li .item-content").getAttribute(
          "data-api"
        );
        deleteComment(commentURL, e.target);
      }
    });
    newComment.addEventListener("click", function(e) {
      if (e.target && e.target == editBtn) {
        var commentURL = getClosest(e.target, "li .item-content").getAttribute(
          "data-api"
        );
        commentEditMode(editBtn);
      }
    });
    commentList.insertBefore(
      newComment,
      commentList.querySelector("li:first-of-type")
    );
  });
}

export function deleteComment(commentURL, deleteBtn) {
  var commentsNo,
    widget = getClosest(deleteBtn, ".widget-article"),
    comment = getClosest(getClosest(deleteBtn, ".item-content"), "li"),
    commentID = getClosest(deleteBtn, ".item-content").dataset.id;

  comment.parentNode.removeChild(comment);

  if (commentURL.match(/\?./)) {
    commentURL = commentURL + "&ID=" + commentID;
  } else {
    commentURL = commentURL + "?ID=" + commentID;
  }

  axios({
    method: "put",
    url: commentURL
  }).then(function(response) {
    commentsNo = response.data.comments;
    widget.querySelector(
      ".tile-social-icons .comments span:last-of-type"
    ).innerHTML = commentsNo;
    widget.querySelector(".tile-comments h5 span:last-of-type").innerHTML =
      commentsNo + " comments";
  });
}

export function editComment(commentURL, editBtn) {
  var newComment;
  var commentParent = getClosest(editBtn, ".item-details").querySelector(
      ".comment-body"
    ),
    viewCommentEl = commentParent.querySelector("p"),
    commentArea = commentParent.querySelector("textarea");

  if (
    editBtn.classList.contains("apply-edit") &&
    commentArea.value !== currentComment &&
    commentArea.value.trim() !== "" &&
    commentArea.value.trim() !== undefined
  ) {
    var commentID = getClosest(editBtn, ".item-content").dataset.id;
    newComment = commentArea.value;
    viewCommentEl.innerHTML = newComment;

    if (commentURL.match(/\?./)) {
      commentURL =
        commentURL + "&newComment=" + newComment + "&ID=" + commentID;
    } else {
      commentURL =
        commentURL + "?newComment=" + newComment + "&ID=" + commentID;
    }

    axios({
      method: "put",
      url: commentURL,
      data: {
        content: newComment
      }
    });
  } else {
    newComment = currentComment;
  }

  commentViewMode(editBtn);
}

export function commentEditMode(editBtn) {
  var parent = getClosest(editBtn, ".item-details"),
    commentParent = parent.querySelector(".comment-body"),
    oldCommentEl = commentParent.querySelector("p"),
    currentComment = oldCommentEl.innerHTML;

  const markup = ` 
        <textarea class="uk-textarea"></textarea>
        <div>
            <a class="cancel-edit uk-link-muted"> cancel</a>
            <a class="apply-edit uk-link-text"> update</a>
        </div>
    `;

  var editedParent = document.createElement("div"),
    overlay = document.createElement("div");
  editedParent.className = "for-edit";
  editedParent.innerHTML = markup;

  var editedArea = editedParent.querySelector("textarea");
  editedArea.value = currentComment.trim();
  var cancelBtn = editedParent.querySelector(".cancel-edit");
  var applyBtn = editedParent.querySelector(".apply-edit");
  editedParent.addEventListener("click", function(e) {
    if (e.target && e.target == cancelBtn) {
      var commentURL = getClosest(e.target, "li .item-content").getAttribute(
        "data-api"
      );
      editComment(commentURL, e.target);
    }
  });
  editedParent.addEventListener("click", function(e) {
    if (e.target && e.target == applyBtn) {
      var commentURL = getClosest(e.target, "li .item-content").getAttribute(
        "data-api"
      );
      editComment(commentURL, e.target);
    }
  });

  oldCommentEl.style.display = "none";
  getClosest(editBtn, ".comment-options").style.display = "none";

  commentParent.insertBefore(editedParent, oldCommentEl);

  overlay.className = "for-edit-overlay";
  document.body.appendChild(overlay);
  getClosest(parent, "li").classList.add("for-edit");
  //document.body.style.overflow = "hidden";
}

export function commentViewMode(editBtn) {
  var parent = getClosest(editBtn, ".item-details"),
    commentParent = parent.querySelector(".comment-body"),
    viewCommentEl = commentParent.querySelector("p"),
    editedCommentEl = commentParent.querySelector(".for-edit");

  editedCommentEl.parentNode.removeChild(editedCommentEl);
  parent.querySelector(".comment-options").style.display = "inline-block";
  viewCommentEl.style.display = "block";

  //document.body.querySelector('.for-edit-overlay').remove();
  var editOverLAY = document.body.querySelector(".for-edit-overlay");
  editOverLAY.parentNode.removeChild(editOverLAY);
  getClosest(parent, "li").classList.remove("for-edit");
  //document.body.style.overflow = "visible";
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
