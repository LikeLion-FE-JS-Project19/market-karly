import { closeMainModalButton, swiper } from './kyungseob.js';
import { mainHeaderEventHandler } from './seokwon.js';
import { swiper1, onKeyPressSwiperHandler } from './seeun.js';
import { swiper2, swiper3, onClickAddCartHandler, getNodes } from './juhee.js';

closeMainModalButton();
swiper;

window.addEventListener('DOMContentLoaded', swiper1);

const swiperButtons = document.querySelectorAll('[class^=swiper-button]');

swiperButtons.forEach((button) =>
  button.addEventListener('keydown', onKeyPressSwiperHandler)
);

window.addEventListener('DOMContentLoaded', mainHeaderEventHandler);
window.addEventListener('DOMContentLoaded', swiper2);
window.addEventListener('DOMContentLoaded', swiper3);

const addCartButtonList = getNodes('.btn-add-cart');
addCartButtonList.forEach((el) => {
  el.addEventListener('click', onClickAddCartHandler);
});

import { getNode, renderFooter } from './jiwon.js';
renderFooter(getNode('body'));
