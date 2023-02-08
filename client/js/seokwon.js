import { axios } from '../lib/utils/index.js';
import { attr } from '../lib/dom/attr.js';

const categotyData = [
  { title: '선물하기', imgSrc: './assets/header/ic-gift.svg' },
  { title: '채소', imgSrc: './assets/header/ic-vegetable.svg' },
  { title: '과일ㆍ견과ㆍ쌀', imgSrc: './assets/header/ic-fruit.svg' },
  { title: '수산ㆍ해산ㆍ건어물', imgSrc: './assets/header/ic-sea-food.svg' },
  { title: '정육ㆍ계란', imgSrc: './assets/header/ic-meet.svg' },
  { title: '국ㆍ반찬ㆍ메인요리', imgSrc: './assets/header/ic-cook.svg' },
  { title: '샐러드ㆍ간편식', imgSrc: './assets/header/ic-salad.svg' },
  { title: '면ㆍ양념ㆍ오일', imgSrc: './assets/header/ic-oil.svg' },
  { title: '생수ㆍ음료ㆍ우유ㆍ커피', imgSrc: './assets/header/ic-coffee.svg' },
  { title: '간식ㆍ과자ㆍ떡', imgSrc: './assets/header/ic-snack.svg' },
  { title: '베이커리ㆍ치즈ㆍ델리', imgSrc: './assets/header/ic-bread.svg' },
  { title: '건강식품', imgSrc: './assets/header/ic-health.svg' },
  { title: '와인', imgSrc: './assets/header/ic-wine.svg' },
  { title: '전통주', imgSrc: './assets/header/ic-traditional-liquor.svg' },
  { title: '생활용품ㆍ리빙ㆍ캠핑', imgSrc: './assets/header/ic-detergent.svg' },
  { title: '스킨케어ㆍ메이크업', imgSrc: './assets/header/ic-cosmetics.svg' },
  { title: '헤어ㆍ바디ㆍ구강', imgSrc: './assets/header/ic-shampoo.svg' },
  { title: '주방용품', imgSrc: './assets/header/ic-food.svg' },
  { title: '가전제품', imgSrc: './assets/header/ic-home-appliances.svg' },
  { title: '반려동물', imgSrc: './assets/header/ic-dog.svg' },
  { title: '베이비ㆍ키즈ㆍ완구', imgSrc: './assets/header/ic-baby.svg' },
  { title: '여행ㆍ티켓', imgSrc: './assets/header/ic-travel.svg' },
];

let curData = [];
export async function mainHeaderEventHandler() {
  // 카테고리 관련 돔객체
  const categoty = document.querySelector('.header-container__category');
  const categotyList = document.querySelector(
    '.header-container__category-list'
  );

  // 스태틱 헤더 관련 돔객체
  const containerBottom = document.querySelector('.header-container--bottom');
  const containerBottomGrid = document.querySelector(
    '.header-container--bottom-grid'
  );
  const searchForm = document.querySelector('.searchForm');
  const accountMenu = document.querySelector('.header-container__account-menu');
  const subInfo = document.querySelector('.header-container--bottom-last');
  const productItems = document.querySelectorAll(
    '.header-container__product-item'
  );
  const containerMid = document.querySelector('.header-container--mid');
  const header = document.querySelector('.header');
  const shadowLine = document.querySelector('.header__shadow-line');

  categotyData.map((data, index) => {
    const categoryItem = document.createElement('li');
    categoryItem.innerHTML = `<img src="${data.imgSrc}" alt="선물하기" width="24px" height="24px" class="header-container__category-img"/>${data.title}`;
    categotyList.insertAdjacentElement('beforeend', categoryItem);
  });

  categoty.addEventListener('mouseover', categotyMouseoverHandler);
  categoty.addEventListener('mouseout', categotyMouseoutHandler);
  categotyList.addEventListener('mouseover', categotyMouseoutHandler);
  categotyList.addEventListener('blur', categotyMouseoutHandler);

  categoty.addEventListener('focus', categotyFocusHandler);

  function categotyFocusHandler(e) {
    categotyList.ariaSelected = 'true';
    categotyList.ariaExpanded = 'true';
    categotyList.style.display = 'block';
  }

  function categotyMouseoverHandler(e) {
    categotyList.style.display = 'block';
  }

  function categotyMouseoutHandler() {
    categotyList.style.display = 'none';
  }

  // 스크롤 관련 상태
  let status = false;
  let currentStatus = false;

  window.addEventListener('scroll', scrollHandler);
  function scrollHandler() {
    if (scrollY < 104) {
      currentStatus = false;
    } else {
      currentStatus = true;
    }
    if (status === currentStatus) {
      return;
    }
    if (currentStatus) {
      changeFixedHeader();
    } else {
      changeOriginHeader();
    }
    status = currentStatus;
  }

  function changeFixedHeader() {
    subInfo.remove();
    searchForm.classList.add('searchForm-fixed');
    accountMenu.classList.remove('header-container__account-menu');
    accountMenu.classList.add('header-container__account-menu-fixed');
    productItems.forEach((item) => (item.style.width = '125px'));
    containerBottomGrid.insertAdjacentElement('beforeend', searchForm);
    containerBottomGrid.insertAdjacentElement('beforeend', accountMenu);
    containerBottom.classList.add('header-container--bottom-fixed');
    containerBottomGrid.classList.add('header-container--bottom-grid-fixed');
    makeShadow();
  }

  function changeOriginHeader() {
    searchForm.classList.remove('searchForm-fixed');
    accountMenu.classList.add('header-container__account-menu');
    accountMenu.classList.remove('header-container__account-menu-fixed');
    productItems.forEach((item) => (item.style.width = '150px'));
    containerBottomGrid.insertAdjacentElement('beforeend', subInfo);
    containerMid.insertAdjacentElement('beforeend', searchForm);
    containerMid.insertAdjacentElement('beforeend', accountMenu);
    containerBottom.classList.remove('header-container--bottom-fixed');
    containerBottomGrid.classList.remove('header-container--bottom-grid-fixed');
    removeShadow();
  }

  function makeShadow() {
    shadowLine.style.display = 'block';
  }

  function removeShadow() {
    shadowLine.style.display = 'none';
  }
}

export async function productListEventHandler() {
  // 상위 리스트 블록 -> 카운트 존재, 하위리스트 목록을 배열 형태로 가지고 있음 [{이름:강남면옥, 개수: 1 ...}, {}]
  // 배열 확인후 없으면 하위리스트 블록을 새로 생성하고, 있으면 해당하는 블록으로 이동
  // How 하위블록을 순환하면서 dataset에 특정하게 분류할수 있도록함 ex> dataset.name = "강남면옥"
  // 찾아서 내용 수정, ex> count +1 상위리스트와 비슷하게 목록을 배열형태로 -> 필터링이 가능하게
  // 하위 리스트 블록 -> 카운트 존재, 이들만의 객체
  // 체크가 되면 해당 객체를 탐색해서 목록들 가져오기 -> (id로만 가지고 있다가 필요할떄 json을 다시 탐색할지,,, 아니면 원래 데이터 형태를 그대로 보존하고 있다가 탐색없이 추가만 할지 고민해봅시다...!)

  // !! 그냥 json 파일을 필터에 맞게 새롭게 객체 체이닝 형태로 먼저 분석해도 될듯..!!!!

  // 데이터들을 순환
  // 카테고리는 패스
  // 이름확인하면서 브랜드의 카운트 증가
  // 그거에 맞는

  // 필터인덱스 칸 가져오기
  // 클릭이벤트 플래그 부여
  // 플래그에 따른 토글이미지 부여
  // 플래그가 열려 있으면 세부칸을 보여줌

  // 초기화 버튼 누르면 다 false

  // innerHTML대신 쓸수 있는것이 뭘까요...?
  // asynk를 중복으로 계속 사용가능한가?

  const URLSearch = new URLSearchParams(location.search);

  const defaultOptions = {
    method: 'GET',
    mode: 'cors',
    body: null,
    cache: 'no-cache',
    credential: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };

  function getProductItemMarkup(data) {
    let priceMarkup;
    let specialMarkMarkup = '';

    // 나중에 함수들 분리하기
    if (data.saleRatio) {
      priceMarkup = `
        <p class="product-price"><span class="sale-percent">${Math.floor(
          data.saleRatio * 100
        )}%</span>${data.salePrice
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
        <p class="first-price">${data.price
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
      `;
    } else {
      priceMarkup = `<p class="product-price">${data.price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>`;
    }
    if (JSON.parse(data.kalryOnly)) {
      specialMarkMarkup += `<span class="product-special-mark__mark product-special-mark--karly-only">Kalry Only</span>`;
    }
    if (data.stock <= 10) {
      specialMarkMarkup += `<span class="product-special-mark__mark product-special-mark--limited-quantity">한정수량</span>`;
    }

    // 캐로셀인지 상품리스트에 따라 다르게 줘야함 + 이름 간격도
    // 숫자 콤마 함수로 만들기
    return (
      `
      <img src="${data.image.thumbnail}" alt="${data.name}" />
      <button type="button" class="btn-add-cart" data-name="button" data-id=${data.id}></button>
      <p class="product-mark--morning-star">샛별 배송</p>
      <p class="product-name--product-list">${data.name}</p>
      ` +
      priceMarkup +
      `<p class="product-mark--info">${data.description}</p>` +
      `<div class="product-special-mark" data-name="label">` +
      specialMarkMarkup +
      `</div>`
    );
  }

  async function getProductItems() {
    // 통신 유틸함수로 하기
    let result = await fetch('http://localhost:3001/products', defaultOptions);
    if (result.ok) {
      result.data = await result.json();
    }
    curData = await result.data;
    listRendering(result.data);
  }

  // 상품에 이벤트 위임 설정
  function productItemClickHandler(e) {
    let target = e.target;
    while (!attr(target, 'data-name')) {
      target = target.parentNode;

      if (target.nodeName === 'BODY') {
        target = null;
        return;
      }
    }

    if (target.dataset.name === 'button') {
      makeDarkFiltering();
      makeCartModal(target.dataset.id);
      return;
    }

    if (target.dataset.name === 'label') {
      return;
    }

    if (target.dataset.name === 'product-box') {
      location.href = `/client/product-detail.html?id=${target.dataset.id}`;
      return;
    }
  }

  // 모달이 html에 마크업이 된상태가 좋을까? 아니면 js에서 만드는게 좋을까?
  // 다른곳에도 쓰이니깐 js에서 만드는게 좋을것 같다.. 뇌피셜
  const cartModal = document.querySelector('.cart-modal');

  async function makeCartModal(id) {
    cartModal.dataset.count = 1;
    const itemData = await getItemById(id);
    let currentPrice;
    let priceValue;
    if (itemData.saleRatio) {
      currentPrice = itemData.salePrice;
      priceValue = `
      <span class="cart-modal--price">${itemData.salePrice
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
      <span class="cart-modal--price-sale">${itemData.price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
      `;
    } else {
      currentPrice = itemData.price;
      priceValue = `
      <span class="cart-modal--price">${itemData.price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
      `;
    }
    cartModal.style.display = 'flex';
    const modalData =
      `
      <div class="cart-modal--info">
        <span class="cart-modal--title">${itemData.name}</span>
        <span class="cart-modal--price-box">` +
      priceValue +
      `
        </span>
        <div class="cart-modal--count-box">
          <button class="cart-modal--count-button cart-modal--count-button--minus"></button>        
          <span class="cart-modal--count-value"></span>
          <button class="cart-modal--count-button cart-modal--count-buttot--plus"></button>       
        </div>
      </div>
      <div class="cart-modal--total-price">
        <div class="cart-modal--total-price-top">
          <span class="cart-modal--total-price-top--total">합계</span>
          <span class="cart-modal--total-price-top--price">4,980원</span>
        </div>
        <div class="cart-modal--total-price-bottom">
          <span class="cart-modal--total-price-top--mark">적립</span>
          <span class="cart-modal--total-price-top--info">구매시 5원 적립</span>
        </div>
      </div>
      <div class="cart-modal--button-box">
        <button class="cart-modal--button cart-modal--button--cancel">
          취소
        </button>
        <button class="cart-modal--button cart-modal--button--add">
          장바구니 담기
        </button>
      </div>
    `;
    cartModal.innerHTML = modalData;
    const cartModalCancelButton = document.querySelector(
      '.cart-modal--button--cancel'
    );
    cartModalCancelButton.addEventListener('click', () => {
      cartModal.style.display = 'none';
      removeDarkFiltering();
    });

    // 수량 버튼 기능
    function changeTotalPrice() {
      const count = document.querySelector('.cart-modal--count-value');
      const totalPrice = document.querySelector(
        '.cart-modal--total-price-top--price'
      );

      count.innerHTML = cartModal.dataset.count;
      totalPrice.innerHTML = `${(
        cartModal.dataset.count * parseInt(currentPrice)
      )
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`;
    }

    changeTotalPrice();
    // 숫자 증감 기능
    const minusButton = document.querySelector(
      '.cart-modal--count-button--minus'
    );
    const plusButton = document.querySelector(
      '.cart-modal--count-buttot--plus'
    );

    minusButton.addEventListener('click', () => {
      cartModal.dataset.count = parseInt(cartModal.dataset.count) - 1;
      changeTotalPrice();
    });

    plusButton.addEventListener('click', () => {
      cartModal.dataset.count = parseInt(cartModal.dataset.count) + 1;
      changeTotalPrice();
    });
  }

  // id에 맞는 데이터 가져오기
  async function getItemById(id) {
    try {
      let result = await fetch(
        'http://localhost:3001/products',
        defaultOptions
      );
      if (result.ok) {
        result.data = await result.json();
      }
      let idx = 0;
      result.data.map((data, index) => {
        if (data.id === id) {
          idx = index;
        }
      });
      return result.data[idx];
    } catch (error) {
      console.log('통신 에러가 발생했습니다!');
    }
  }

  // 모달 제외하고 어두워지는 기능
  function makeDarkFiltering() {
    const darkFilter = document.querySelector('.dark-filter');
    darkFilter.style.display = 'block';
  }

  function removeDarkFiltering() {
    const darkFilter = document.querySelector('.dark-filter');
    darkFilter.style.display = 'none';
  }

  getProductItems();

  // 데이터 분석 로직 (필터 구현에 사용될 객체 만들기)
  // 일단 나중에
  // {
  //   "category" : [
  //     // 종류는 정적
  //     "면ㆍ양념ㆍ오일": [
  //       // 해당카테고리의 json() 데이터
  //     ],
  //     "건강식품": [
  //       // 해당카테고리의 json() 데이터
  //     ],
  //     ...
  //   ],
  //   "brand": [
  //     // 종류 동적으로
  //    // json에 브랜드도 추가하자,......................................ㅠㅠ

  //   ],
  //   "가격": [
  //     // 동적인듯 (사이트에서 볼때 4항목에서 개수가 거의 동일함)
  //     // 일단은 정적으로 넣기

  //   ],
  //   "혜택":[
  //     // 정적
  //     // 할인상품
  //     // 한정수량
  //   ]
  //   "유형":[
  //     // 정적
  //     // kalryOnly
  //     // 희소가치 프로젝트 -> json 속성에 추가하면될듯
  //   ]
  //   "특정상품제외":[
  //     // 반려동물인데 일단 제외...
  //   ]
  // }

  async function getFilterObject() {
    let filterObj = {};

    try {
      // 유틸함수 사용하기
      let result = await fetch(
        'http://localhost:3001/products',
        defaultOptions
      );
      if (result.ok) {
        result.data = await result.json();
      }
      let categoryArray = [];
      categotyData.map((data) => {
        const title = data['title'];
        let tmp = [];
        result.data.map((data) => {
          if (data.category === title) {
            tmp.push(data);
          }
        });

        categoryArray.push({ [title]: tmp });
      });
      filterObj.category = categoryArray;

      // 브랜드 구성
      let brandArray = [];
      result.data.map((data) => {
        let isEx = false;
        brandArray?.map((brandData) => {
          if (brandData.key === data.brand) {
            isEx = true;
            brand.value.push(data);
          }
        });
        if (!isEx) {
          let br = data.brand;
          brandArray.push({ [br]: [data] });
        }
      });

      filterObj.brand = brandArray;

      let priceArray = [];
      const PRICEFILTERQUATER = 4;
      let tmp = [...result.data];
      tmp.sort((a, b) =>
        parseInt(getPrice(a)) > parseInt(getPrice(b)) ? 1 : -1
      );
      let quarter = Math.round(tmp.length / PRICEFILTERQUATER);
      let quarterPrice = [];
      for (let i = 0; i < PRICEFILTERQUATER - 1; i++) {
        quarterPrice.push(parseInt(getPrice(tmp[PRICEFILTERQUATER * (i + 1)])));
      }
      quarterPrice.push(99999999);
      let saveIdx = 0; // 성능보완
      let idx = 0; // 성능보완
      quarterPrice.map((price) => {
        // 맵함수는 중단이 안됨 나중에 for문으로 바꿔야 할듯,,,
        tmp.map((data, index) => {
          if (parseInt(getPrice(data)) < price) {
            idx = index;
          }
        });
        priceArray.push({ [price]: tmp.slice(saveIdx, idx + 1) });
        saveIdx = idx + 1;
      });
      filterObj.price = priceArray;

      // 해당 객체를 가지고 있을 필욘 없으나 서버에서 바로 가져올수 있는 상황이 아니기 때문에 분석된걸 저장한 상태의 배열이 좋을 것 같ㅊ다.,
      let benefitArray = [];
      let sale = [];
      let limit = [];
      result.data.map((data) => {
        if (data.saleRatio !== 0) {
          sale.push(data);
        }
        if (parseInt(data.stock) <= 10) {
          limit.push(data);
        }
      });
      benefitArray.push({ 할인상품: sale });
      benefitArray.push({ 한정수량: limit });
      filterObj.benefit = benefitArray;

      // 유형
      let typeArray = [];
      let karlyOnly = [];
      let scarcityValue = [];
      result.data.map((data) => {
        if (data.kalryOnly == "true") {
          karlyOnly.push(data);
        }
      });
      typeArray.push({ 'Karly Only': karlyOnly });
      typeArray.push({ '희소가치 프로젝트': scarcityValue });

      filterObj.type = typeArray;
      filterObj.except = [{ '반려동물 상품': [] }];
      return filterObj;
    } catch (error) {
      console.log('통신에 에러가 발생했습니다!!');
    }
  }

  function getPrice(data) {
    if (data.saleRatio) {
      return data.salePrice;
    } else {
      return data.price;
    }
  }

  const filterObj = getFilterObject();

  let filterData = {
    category: {},
    brand: {},
    price: {},
    benefit: {},
    type: {},
    except: {},
  };

  let categoryMatchName = {
    category: '카테고리',
    brand: '브랜드',
    price: '가격',
    benefit: '혜택',
    type: '유형',
    except: '제외',
  };

  const filter = document.querySelector('.product-list__filter');

  async function makeFilterAccordian() {
    let filterBox = document.querySelector('.product-list__filter--box');
    await filterObj.then((obj) => {
      Object.entries(obj).forEach((type, idx) => {
        let accoderianHead = document.createElement('li');
        accoderianHead.innerHTML = `
          <div class="accordian__head" data-name="${
            type[0]
          }" data-check="false" data-elementname="accordian__head" data-idx="${idx}";>
            <div>
              <span class="product-list__filter--index-title">${
                categoryMatchName[type[0]]
              }</span><span class="product-list__filter--index-count"></span>
            </div>
            <img src="assets/product-list/ic-arrow-down.svg" alt="펼치기" class="product-list__filter--index-togle" />
          </div>
          <ul class="accordian__body accordian__body-${type[0]}" data-name="${
          type[0]
        }">
          </ul>
        `;
        filterBox.insertAdjacentElement('beforeend', accoderianHead);
        type[1].slice(0, 10).map((data, idx) => {
          let type2;
          if (type[0] == 'price') {
            if (idx == 0) {
              type2 = `${Object.keys(data)[0]}원 미만`;
            } else if (idx == type[1].length - 1) {
              type2 = `${Object.keys(type[1][idx - 1])}원 이상`;
            } else {
              type2 = `${Object.keys(type[1][idx - 1])}원 ~ ${Object.keys(
                type[1][idx]
              )}원`;
            }
          } else {
            type2 = Object.keys(data)[0];
          }
          const list = document.createElement('li');
          list.classList.add('accordian__item');
          list.dataset.elementname = 'accordian__item';
          list.dataset.flag = false;
          list.innerHTML = `
                    <div class="accordian__check">
                      <img src="./assets/product-list/ic-check.svg" alt="체크하기" class="check" />
                    </div>
                    <span class="accordian__item-name">${type2}</span>
                    <span class="accordian__item-count">${
                      Object.values(data)[0].length
                    }</span>
            `;
          let body = document.querySelector(`.accordian__body-${type[0]}`);
          body.insertAdjacentElement('beforeend', list);

          list.addEventListener('click', (e) => {
            let target = e.target;
            while (!attr(target, 'data-elementname')) {
              target = target.parentNode;

              if (target.nodeName === 'BODY') {
                target = null;
                return;
              }
            }

            if (target.dataset.elementname == 'accordian__item') {
              let flag = JSON.parse(target.dataset.flag);
              if (flag) {
                delete filterData[type[0]][type2];
              } else {
                filterData[type[0]][type2] = Object.values(data)[0];
              }
              target.dataset.flag = !flag;
              let listdata = filteringData(filterData);
              listdata[1] ? listRendering(listdata[0]) : getProductItems();
              checkAccordian();
            }
          });
        });
      });
    });
  }

  function filteringData(filterData) {
    let filterDataArray = Object.values(filterData);
    let aa = filterDataArray.map((product) => {
      let innerfilteredData = [];
      Object.values(product).map((da) => {
        let arData = Object.values(da);
        arData.reduce((acc, ad) => {
          if (!acc.includes(ad)) {
            innerfilteredData.push(ad);
          }
          return innerfilteredData;
        }, innerfilteredData);
      });
      return innerfilteredData;
    });

    let tmp3 = [];
    let flag = false;
    aa.map((data) => {
      if (data.length == 0) {
      } else {
        flag = true;
        if (tmp3.length == 0) {
          tmp3 = data;
        } else {
          let tmp4 = [];
          data.map((dat) => {
            if (tmp3.includes(dat)) {
              tmp4.push(dat);
            }
          });
          tmp3 = tmp4;
        }
      }
    });
    return [tmp3, flag];
  }

  async function listRendering(listData) {
    curData = listData;
    const productItemList = document.querySelector('.product-list__items-list');
    productItemList.innerHTML = '';
    listData.map((data) => {
      const productItem = document.createElement('li');
      productItem.dataset.id = data.id;
      productItem.dataset.name = 'product-box';
      productItem.classList.add('product-list__item');
      productItem.innerHTML = getProductItemMarkup(data);
      productItem.addEventListener('click', productItemClickHandler);
      productItemList.insertAdjacentElement('beforeend', productItem);
    });
  }

  await makeFilterAccordian();

  let accordianHeads = document.querySelectorAll('.accordian__head');
  let accordianchecks = document.querySelectorAll('.accordian__check');
  let accordianBodys = document.querySelectorAll('.accordian__body');
  let accordianToggles = document.querySelectorAll(
    '.product-list__filter--index-togle'
  );

  filter.addEventListener('click', filterHandler);

  function filterHandler(e) {
    let target = e.target;
    while (!attr(target, 'data-elementname')) {
      target = target.parentNode;

      if (target.nodeName === 'BODY') {
        target = null;
        return;
      }
    }
    if (target.dataset.elementname === 'accordian__head') {
      let flag = JSON.parse(target.dataset['check']);
      target.dataset['check'] = !flag;
      checkAccordian();
      return;
    }
    if (target.dataset.elementname === 'reset') {
      getProductItems();
      let accordianitmes = document.querySelectorAll('.accordian__item');
      accordianitmes.forEach((item) => {
        item.dataset.flag = false;
      });
      checkAccordian();
    }
  }

  //아코디언 플래그 확인 함수
  function checkAccordian() {
    accordianHeads.forEach((obj) => {
      let body = accordianBodys[obj.dataset.idx];
      let toggle = accordianToggles[obj.dataset.idx];
      if (JSON.parse(obj.dataset.check)) {
        body.classList.add('accordian__body-open');
        toggle.style.transform = `rotate(${-180}deg)`;
      } else {
        body.classList.remove('accordian__body-open');
        toggle.style.transform = `rotate(${0}deg)`;
      }
    });

    accordianchecks.forEach((obj) => {
      let item = obj.closest('li');
      if (JSON.parse(item.dataset.flag)) {
        obj.classList.add('accordian__check-checked');
      } else {
        obj.classList.remove('accordian__check-checked');
      }
    });
  }

  const orderList = document.querySelector('.product-list__sort')

  orderList.addEventListener('click', orderListHandeler)

  function orderListHandeler(e) {
    let target = e.target
    while(!attr(target, 'data-name')) {
      target = target.parentNode;

      if (target.nodeName === 'BODY') {
        target = null;
        return;
      }
    }

  if (target.dataset.name == 'desc') {
    curData.sort((a, b) => {
      if (parseInt(a.price) < parseInt(b.price)) return 1
      else if (parseInt(a.price) > parseInt(b.price)) return -1
      return 0
    })
    listRendering(curData)
  }

  if (target.dataset. name == 'asc') {
    curData.sort((a, b) => {
      if (parseInt(a.price) > parseInt(b.price)) return 1
      else if (parseInt(a.price) < parseInt(b.price)) return -1
      return 0
    })
    listRendering(curData)
  }
  }
}
