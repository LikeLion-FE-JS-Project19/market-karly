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

export function onKeyPressSwiper1Handler(e) {
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
  const minusAmountButton = document.querySelector(
    '.product-summary__detail-choice-button--minus'
  );

  const minusIcon = document.querySelector(
    '.product-summary__detail-choice-button--minus-icon'
  );

  let totalAmount = document.querySelector(
    '.product-summary__detail-choice-number'
  ).textContent;

  if (+totalAmount === 1) {
    minusAmountButton.setAttribute('disabled', 'disabled');
    minusIcon.setAttribute('fill', '#a6a6a6');
  } else {
    minusAmountButton.removeAttribute('disabled');
    minusIcon.setAttribute('fill', '#333333');
  }
}

export function countProductAmountHandler() {
  let totalAmount = document.querySelector(
    '.product-summary__detail-choice-number'
  );

  const pricePerProduct = Number(
    document
      .querySelector('.product-summary__detail-price-per-piece')
      .textContent.match(/\d/g)
      .join('')
  );

  let totalPrice = document.querySelector(
    '.product-summary__total-price-number'
  );

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

export function bubbleAddCartHandler() {
  const cart = document
    .querySelector('.header-container__account-menu')
    .getBoundingClientRect();

  const bubble = document.querySelector('.add-cart-bubble');

  bubble.style.visibility = 'visible';
  bubble.style.opacity = '1';
  bubble.style.top = `${window.pageYOffset + cart.bottom + 15}px`;
  bubble.style.left = `${window.pageXOffset + cart.right - 232}px`;

  setTimeout(() => {
    bubble.style.visibility = 'hidden';
    bubble.style.opacity = '0';
  }, 5000);
}
