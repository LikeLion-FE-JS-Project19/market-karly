import { bubbleAddCartHandler } from '../seeun.js';

const addCartButton = document.querySelector(
  '.product-summary__add-cart-button'
);

addCartButton.addEventListener('click', bubbleAddCartHandler);
