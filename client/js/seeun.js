import { getNode, getNodes } from '../lib/dom/getNode.js';
import { attr } from '../lib/dom/attr.js';

export function swiper1() {
  const swiper = new Swiper('.swiper-1', {
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

export function onKeyPressSwiperHandler(e) {
  const swiperName = this.getAttribute('class').slice(27, 35);
  const keyDirection = this.getAttribute('class').slice(44, 49);
  const swiper = document.querySelector(`.${swiperName}`).swiper;
  if (keyDirection === 'prev' && e.keyCode === 37) {
    swiper.slidePrev();
  } else if (keyDirection === 'next' && e.keyCode === 39) {
    swiper.slideNext();
  }
}

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

  if (qna <= 5) {
    setAttributeTabItem('문의 탭');
  } else if (review <= 5) {
    setAttributeTabItem('후기 탭');
  } else if (productDetail <= 5) {
    setAttributeTabItem('상세정보 탭');
  } else if (productDescription <= 70) {
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

  const tabMenuList = {
    '상품설명 탭': productDescription,
    '상세정보 탭': productDetail,
    '후기 탭': review,
    '문의 탭': qna,
  };

  setAttributeTabItem(this.getAttribute('aria-label'));

  setTimeout(() => {
    window.scrollTo({
      top: window.pageYOffset + tabMenuList[this.getAttribute('aria-label')].y,
      left: 0,
      behavior: 'smooth',
    });
  }, 0);
}

export function moveTabByKey(e) {
  let tabNumber = this.getAttribute('id')[this.getAttribute('id').length - 1];
  if (e.keyCode === 37 && tabNumber > 1) {
    getNode(
      `ul[class='product-detail-tab-menu'] > li[id*='${+tabNumber - 1}']`
    ).focus();
    return;
  }
  if ((e.keyCode === 39 || e.keyCode === 13) && tabNumber < 4) {
    getNode(
      `ul[class='product-detail-tab-menu'] > li[id*='${+tabNumber + 1}']`
    ).focus();
    return;
  }
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

export function setProductDetailData(products) {
  const URLSearch = new URLSearchParams(location.search);
  const id = URLSearch.get('id');

  const product = products.filter((product) => product.id === id);
  const title = product[0].name;
  const description = product[0].description;
  const price = product[0].price.toLocaleString('ko-KR');
  const image = product[0].image;

  document.title = title + ' - 마켓칼리';
  getNode('meta[name="description"]').content =
    title +
    ' :: Love Food, Love Life. 마켓칼리! 당일 수확 채소, 과일, 맛집 음식까지 내일 아침 문 앞에서 만나요!';

  attr('.add-cart-bubble__img', 'src', `./assets/product/${image.thumbnail}`);
  attr('.add-cart-bubble__img', 'alt', `${image.alt}`);
  getNode('.add-cart-bubble__product').textContent = title;
  attr('.product-summary__img', 'src', `./assets/product/${image.thumbnail}`);
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
