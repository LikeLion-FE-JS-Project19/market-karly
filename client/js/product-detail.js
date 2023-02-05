import {
  countProductAmountHandler,
  toggleTabMenuHandler,
  moveToClickedTabMenu,
  moveTabByKey,
  getProductDetailData,
} from './seeun.js';
import { xhrData } from '../lib/utils/xhr.js';

xhrData.get(
  'http://localhost:3001/products',
  (message) => getProductDetailData(message),
  (message) => console.log(message)
);

const minusAmountButton = document.querySelector(
  '.product-summary__detail-choice-button--minus'
);

const plusAmountButton = document.querySelector(
  '.product-summary__detail-choice-button--plus'
);

const tabMenuItems = document.querySelectorAll(
  'li[class^=product-detail-tab-menu__item]'
);

minusAmountButton.addEventListener('click', countProductAmountHandler);
plusAmountButton.addEventListener('click', countProductAmountHandler);
window.addEventListener('scroll', toggleTabMenuHandler);
[].forEach.call(tabMenuItems, (tabMenuItem) =>
  tabMenuItem.addEventListener('click', moveToClickedTabMenu)
);

[].forEach.call(tabMenuItems, (tabMenuItem) =>
  tabMenuItem.addEventListener('focus', moveToClickedTabMenu)
);

[].forEach.call(tabMenuItems, (tabMenuItem) =>
  tabMenuItem.addEventListener('keydown', moveTabByKey)
);
