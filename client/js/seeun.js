import { getNode, getNodes } from '../lib/dom/getNode.js';
import { attr } from '../lib/dom/attr.js';

export function toggleDisableButtonHandler() {
  let totalAmount = getNode(
    '.product-summary__detail-choice-number'
  ).textContent;

  const minusAmountButton = getNode(
    '.product-summary__detail-choice-button--minus'
  );

  if (+totalAmount === 1) {
    attr(
      '.product-summary__detail-choice-button--minus',
      'disabled',
      'disabled'
    );
    attr(
      '.product-summary__detail-choice-button--minus-icon',
      'fill',
      '#a6a6a6'
    );
  } else {
    minusAmountButton.removeAttribute('disabled');
    attr(
      '.product-summary__detail-choice-button--minus-icon',
      'fill',
      '#333333'
    );
  }
}

export function countProductAmountHandler() {
  let totalAmount = getNode('.product-summary__detail-choice-number');

  const pricePerProduct = Number(
    getNode('.product-summary__detail-price-per-piece')
      .textContent.match(/\d/g)
      .join('')
  );

  let totalPrice = getNode('.product-summary__total-price-number');

  if (this.getAttribute('class').slice(-4) === 'plus') {
    totalAmount.textContent = ++totalAmount.textContent;
    totalPrice.textContent = (
      Number(totalPrice.textContent.split(',').join('')) + pricePerProduct
    ).toLocaleString('ko-KR');
  } else {
    totalAmount.textContent = --totalAmount.textContent;
    totalPrice.textContent = (
      Number(totalPrice.textContent.split(',').join('')) - pricePerProduct
    ).toLocaleString('ko-KR');
  }

  if (+totalAmount.textContent <= 2) toggleDisableButtonHandler();
}

function setAttributeTabItem(ariaLabel) {
  const tabMenuItems = getNodes('li[class^=product-detail-tab-menu__item]');

  const className = 'product-detail-tab-menu__item';

  [].forEach.call(tabMenuItems, function (tabMenuItem) {
    if (tabMenuItem.getAttribute('aria-label') === ariaLabel) {
      tabMenuItem.setAttribute('class', className + '--selected');
      tabMenuItem.setAttribute('aria-selected', 'true');
    } else if (tabMenuItem.getAttribute('class') === className + '--selected') {
      tabMenuItem.setAttribute('class', className);
      tabMenuItem.setAttribute('aria-selected', 'false');
    }
  });
}

export function toggleTabMenuHandler() {
  const productDescription = getNode(
    '.product-description'
  ).getBoundingClientRect().top;
  const productDetail = getNode(
    '.product-detail__product-detail-img'
  ).getBoundingClientRect().top;
  const review = getNode('.review').getBoundingClientRect().top;
  const qna = getNode('.qna').getBoundingClientRect().top;
  const MENU_HEIGHT = 140;

  if (qna <= MENU_HEIGHT) {
    setAttributeTabItem('문의 탭');
  } else if (review <= MENU_HEIGHT) {
    setAttributeTabItem('후기 탭');
  } else if (productDetail <= MENU_HEIGHT) {
    setAttributeTabItem('상세정보 탭');
  } else if (productDescription <= MENU_HEIGHT) {
    setAttributeTabItem('상품설명 탭');
  } else {
    setAttributeTabItem();
  }
}

export function moveToClickedTabMenu() {
  const productDescription = getNode(
    '.product-description'
  ).getBoundingClientRect();
  const productDetail = getNode(
    '.product-detail__product-detail-img'
  ).getBoundingClientRect();
  const review = getNode('.review').getBoundingClientRect();
  const qna = getNode('.qna').getBoundingClientRect();
  const MENU_HEIGHT = 140;

  const tabMenuList = {
    '상품설명 탭': productDescription,
    '상세정보 탭': productDetail,
    '후기 탭': review,
    '문의 탭': qna,
  };

  setAttributeTabItem(this.getAttribute('aria-label'));

  setTimeout(() => {
    window.scrollTo({
      top:
        window.pageYOffset +
        tabMenuList[this.getAttribute('aria-label')].y -
        MENU_HEIGHT,
      left: 0,
      behavior: 'smooth',
    });
  }, 0);
}

export function bubbleAddCartHandler() {
  const bubble = getNode('.add-cart-bubble');

  bubble.style.visibility = 'visible';
  bubble.style.opacity = '1';

  setTimeout(() => {
    bubble.style.visibility = 'hidden';
    bubble.style.opacity = '0';
  }, 5000);
}

export function setProductDetailData(product) {
  const title = product.name;
  const description = product.description;
  const price = product.price.toLocaleString('ko-KR');
  const image = product.image;

  document.title = title + ' - 마켓칼리';
  getNode('meta[name="description"]').content =
    title +
    ' :: Love Food, Love Life. 마켓칼리! 당일 수확 채소, 과일, 맛집 음식까지 내일 아침 문 앞에서 만나요!';

  attr('.add-cart-bubble__img', 'src', `${image.thumbnail}`);
  attr('.add-cart-bubble__img', 'alt', `${image.alt}`);
  getNode('.add-cart-bubble__product').textContent = title;
  attr('.product-summary__img', 'src', `${image.thumbnail}`);
  attr('.product-summary__img', 'alt', `${image.alt}`);
  attr(
    '.product-detail__product-description-img',
    'src',
    `./assets/product/${image.banner}`
  );
  attr('.product-detail__product-description-img', 'alt', `${image.alt}`);
  attr(
    '.product-detail__product-detail-img',
    'src',
    `./assets/product/${image.info}`
  );
  getNode('.product-summary__title').textContent = title;
  getNode('.product-summary__detail-choice-title').textContent = title;
  getNode('.product-summary__description').textContent = description;
  getNode('.product-summary__price--number').textContent = price;
  getNode(
    '.product-summary__detail-price-per-piece'
  ).textContent = `${price}원`;
  getNode('.product-summary__total-price-number').textContent = price;
  getNode('.product-description__description').textContent = description;
  getNode('.product-description__title').textContent = title;
}
