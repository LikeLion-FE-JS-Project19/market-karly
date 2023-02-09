import { axios, attr, getNode, getNodes } from '../lib/index.js';



const categoryData = [
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
  const category = document.querySelector('.header-container__category');
  const categoryList = document.querySelector(
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
  const productItems = getNodes('.header-container__product-item');
  const containerMid = document.querySelector('.header-container--mid');
  const header = document.querySelector('.header');
  const shadowLine = document.querySelector('.header__shadow-line');

  categoryData.map((data, index) => {
    const categoryItem = document.createElement('li');
    categoryItem.innerHTML = `
    <button class="header-container__category-button">
      <img src="${data.imgSrc}" alt="선물하기" width="24px" height="24px" class="header-container__category-img"/>${data.title}
    </button>`;
    categoryList.insertAdjacentElement('beforeend', categoryItem);
  });

  category.addEventListener('mouseover', categoryMouseoverHandler);
  category.addEventListener('mouseout', categoryMouseoutHandler);
  categoryList.addEventListener('mouseover', categoryMouseoutHandler);
  categoryList.addEventListener('blur', categoryMouseoutHandler);

  category.addEventListener('focus', categoryFocusHandler);

  function categoryFocusHandler(e) {
    categoryList.style.display = 'block';
  }

  function categoryMouseoverHandler(e) {
    categoryList.style.display = 'block';
  }

  function categoryMouseoutHandler() {
    categoryList.style.display = 'none';
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
  const cartModal = getNode('.cart-modal');

  async function getProductItems() {
    try {
      const result = await axios.get('http://localhost:3001/products');
      curData = result.data;
      listRendering(curData);
    } catch (error) {
      console.log('리스트 페이지를 불러오지 못했습니다');
    }
  }

  function getProductItemMarkup(data) {
    const priceMarkup = getProductPriceMarkup(data);
    const specialMarkMarkup = getProductSpecialMarkup(data);
    return (
      `
      <img src="${data.image.thumbnail}" alt="${data.name}" width="249" height="538" />
      <button type="button" class="btn-add-cart" data-name="button" data-id=${data.id} aria-label="${data.name} 장바구니 버튼"></button>
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

  function getProductPriceMarkup(data) {
    const isSale = data.saleRatio;
    if (isSale) {
      return `
        <p class="product-price">
          <span class="sale-percent">${getSalePercent(data.saleRatio)}%</span>
          ${getPriceFormat(data.salePrice)}원
        </p>
        <p class="first-price">${getPriceFormat(data.price)}원</p>
      `;
    } else {
      return `<p class="product-price">${getPriceFormat(data.price)}원</p>`;
    }
  }

  // 유틸
  function getPriceFormat(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // 유틸
  function getSalePercent(saleRatio) {
    return Math.floor(saleRatio * 100);
  }

  function getProductSpecialMarkup(data) {
    let specialMarkMarkup = '';
    if (JSON.parse(data.kalryOnly)) {
      specialMarkMarkup += `<span class="product-special-mark__mark product-special-mark--karly-only">Kalry Only</span>`;
    }
    if (data.stock <= 10) {
      specialMarkMarkup += `<span class="product-special-mark__mark product-special-mark--limited-quantity">한정수량</span>`;
    }
    return specialMarkMarkup;
  }

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
      const queries = { id: target.dataset.id };
      changeLocation('./product-detail.html', queries);
    }
  }

  // 유틸
  function changeLocation(url, queries) {
    let query = '';
    queries = Object.entries(queries);
    queries.forEach((q, idx) => {
      query += `${q[0]}=${q[1]}`;
      if (idx !== queries.length - 1) {
        query += '&';
      }
    });
    location.href = `${url}?${query}`;
  }

  async function makeCartModal(id) {
    const itemData = await getItemById(id);
    const currentPrice = getPrice(itemData);
    const priceValue = getCartPriceMarkup(itemData);
    cartModal.innerHTML = getCartModalMarkup(itemData, priceValue);
    cartModal.dataset.count = 1;
    cartModal.style.display = 'flex';

    const cartModalCancelButton = getNode('.cart-modal--button--cancel');

    cartModalCancelButton.addEventListener('click', () => {
      cartModal.style.display = 'none';
      removeDarkFiltering();
    });

    // 숫자 증감 기능
    const minusButton = getNode('.cart-modal--count-button--minus');
    const plusButton = getNode('.cart-modal--count-buttot--plus');

    minusButton.addEventListener('click', () => {
      cartModal.dataset.count = parseInt(cartModal.dataset.count) - 1;
      changeTotalPrice();
    });

    plusButton.addEventListener('click', () => {
      cartModal.dataset.count = parseInt(cartModal.dataset.count) + 1;
      changeTotalPrice();
    });

    // 수량 버튼 기능
    function changeTotalPrice() {
      const count = getNode('.cart-modal--count-value');
      const totalPrice = getNode('.cart-modal--total-price-top--price');
      count.innerHTML = cartModal.dataset.count;
      totalPrice.innerHTML = `${getPriceFormat(
        cartModal.dataset.count * parseInt(currentPrice)
      )}원`;
    }
    changeTotalPrice();
  }

  // id에 맞는 데이터 가져오기
  async function getItemById(id) {
    try {
      let result = await axios.get('http://localhost:3001/products');
      let value = result.data.filter((data) => data.id === id);
      return value[0];
    } catch (error) {
      console.log('통신 에러가 발생했습니다!');
    }
  }

  // 유틸?
  function getPrice(data) {
    if (data.saleRatio) {
      return data.salePrice;
    } else {
      return data.price;
    }
  }

  function getCartPriceMarkup(data) {
    if (data.saleRatio) {
      return `
        <span class="cart-modal--price">${getPriceFormat(
          data.salePrice
        )}원</span>
        <span class="cart-modal--price-sale">${getPriceFormat(
          data.price
        )}원</span>
        `;
    } else {
      return `
       <span class="cart-modal--price">${getPriceFormat(data.price)}원</span>
      `;
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

  function getCartModalMarkup(data, price) {
    return (
      `
      <div class="cart-modal--info">
        <span class="cart-modal--title">${data.name}</span>
        <span class="cart-modal--price-box">` +
      price +
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
          <span class="cart-modal--total-price-top--price"></span>
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
    `
    );
  }

  getProductItems();

  async function getFilterObject() {
    let filterObj = {};
    try {
      // 유틸함수 사용하기
      let result = await axios.get('http://localhost:3001/products');
      filterObj.category = getCategoryFilterArray(result);
      filterObj.brand = getBrandFilterArray(result);
      filterObj.price = getPriceFilterArray(result);
      filterObj.benefit = getBenefitFilterArray(result);
      filterObj.type = getTypeFilterArray(result);
      filterObj.except = getExceptFilterArray(result);
      return filterObj;
    } catch (error) {
      console.log('필터링 객체를 만들 수 없습니다.');
    }
  }

  function getCategoryFilterArray(items) {
    let categoryArray = [];
    categoryData.map((category) => {
      const title = category['title'];
      let ar = [];
      items.data.map((item) => {
        if (item.category === title) {
          ar.push(item);
        }
      });

      categoryArray.push({ [title]: ar });
    });
    return categoryArray;
  }

  function getBrandFilterArray(items) {
    let brandArray = [];
    items.data.map((item) => {
      let isExist = false;
      brandArray?.map((brand) => {
        if (brand.key === item.brand) {
          isExist = true;
          brand.value.push(item);
        }
      });
      if (!isExist) {
        let br = item.brand;
        brandArray.push({ [br]: [item] });
      }
    });
    return brandArray;
  }

  function getPriceFilterArray(items) {
    let priceArray = [];
    const PRICEFILTERQUATER = 4;
    let tmp = [...items.data];
    tmp.sort((a, b) =>
      parseInt(getPrice(a)) > parseInt(getPrice(b)) ? 1 : -1
    );
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
    return priceArray;
  }

  function getBenefitFilterArray(items) {
    let benefitArray = [];
    let sale = [];
    let limit = [];
    items.data.map((item) => {
      if (item.saleRatio !== 0) {
        sale.push(item);
      }
      if (parseInt(item.stock) <= 10) {
        limit.push(item);
      }
    });
    benefitArray.push({ 할인상품: sale });
    benefitArray.push({ 한정수량: limit });
    return benefitArray;
  }

  function getTypeFilterArray(items) {
    let typeArray = [];
    let karlyOnly = [];
    let scarcityValue = [];
    items.data.map((item) => {
      if (item.kalryOnly == 'true') {
        karlyOnly.push(item);
      }
    });
    typeArray.push({ 'Karly Only': karlyOnly });
    typeArray.push({ '희소가치 프로젝트': scarcityValue });
    return typeArray;
  }

  function getExceptFilterArray(items) {
    return [{ '반려동물 상품': [] }];
  }

  const filterObj = getFilterObject();

  let selectedfilterData = {
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

  const filter = getNode('.product-list__filter');

  async function makeFilterAccordion() {
    let filterBox = getNode('.product-list__filter--box');
    await filterObj.then((obj) => {
      Object.entries(obj).forEach(([filterHead, filteritems], idx) => {
        let accoderionHead = document.createElement('li');
        accoderionHead.innerHTML = getAccoderionHeadMarkUp(filterHead, idx);
        filterBox.insertAdjacentElement('beforeend', accoderionHead);
        getAccoderionItems(filterHead, filteritems);
      });
    });
  }

  function getAccoderionHeadMarkUp(filterHead, idx) {
    return `
          <button class="accordion__head" data-name="${filterHead}" data-check="false" data-elementname="accordion__head" data-idx="${idx}" aria-expanded="false">
            <div>
              <span class="product-list__filter--index-title">${categoryMatchName[filterHead]}</span><span class="product-list__filter--index-count"></span>
            </div>
            <img src="./assets/product-list/ic-arrow-down.svg" alt="펼치기" class="product-list__filter--index-togle" width="20" height="10" />
          </button>
          <ul class="accordion__body accordion__body-${filterHead}" data-name="${filterHead}">
          </ul>
        `;
  }

  function getAccoderionItems(filterHead, filteritems) {
    filteritems.slice(0, 10).map((item, idx) => {
      let filterItemName = Object.keys(item)[0];
      let filterItems = Object.values(item)[0];
      if (filterHead == 'price') {
        filterItemName = getPriceAccoderionItem(filteritems, idx);
      }
      const list = document.createElement('li');
      list.classList.add('accordion__item');
      list.dataset.elementname = 'accordion__item';
      list.dataset.flag = false;
      list.innerHTML = getAccoderionItemMarkUp(
        filterItemName,
        filterItems.length,
        filterHead
      );
      let body = getNode(`.accordion__body-${filterHead}`);
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

        if (target.dataset.elementname == 'accordion__item') {
          let flag = JSON.parse(target.dataset.flag);
          if (flag) {
            delete selectedfilterData[filterHead][filterItemName];
          } else {
            selectedfilterData[filterHead][filterItemName] = filterItems;
          }
          target.dataset.flag = !flag;
          let [listdata, isFiltered] = filteringData(selectedfilterData);
          isFiltered ? listRendering(listdata) : getProductItems();
          checkAccordion();
        }
      });
    });
  }

  function getPriceAccoderionItem(filteritems, idx) {
    if (idx == 0) {
      return `${Object.keys(filteritems[0])}원 미만`;
    } else if (idx == filteritems.length - 1) {
      return `${Object.keys(filteritems[idx - 1])}원 이상`;
    } else {
      return `${Object.keys(filteritems[idx - 1])}원 ~ ${Object.keys(
        filteritems[idx]
      )}원`;
    }
  }

  function getAccoderionItemMarkUp(filterItemName, count, filterHead) {
    return `
                  <button class="accordion__item-button accordion__body-${filterHead}-button" tabindex="-1">
                    <div class="accordion__check">
                      <img src="./assets/product-list/ic-check.svg" alt="체크하기" class="check" />
                    </div>
                    <span class="accordion__item-name">${filterItemName}</span>
                    <span class="accordion__item-count">${count}</span>
                  </button>
            `;
  }

  function filteringData(selectedfilterData) {
    let selectedfilterDataArray = Object.values(selectedfilterData);
    let itemFilteredData = selectedfilterDataArray.map((filterHead) =>
      filterItems(Object.values(Object.values(filterHead)))
    );
    return filterHeads(itemFilteredData);
  }

  // 중복제거
  function filterItems(ar) {
    let filteredData = [];
    ar.map((items) => {
      items.reduce((acc, item) => {
        if (!acc.includes(item)) {
          filteredData.push(item);
        }
        return filteredData;
      }, filteredData);
    });
    return filteredData;
  }

  function filterHeads(ar) {
    let filteredData = [];
    let isFiltered = false;
    ar.map((items) => {
      if (items.length !== 0) {
        isFiltered = true;
        if (filteredData.length == 0) {
          filteredData = items;
        } else {
          let filteredItem = [];
          items.map((item) => {
            if (filteredData.includes(item)) {
              filteredItem.push(item);
            }
          });
          filteredData = filteredItem;
        }
      }
    });
    return [filteredData, isFiltered];
  }

  async function listRendering(listData) {
    curData = listData;
    let totalCount = getNode('.product-list__total-count');
    totalCount.innerHTML=`총 ${curData.length}건`;
    const productItemList = document.querySelector('.product-list__items-list');
    productItemList.innerHTML = '';
    listData.map((data) => {
      const productItem = document.createElement('li');
      productItem.dataset.id = data.id;
      productItem.dataset.name = 'product-box';
      productItem.tabIndex = "0"
      productItem.classList.add('product-list__item');
      productItem.innerHTML = getProductItemMarkup(data);
      productItem.addEventListener('click', productItemClickHandler);
      productItemList.insertAdjacentElement('beforeend', productItem);
    });
  }

  await makeFilterAccordion();

  const accordionHeads = getNodes('.accordion__head');
  const accordionchecks = getNodes('.accordion__check');
  const accordionBodys = getNodes('.accordion__body');
  const accordionToggles = getNodes('.product-list__filter--index-togle');

  filter.addEventListener('click', filterClickHandler);

  function filterClickHandler(e) {
    let target = e.target;
    while (!attr(target, 'data-elementname')) {
      target = target.parentNode;

      if (target.nodeName === 'BODY') {
        target = null;
        return;
      }
    }
    if (target.dataset.elementname === 'accordion__head') {
      let flag = JSON.parse(target.dataset['check']);
      target.dataset['check'] = !flag;
      checkAccordion();
      return;
    }
    if (target.dataset.elementname === 'reset') {
      getProductItems();
      selectedfilterData = {
        category: {},
        brand: {},
        price: {},
        benefit: {},
        type: {},
        except: {},
      };
      let accordionitmes = getNodes('.accordion__item');
      accordionitmes.forEach((item) => {
        item.dataset.flag = false;
      });
      checkAccordion();
      return;
    }
  }

  //아코디언 플래그 확인 함수
  function checkAccordion() {
    checkAccordionHeads();
    checkAccordionItems();
  }

  function checkAccordionHeads() {
    accordionHeads.forEach((obj) => {
      let body = accordionBodys[obj.dataset.idx];
      let toggle = accordionToggles[obj.dataset.idx];
      console.log(toggle);
      if (JSON.parse(obj.dataset.check)) {
        const itemButtons = getNodes(`.${body.classList[1]}-button`);
        itemButtons.forEach((button) => {
          button.tabIndex = '0';
        });
        body.classList.add('accordion__body-open');
        toggle.style.transform = `rotate(${-180}deg)`;
      } else {
        const itemButtons = getNodes(`.${body.classList[1]}-button`);
        itemButtons.forEach((button) => {
          button.tabIndex = '-1';
        });
        body.classList.remove('accordion__body-open');
        toggle.style.transform = `rotate(${0}deg)`;
      }
    });
  }

  function checkAccordionItems() {
    accordionchecks.forEach((obj) => {
      let item = obj.closest('li');
      if (JSON.parse(item.dataset.flag)) {
        obj.classList.add('accordion__check-checked');
      } else {
        obj.classList.remove('accordion__check-checked');
      }
    });
  }

  const orderList = document.querySelector('.product-list__sort');

  orderList.addEventListener('click', orderListClickHandeler);

  function orderListClickHandeler(e) {
    let target = e.target;
    while (!attr(target, 'data-name')) {
      target = target.parentNode;

      if (target.nodeName === 'BODY') {
        target = null;
        return;
      }
    }

    if (target.dataset.name == 'desc') {
      curData.sort((a, b) => {
        if (parseInt(a.price) < parseInt(b.price)) return 1;
        else if (parseInt(a.price) > parseInt(b.price)) return -1;
        return 0;
      });
      listRendering(curData);
    }

    if (target.dataset.name == 'asc') {
      curData.sort((a, b) => {
        if (parseInt(getPrice(a)) > parseInt(getPrice(b))) return 1;
        else if (parseInt(getPrice(a)) < parseInt(getPrice(b))) return -1;
        return 0;
      });
      listRendering(curData);
    }
  }
}























export async function mainCarouselEventHandler() {
  console.log('hello');
  const sw1 = getNode('.swiper-wrapper-fst-carousel')
  const cartModal = getNode('.cart-modal');
   await getProductItems()


  
  async function getProductItems() {
    try {
      const result = await axios.get('http://localhost:3001/products');
      curData = result.data;
      listRendering(curData.slice(0,8));
    } catch (error) {
      console.log('리스트 페이지를 불러오지 못했습니다');
    }
  }

  function getProductItemMarkup(data) {
    const priceMarkup = getProductPriceMarkup(data);
    return (
      `
      <img src="${data.image.thumbnail}" alt="${data.name}" width="249" height="538" class='product-list__item-img'/>
      <button type="button" class="btn-add-cart" data-name="button" data-id=${data.id} aria-label="${data.name} 장바구니 버튼"></button>
      <p class="product-name--product-list">${data.name}</p>
      ` +
      priceMarkup
    );
  }

  function getProductPriceMarkup(data) {
    const isSale = data.saleRatio;
    if (isSale) {
      return `
        <p class="product-price">
          <span class="sale-percent">${getSalePercent(data.saleRatio)}%</span>
          ${getPriceFormat(data.salePrice)}원
        </p>
        <p class="first-price">${getPriceFormat(data.price)}원</p>
      `;
    } else {
      return `<p class="product-price">${getPriceFormat(data.price)}원</p>`;
    }
  }

  // 유틸
  function getPriceFormat(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // 유틸
  function getSalePercent(saleRatio) {
    return Math.floor(saleRatio * 100);
  }


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
      const queries = { id: target.dataset.id };
      changeLocation('./product-detail.html', queries);
    }
  }

  // 유틸
  function changeLocation(url, queries) {
    let query = '';
    queries = Object.entries(queries);
    queries.forEach((q, idx) => {
      query += `${q[0]}=${q[1]}`;
      if (idx !== queries.length - 1) {
        query += '&';
      }
    });
    location.href = `${url}?${query}`;
  }

  async function listRendering(listData) {
    listData.map((data, idx) => {
      let productItem = document.createElement('div');
      productItem.classList.add('swiper-slide');
      productItem.classList.add(`product-swiper-2__slide0${idx}`);
      productItem.dataset.id = data.id;
      productItem.dataset.name = 'product-box';
      productItem.tabIndex = "-1"
      productItem.role = "group"
      // console.log(sw1);
      productItem.innerHTML = getProductItemMarkup(data);
      productItem.addEventListener('click', productItemClickHandler);
      sw1.insertAdjacentElement('beforeend', productItem);
    });
}



  async function makeCartModal(id) {
    const itemData = await getItemById(id);
    const currentPrice = getPrice(itemData);
    const priceValue = getCartPriceMarkup(itemData);
    cartModal.innerHTML = getCartModalMarkup(itemData, priceValue);
    cartModal.dataset.count = 1;
    cartModal.style.display = 'flex';

    const cartModalCancelButton = getNode('.cart-modal--button--cancel');

    cartModalCancelButton.addEventListener('click', () => {
      cartModal.style.display = 'none';
      removeDarkFiltering();
    });

    // 숫자 증감 기능
    const minusButton = getNode('.cart-modal--count-button--minus');
    const plusButton = getNode('.cart-modal--count-buttot--plus');

    minusButton.addEventListener('click', () => {
      cartModal.dataset.count = parseInt(cartModal.dataset.count) - 1;
      changeTotalPrice();
    });

    plusButton.addEventListener('click', () => {
      cartModal.dataset.count = parseInt(cartModal.dataset.count) + 1;
      changeTotalPrice();
    });

    // 수량 버튼 기능
    function changeTotalPrice() {
      const count = getNode('.cart-modal--count-value');
      const totalPrice = getNode('.cart-modal--total-price-top--price');
      count.innerHTML = cartModal.dataset.count;
      totalPrice.innerHTML = `${getPriceFormat(
        cartModal.dataset.count * parseInt(currentPrice)
      )}원`;
    }
    changeTotalPrice();
  }

  // id에 맞는 데이터 가져오기
  async function getItemById(id) {
    try {
      let result = await axios.get('http://localhost:3001/products');
      let value = result.data.filter((data) => data.id === id);
      return value[0];
    } catch (error) {
      console.log('통신 에러가 발생했습니다!');
    }
  }

  // 유틸?
  function getPrice(data) {
    if (data.saleRatio) {
      return data.salePrice;
    } else {
      return data.price;
    }
  }

  function getCartPriceMarkup(data) {
    if (data.saleRatio) {
      return `
        <span class="cart-modal--price">${getPriceFormat(
          data.salePrice
        )}원</span>
        <span class="cart-modal--price-sale">${getPriceFormat(
          data.price
        )}원</span>
        `;
    } else {
      return `
       <span class="cart-modal--price">${getPriceFormat(data.price)}원</span>
      `;
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

  function getCartModalMarkup(data, price) {
    return (
      `
      <div class="cart-modal--info">
        <span class="cart-modal--title">${data.name}</span>
        <span class="cart-modal--price-box">` +
      price +
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
          <span class="cart-modal--total-price-top--price"></span>
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
    `
    );

}



}
