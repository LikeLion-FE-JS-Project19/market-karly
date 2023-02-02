import { onCountAmountHandler } from './seeun.js';

const minusAmountButton = document.querySelector(
  '.product-summary__detail-choice-button--minus'
);

const plusAmountButton = document.querySelector(
  '.product-summary__detail-choice-button--plus'
);

minusAmountButton.addEventListener('click', onCountAmountHandler);
plusAmountButton.addEventListener('click', onCountAmountHandler);
