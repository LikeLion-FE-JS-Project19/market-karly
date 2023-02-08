import {
  countProductAmountHandler,
  toggleTabMenuHandler,
  moveToClickedTabMenu,
  moveTabByKey,
  setProductDetailData,
} from './seeun.js';
import { xhrData } from '../lib/utils/xhr.js';

import { renderQnATable, renderModal, qnaModalSubmitHandler } from './jiwon.js';

xhrData.get(
  'http://localhost:3001/products',
  (products) => {
    setProductDetailData(products);
  },
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

import { openReviewModal } from './juhee.js';
import { axios } from '../lib/index.js';

openReviewModal();

// QnA 요청
const URLSearch = new URLSearchParams(location.search);
const id = URLSearch.get('id');

renderQnATable(id);
document.querySelector('.qna__table tbody').addEventListener('keyup', (e) => {
  const tr = e.target.closest('tr');
  if (e.keyCode === 13) {
    tr.click();
  }
});

const [data] = await fetch(`http://localhost:3001/products?id=${id}`).then(
  (response) => response.json()
);
renderModal(data);
const qnaModalSubmit = document.querySelector('.qna__modal-submit');
qnaModalSubmit.addEventListener('click', qnaModalSubmitHandler);
