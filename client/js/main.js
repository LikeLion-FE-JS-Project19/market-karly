import { swiper2, swiper3, onClickAddCartHandler, getNodes } from "./juhee.js";

window.addEventListener('DOMContentLoaded', swiper2);
window.addEventListener('DOMContentLoaded', swiper3);

const addCartButtonList = getNodes('.btn-add-cart');
addCartButtonList.forEach((el) => {
  el.addEventListener('click',onClickAddCartHandler);
})