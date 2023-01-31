export function swiper1() {
  const swiper = new Swiper('.swiper-1', {
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

export function onKeyPressSwiper1Handler(e) {
  const swiper1 = document.querySelector('.swiper-1').swiper;
  if (e.keyCode === 37) {
    swiper1.slidePrev();
  } else if (e.keyCode === 39) {
    swiper1.slideNext();
  }
}
