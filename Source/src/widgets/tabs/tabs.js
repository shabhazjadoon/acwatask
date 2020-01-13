import UIkit from "uikit";
export function init() {
  let tabs = document.querySelector("[custom-tabs]");
  if (tabs) {
    var tabsNavItems = document.querySelectorAll("[tabs-nav] > li"),
      tabsContentItems = document.querySelectorAll("[tabs-content] > li"),
      toggleTabs = function(e) {
        e.preventDefault();
        [].map.call(tabsNavItems, function(elem) {
          elem.classList.remove("active-tab");
        });
        this.classList.add("active-tab");

        [].map.call(tabsContentItems, function(elem) {
          elem.classList.remove("active-tab");
        });
        var currentNavItemIndex = indexInParent(this);
        var currentTabContent = tabsContentItems[currentNavItemIndex];
        
        console.log(tabsNavItems);
        console.log(currentNavItemIndex);
        console.log(currentTabContent);

        currentTabContent.classList.add("active-tab");
        UIkit.update();
      };
     
    [].map.call(tabsNavItems, function(elem) {
      elem.addEventListener("click", toggleTabs, false);
    });
  }
}
function indexInParent(node) {
  var children = node.parentNode.childNodes;
  var num = 0;
  for (var i = 0; i < children.length; i++) {
    if (children[i] == node) return num;
    if (children[i].nodeType == 1) num++;
  }
  return -1;
}
