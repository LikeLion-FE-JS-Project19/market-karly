import { bubbleAddCartHandler } from '../seeun.js';
import { closeTopBarButton } from '../kyungseob.js';
import { renderFooter } from '../jiwon.js';
import { getNode } from '../../lib/index.js';
import {mainHeaderEventHandler} from '../seokwon.js'

renderFooter(getNode('body'));

const addCartButton = document.querySelector(
  '.product-summary__add-cart-button'
);

addCartButton?.addEventListener('click', bubbleAddCartHandler);
window.addEventListener('DOMContentLoaded', mainHeaderEventHandler);

closeTopBarButton();
