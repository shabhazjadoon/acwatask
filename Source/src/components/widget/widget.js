export function init() {
  let sortableWidgets = document.querySelectorAll("[uk-sortable] .widget");
  // Add Handle
  if (sortableWidgets.length > 0) {
    // sortableWidgets.forEach(function(e, i) {

    //   e.querySelector(".wg-wrapper")
    //     ? e.querySelector(".wg-wrapper").append(_createWidgetDragHandle())
    //     : {};
    // });

    [].map.call(sortableWidgets, function(elem) {
      if(elem.querySelector(".wg-wrapper")){
        elem.querySelector(".wg-wrapper").appendChild(_createWidgetDragHandle())
      }
      // 
      //   ? 
      //   : {};
    });
  }
}

function _createWidgetDragHandle() {
  let wgHandle = document.createElement("div");
  let mvIcon = document.createElement("i");

  mvIcon.setAttribute("uk-icon", "icon: move ; ratio: 2");
  mvIcon.setAttribute("class", "uk-position-center");

  wgHandle.setAttribute(
    "class",
    "wg-handle uk-overlay-primary uk-position-cover uk-animation-fade "
  );
  wgHandle.appendChild(mvIcon);

  return wgHandle;
}
