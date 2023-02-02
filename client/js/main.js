

// import { closeMainModalButton, closeTopBarButton, swiper } from "./kyungseob.js";


// closeTopBarButton()
// closeMainModalButton()
// swiper

import {mainHeaderEventHandler} from './seokwon.js'
import { swiper1, onKeyPressSwiper1Handler } from './seeun.js';
import { swiper2, swiper3, onClickAddCartHandler, getNodes } from "./juhee.js";

window.addEventListener('DOMContentLoaded', swiper1);

const swiperButtons = document.querySelectorAll('[class^=swiper-button]');

swiperButtons.forEach((button) =>
  button.addEventListener('keydown', onKeyPressSwiper1Handler)
);

window.addEventListener('DOMContentLoaded', mainHeaderEventHandler);
window.addEventListener('DOMContentLoaded', swiper2);
window.addEventListener('DOMContentLoaded', swiper3);

const addCartButtonList = getNodes('.btn-add-cart');
addCartButtonList.forEach((el) => {
  el.addEventListener('click',onClickAddCartHandler);
})


import { allCheckBox, coldListAct, deleteList, frozenListAct, temperatureListAct, } from "./cart.js";

allCheckBox()
coldListAct()
frozenListAct()
temperatureListAct()
deleteList()