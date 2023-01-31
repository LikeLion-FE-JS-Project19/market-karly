import { swiper1, onKeyPressSwiper1Handler } from './seeun.js';

window.addEventListener('DOMContentLoaded', swiper1);

const swiper1Buttons = document.querySelectorAll(
  '[class*=product-swiper-1__button]'
);

swiper1Buttons.forEach((swiper1Button) =>
  swiper1Button.addEventListener('keydown', onKeyPressSwiper1Handler)
);
