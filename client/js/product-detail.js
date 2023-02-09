import {
  countProductAmountHandler,
  toggleTabMenuHandler,
  moveToClickedTabMenu,
  setProductDetailData,
} from './seeun.js';
import { renderQnATable, renderModal } from './jiwon.js';
import { openReviewModal } from './juhee.js';
import { axios, getNode, getNodes } from '../lib/index.js';

const URLSearch = new URLSearchParams(location.search);
const id = URLSearch.get('id');

async function getProductData() {
  try {
    let { data } = await axios.get(`http://localhost:3001/products?id=${id}`);
    data = data[0];
    setProductDetailData(data);
    renderModal(data);
  } catch (err) {
    alert('예기치 못한 에러로 실패했습니다.');
  }
}

getProductData();

const minusAmountButton = document.querySelector(
  '.product-summary__detail-choice-button--minus'
);
const plusAmountButton = getNode(
  '.product-summary__detail-choice-button--plus'
);
const tabMenuItems = getNodes('li[class^=product-detail-tab-menu__item]');

minusAmountButton.addEventListener('click', countProductAmountHandler);

plusAmountButton.addEventListener('click', countProductAmountHandler);

window.addEventListener('scroll', toggleTabMenuHandler);
[].forEach.call(tabMenuItems, (tabMenuItem) =>
  tabMenuItem.addEventListener('click', moveToClickedTabMenu)
);

[].forEach.call(tabMenuItems, (tabMenuItem) =>
  tabMenuItem.addEventListener('focus', moveToClickedTabMenu)
);

openReviewModal();

// QnA 요청
renderQnATable(id);
document.querySelector('.qna__table tbody').addEventListener('keyup', (e) => {
  const tr = e.target.closest('tr');
  if (e.keyCode === 13) {
    tr.click();
  }
});
