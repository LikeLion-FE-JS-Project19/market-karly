import {
  countProductAmountHandler,
  toggleTabMenuHandler,
  moveToClickedTabMenu,
} from './seeun.js';

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
