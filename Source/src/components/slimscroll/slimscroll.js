export function init() {
    let slimscrolls = document.querySelectorAll(".slimscroll");

    if (slimscrolls.length) {
        [].map.call(slimscrolls, function (s) {
           
            var parent = getClosest(s, '.wg-wrapper');
            if (parent !== null) {
                var height = parent.offsetHeight;
                if (height > 550) {
                    var paddingTop = parseInt(parent.style.paddingTop) || 0;
                    var paddingBottom = parseInt(parent.style.paddingBottom) || 0;
                    var headerHeight = parent.querySelector(".wg-header") ? parent.querySelector(".wg-header").offsetHeight : 0;
                    var footerHeight = parent.querySelector(".wg-footer") ? parent.querySelector(".wg-footer").offsetHeight : 0;
                    var actualHeight = height - paddingTop - paddingBottom - headerHeight - footerHeight - 60 - 80;
                    s.style.height = actualHeight + "px";
                }

            }

        });
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
                function (s) {
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

    };
}