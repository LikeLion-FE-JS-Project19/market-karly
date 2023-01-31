import { swiper1, onKeyPressSwiper1Handler } from './seeun.js';

window.addEventListener('DOMContentLoaded', swiper1);

const swiperButtons = document.querySelectorAll('[class^=swiper-button]');

swiperButtons.forEach((button) =>
  button.addEventListener('keydown', onKeyPressSwiper1Handler)
);
