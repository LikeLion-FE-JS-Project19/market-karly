import { bubbleAddCartHandler } from '../seeun.js';
import { closeTopBarButton } from '../kyungseob.js';

const addCartButton = document.querySelector(
  '.product-summary__add-cart-button'
);

addCartButton.addEventListener('click', bubbleAddCartHandler);
