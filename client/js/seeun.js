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
  const swiperName = this.getAttribute('class').slice(27, 35);
  const keyDirection = this.getAttribute('class').slice(-4);
  const swiper = document.querySelector(`.${swiperName}`).swiper;
  if (keyDirection === 'prev' && e.keyCode === 37) {
    swiper.slidePrev();
  } else if (keyDirection === 'next' && e.keyCode === 39) {
    swiper.slideNext();
  }
}
