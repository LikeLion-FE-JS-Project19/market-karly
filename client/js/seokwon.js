// 린트 일단 바꿈 (머지할떄 일단 원래대로?)
// 핸들러 이름 꼭 바꿔주기
import {tiger} from '../lib/utils/index.js'
import {attr} from '../lib/dom/attr.js'


export function mainHeaderEventHandler() {

  const categotyData = [
    {title:'선물하기',
    imgSrc:"./assets/header/ic-gift.svg"},
    {title:'채소',
    imgSrc:"./assets/header/ic-vegetable.svg"},
    {title:'과일ㆍ견과ㆍ쌀',
    imgSrc:"./assets/header/ic-fruit.svg"},
    {title:'수산ㆍ해산ㆍ건어물',
    imgSrc:"./assets/header/ic-sea-food.svg"},
    {title:'정육ㆍ계란',
    imgSrc:"./assets/header/ic-meet.svg"},
    {title:'국ㆍ반찬ㆍ메인요리',
    imgSrc:"./assets/header/ic-cook.svg"},
    {title:'샐러드ㆍ간편식',
    imgSrc:"./assets/header/ic-salad.svg"},
    {title:'면ㆍ양념ㆍ오일',
    imgSrc:"./assets/header/ic-oil.svg"},
    {title:'생수ㆍ음료ㆍ우유ㆍ커피',
    imgSrc:"./assets/header/ic-coffee.svg"},
    {title:'간식ㆍ과자ㆍ떡',
    imgSrc:"./assets/header/ic-snack.svg"},
    {title:'베이커리ㆍ치즈ㆍ델리',
    imgSrc:"./assets/header/ic-bread.svg"},
    {title:'건강식품',
    imgSrc:"./assets/header/ic-health.svg"},
    {title:'와인',
    imgSrc:"./assets/header/ic-wine.svg"},
    {title:'전통주',
    imgSrc:"./assets/header/ic-traditional-liquor.svg"},
    {title:'생활용품ㆍ리빙ㆍ캠핑',
    imgSrc:"./assets/header/ic-detergent.svg"},
    {title:'스킨케어ㆍ메이크업',
    imgSrc:"./assets/header/ic-cosmetics.svg"},
    {title:'헤어ㆍ바디ㆍ구강',
    imgSrc:"./assets/header/ic-shampoo.svg"},
    {title:'주방용품',
    imgSrc:"./assets/header/ic-food.svg"},
    {title:'가전제품',
    imgSrc:"./assets/header/ic-home-appliances.svg"},
    {title:'반려동물',
    imgSrc:"./assets/header/ic-dog.svg"},
    {title:'베이비ㆍ키즈ㆍ완구',
    imgSrc:"./assets/header/ic-baby.svg"},
    {title:'여행ㆍ티켓',
    imgSrc:"./assets/header/ic-travel.svg"},
    
  ]

  // 카테고리 관련 돔객체
  const categoty = document.querySelector('.header-container__category')
  const categotyList = document.querySelector('.header-container__category-list')

  // 스태틱 헤더 관련 돔객체
  const containerBottom = document.querySelector('.header-container--bottom')
  const containerBottomGrid = document.querySelector('.header-container--bottom-grid')
  const searchForm = document.querySelector('.searchForm')
  const accountMenu = document.querySelector('.header-container__account-menu')
  const subInfo = document.querySelector('.header-container--bottom-last')
  const productItems = document.querySelectorAll('.header-container__product-item')
  const containerMid = document.querySelector('.header-container--mid')
  const header = document.querySelector('.header')
  const shadowLine = document.querySelector('.header__shadow-line')

  categotyData.map((data, index)=>{
    const categoryItem = document.createElement('li')
    // 이미지를 보내주는 것이 아니기 때문에 html 입장에서의 경로를 압력해야함
    categoryItem.innerHTML = 
    `<img src="${data.imgSrc}" alt="선물하기" width="24px" height="24px" class="header-container__category-img"/>${data.title}`
    categotyList.insertAdjacentElement("beforeend", categoryItem)
  })

  categoty.addEventListener('mouseover', categotyMouseoverHandler)
  categoty.addEventListener('mouseout', categotyMouseoutHandler)
  categotyList.addEventListener('mouseover', categotyMouseoutHandler)
  categotyList.addEventListener('blur', categotyMouseoutHandler)

  categoty.addEventListener('focus', categotyFocusHandler)

  function categotyFocusHandler(e) {
    
    categotyList.ariaSelected = 'true'
    categotyList.ariaExpanded = 'true'
    categotyList.style.display = "block";
  }

  function categotyMouseoverHandler(e) {
    categotyList.style.display = "block";
  }

  function categotyMouseoutHandler() {
    categotyList.style.display = "none"
  }

  // 스크롤 관련 상태
  let status = false
  let currentStatus = false

  window.addEventListener('scroll', scrollHandler)
  function scrollHandler() {
    if (scrollY < 104) {
      currentStatus = false;
    } else {
      currentStatus = true;
    }
    if (status === currentStatus) {
      return
    }
    if (currentStatus) {
      changeFixedHeader();
    } else {
      changeOriginHeader()
    }
    status = currentStatus;
  }

  function changeFixedHeader() {
    subInfo.remove()
    searchForm.classList.add('searchForm-fixed')
    accountMenu.classList.remove('header-container__account-menu')
    accountMenu.classList.add('header-container__account-menu-fixed')
    productItems.forEach(item=>item.style.width = '125px')
    containerBottomGrid.insertAdjacentElement("beforeend",searchForm)
    containerBottomGrid.insertAdjacentElement("beforeend",accountMenu)
    containerBottom.classList.add('header-container--bottom-fixed')
    containerBottomGrid.classList.add('header-container--bottom-grid-fixed')
    makeShadow()
  }

  function changeOriginHeader() {
    searchForm.classList.remove('searchForm-fixed')
    accountMenu.classList.add('header-container__account-menu')
    accountMenu.classList.remove('header-container__account-menu-fixed')
    productItems.forEach(item=>item.style.width = '150px')
    containerBottomGrid.insertAdjacentElement("beforeend",subInfo)
    containerMid.insertAdjacentElement("beforeend",searchForm)
    containerMid.insertAdjacentElement("beforeend",accountMenu)
    containerBottom.classList.remove('header-container--bottom-fixed')
    containerBottomGrid.classList.remove('header-container--bottom-grid-fixed')
    removeShadow()
  }

  function makeShadow() {
    shadowLine.style.display = 'block'
  }

  function removeShadow() {
    shadowLine.style.display = 'none'
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
  console.log(URLSearch);
  console.log(URLSearch.get("id"));

  console.log("test");

  const defaultOptions = {
  method: 'GET',
  mode: 'cors',
  body:null,
  cache: 'no-cache',
  credential: 'same-origin',
  redirect:'follow',
  referrerPolicy:'no-referrer',
  headers:{
    'Content-Type':'application/json; charset=UTF-8'
  }
}


  // async function test() {
  //   try {
  //     let result = await fetch("http://localhost:3001/products", defaultOptions)
  //     if(result.ok)  {
  //       result.data = await result.json()
  //     }
  //     console.log(result.data);
  //     const a = result.data
  //     console.log(a);
  //     return a;
  //   } catch (error) {
  //     console.log("json통신에서 오류가 발생했습니다.");
  //   }
  // }

  // let productData = test()
  // console.log(productData);

  function getProductItemMarkup(data) {
    console.log(data);
    let priceMarkup
    let specialMarkMarkup = ''

    // 나중에 함수들 분리하기
    if (data.saleRatio) {
      priceMarkup =  
      `
        <p class="product-price"><span class="sale-percent">${data.saleRatio*100}%</span>${data.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
        <p class="first-price">${data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
      `
    } else {
      priceMarkup = `<p class="product-price">${data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>`
    }
    if ("[Kalry's]" === data.name.slice(0,9)) {
      specialMarkMarkup += `<span class="product-special-mark__mark product-special-mark--karly-only">Kalry Only</span>`
    }
    if (data.stock <= 10) {
      specialMarkMarkup += `<span class="product-special-mark__mark product-special-mark--limited-quantity">한정수량</span>`
    }

    // 캐로셀인지 상품리스트에 따라 다르게 줘야함 + 이름 간격도
    // 숫자 콤마 함수로 만들기
    return (`
      <img src="./assets/product/${data.image.thumbnail}" alt="${data.name}" />
      <button type="button" class="btn-add-cart" data-name="button" data-id=${data.id}></button>
      <p class="product-mark--morning-star">샛별 배송</p>
      <p class="product-name--product-list">${data.name}</p>
      `
      +
      priceMarkup
      +
      `<p class="product-mark--info">${data.description}</p>`
      +
      `<div class="product-special-mark" data-name="label">`
      +
      specialMarkMarkup
      +
      `</div>`
    )
  }

  async function getProductItems(data) {

    // 통신 유틸함수로 하기
    let result = await fetch("http://localhost:3001/products", defaultOptions)
    if(result.ok)  {
        result.data = await result.json()
    }

    const productItemList = document.querySelector(".product-list__items-list")
    result.data.map((data)=>{
      const productItem = document.createElement('li')
      productItem.dataset.id = data.id
      productItem.dataset.name = 'product-box'
      productItem.classList.add('product-list__item')
      productItem.innerHTML = getProductItemMarkup(data)
      productItem.addEventListener('click', productItemClickHandler)
      productItemList.insertAdjacentElement('beforeend', productItem)     
    })
  }

  // 상품에 이벤트 위임 설정
  function productItemClickHandler(e) {
    console.log('눌림');

    let target = e.target
    while(!attr(target,'data-name')) {
      target = target.parentNode;

      if(target.nodeName === 'BODY'){
        target = null;
        return;
      }
    }

    if (target.dataset.name === 'button') {
      console.log('버튼이 눌렸습니다');
      makeDarkFiltering();
      makeCartModal(target.dataset.id)
      return
    } 

    if (target.dataset.name === 'label') {
      return
    }

    if (target.dataset.name === 'product-box') {
      console.log('상품이 눌렸습니다');
      location.href=`/client/product-detail.html?data=${target.dataset.id}`
      return
    }
  }


  // 모달이 html에 마크업이 된상태가 좋을까? 아니면 js에서 만드는게 좋을까?
  // 다른곳에도 쓰이니깐 js에서 만드는게 좋을것 같다.. 뇌피셜
  const cartModal = document.querySelector('.cart-modal')

  async function makeCartModal(id) {
    cartModal.dataset.count = 1;
    const itemData= await getItemById(id)
    console.log(itemData);
    let currentPrice;
    let priceValue;
    if (itemData.saleRatio){
      currentPrice = itemData.salePrice;
      priceValue = `
      <span class="cart-modal--price">${itemData.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
      <span class="cart-modal--price-sale">${itemData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
      `
    } else {
      currentPrice = itemData.price;
      priceValue = `
      <span class="cart-modal--price">${itemData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
      `
    }

    console.log(priceValue);

    cartModal.style.display = 'flex'
    const modalData = `
      <div class="cart-modal--info">
        <span class="cart-modal--title">${itemData.name}</span>
        <span class="cart-modal--price-box">`
          +
          priceValue
          +
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
    ` 
    cartModal.innerHTML=modalData
    const cartModalCancelButton = document.querySelector('.cart-modal--button--cancel')
    cartModalCancelButton.addEventListener('click', ()=>{
      cartModal.style.display = 'none'
      removeDarkFiltering() 
    })

    // 수량 버튼 기능
    function changeTotalPrice() {
      const count = document.querySelector(".cart-modal--count-value")
      const totalPrice = document.querySelector(".cart-modal--total-price-top--price")

      count.innerHTML = cartModal.dataset.count
      totalPrice.innerHTML = `${(cartModal.dataset.count * parseInt(currentPrice)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`
    }

    changeTotalPrice()
    // 숫자 증감 기능
    const minusButton = document.querySelector(".cart-modal--count-button--minus")
    const plusButton = document.querySelector(".cart-modal--count-buttot--plus")

    minusButton.addEventListener("click" , ()=>{
      cartModal.dataset.count = parseInt(cartModal.dataset.count)-1
      console.log(cartModal.dataset.count);
      changeTotalPrice()
    })

    plusButton.addEventListener("click" , ()=>{
      cartModal.dataset.count = parseInt(cartModal.dataset.count)+1
      console.log(cartModal.dataset.count);
      changeTotalPrice()
    })
  }

  // id에 맞는 데이터 가져오기
  async function getItemById(id) {
    try {
      let result = await fetch("http://localhost:3001/products", defaultOptions)
      if(result.ok)  {
        result.data = await result.json()
      }
      let idx = 0
      await result.data.map((data, index)=>{
        if (data.id === id) {
          idx = index;
          //여기서 직접 리턴을 하면 왜 오류가 날까요....
          // return data
        }
      })
    return result.data[idx]
    } catch (error) {
      console.log("통신 에러가 발생했습니다!");
    }
  }

  // 모달 제외하고 어두워지는 기능
  function makeDarkFiltering() {
    const darkFilter = document.querySelector('.dark-filter')
    darkFilter.style.display = 'block'
  }

  function removeDarkFiltering() {
    const darkFilter = document.querySelector('.dark-filter')
    darkFilter.style.display = 'none'
  }

   getProductItems()

}

