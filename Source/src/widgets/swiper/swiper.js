import Swiper from "swiper/dist/js/swiper.min.js";
export function init() {
  let sliders = document.querySelectorAll("[swiper-container]");
  
  if (sliders.length) {
    var swiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    // var galleryTop = new Swiper(".gallery-top", {
    //   spaceBetween: 10,
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev"
    //   }
    // });
    // var galleryThumbs = new Swiper(".gallery-thumbs", {
    //   spaceBetween: 10,
    //   centeredSlides: true,
    //   slidesPerView: "auto",
    //   touchRatio: 0.2,
    //   slideToClickedSlide: true
    // });
    // galleryTop.controller.control = galleryThumbs;
    // galleryThumbs.controller.control = galleryTop;
  }
 
}
