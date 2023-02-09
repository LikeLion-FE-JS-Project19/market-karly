import { closeMainModalButton, protection } from './kyungseob.js';
import { mainCarouselEventHandler } from './seokwon.js';
import { onClickAddCartHandler } from './juhee.js';
import { getNode, getNodes } from '../lib/dom/getNode.js';



protection();
closeMainModalButton();

// 스와이퍼
const swiper1 = new Swiper('.swiper-1', {
  slidesPerView: 1,
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  on: {
    init() {
      handleSwiperInert(this, 1);
    },
    slideChange() {
      handleSwiperInert(this, 1);
      notifySwiperMessage(this);
    },
  },

  a11y: {
    prevSlideMessage: '이전 슬라이드',
    nextSlideMessage: '다음 슬라이드',
    slideLabelMessage:
      '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
  },
});

async function test() {
  await mainCarouselEventHandler()
  const swiper2 = await new Swiper('.swiper-2', {
    slidesPerView: 4,
    spaceBetween: 18,
    slidesPerGroup: 4,
  
    loopFillGroupWithBlank: true,
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    on: {
      init() {
        handleSwiperInert(this, 4);
        notifySwiperMessage(this);
      },
      slideChange() {
        handleSwiperInert(this, 4);
      },
      activeIndexChange() {
        notifySwiperMessage(this);
      },
    },
  
    a11y: {
      prevSlideMessage: '이전 슬라이드',
      nextSlideMessage: '다음 슬라이드',
      slideLabelMessage:
        '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
    },
  });
}

test()

const swiper3 = new Swiper('.swiper-3', {
  slidesPerView: 4,
  spaceBetween: 18,
  slidesPerGroup: 4,

  loopFillGroupWithBlank: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  on: {
    init() {
      handleSwiperInert(this, 4);
      notifySwiperMessage(this);
    },
    slideChange() {
      handleSwiperInert(this, 4);
    },
    activeIndexChange() {
      notifySwiperMessage(this);
    },
  },

  a11y: {
    prevSlideMessage: '이전 슬라이드',
    nextSlideMessage: '다음 슬라이드',
    slideLabelMessage:
      '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
  },
});

const swiper4 = new Swiper('.swiper-4', {
  direction: 'vertical',
  slidesPerView: 'auto',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  spaceBetween: 4,

  on: {
    init() {
      notifySwiperMessage(this);
    },
    activeIndexChange() {
      notifySwiperMessage(this);
    },
  },

  a11y: {
    prevSlideMessage: '이전 슬라이드',
    nextSlideMessage: '다음 슬라이드',
    slideLabelMessage:
      '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
  },
});

function notifySwiperMessage(swiper) {
  const swiperName = swiper.el.getAttribute('class').slice(0, 8);
  const currentSlide = swiper.slides[swiper.activeIndex];
  swiper.slides.forEach((slide) => {
    if (slide === currentSlide) {
      getNode(`.${swiperName} .swiper-message`).textContent = '';
      getNode(`.${swiperName} .swiper-message`).appendChild(
        slide.firstElementChild.cloneNode()
      );
    }
  });
}

function handleSwiperInert(swiper, slidesPerGroup) {
  const currentSlide = swiper.activeIndex;
  swiper.slides.forEach((slide, index) => {
    if (index >= currentSlide && index <= currentSlide + slidesPerGroup - 1) {
      slide.setAttribute('tabindex', '0');
      slide.setAttribute('aria-hidden', 'false');
    } else {
      slide.setAttribute('tabindex', '-1');
      slide.setAttribute('aria-hidden', 'true');
    }
  });
}


const addCartButtonList = getNodes('.btn-add-cart');
addCartButtonList.forEach((el) => {
  el.addEventListener('click', onClickAddCartHandler);
});

