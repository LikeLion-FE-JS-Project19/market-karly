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

import {
  renderQnaList,
  toggleContent,
  renderModal,
  getNode,
  qnaModalSubmitHandler,
  renderFooter,
} from './jiwon.js';

// 요청
const URLSearch = new URLSearchParams(location.search);
const id = URLSearch.get('id');
const [data] = await fetch(`http://localhost:3001/products?id=${id}`).then(
  (response) => response.json()
);
renderQnaList(data.qnas);

toggleContent(data.qnas);
renderModal(data);

const qnaModalSubmit = document.querySelector('.qna__modal-submit');

qnaModalSubmit.addEventListener('click', qnaModalSubmitHandler);
renderFooter(getNode('body'));

import { openReviewModal } from './juhee.js';

openReviewModal()