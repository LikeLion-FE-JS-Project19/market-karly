// 린트 일단 바꿈 (머지할떄 일단 원래대로?)
// 핸들러 이름 꼭 바꿔주기

export function f() {

  const categotyData = [
    {title:'선물하기',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=Gift.svg"},
    {title:'채소',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=_Vegetable.svg"},
    {title:'과일ㆍ견과ㆍ쌀',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=Fruit.svg"},
    {title:'수산ㆍ해산ㆍ건어물',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=SeaFood.svg"},
    {title:'정육ㆍ계란',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=Meet.svg"},
    {title:'국ㆍ반찬ㆍ메인요리',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=Cook.svg"},
    {title:'샐러드ㆍ간편식',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=_Salad.svg"},
    {title:'면ㆍ양념ㆍ오일',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=Oil.svg"},
    {title:'생수ㆍ음료ㆍ우유ㆍ커피',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=Coffee.svg"},
    {title:'간식ㆍ과자ㆍ떡',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=Snack.svg"},
    {title:'베이커리ㆍ치즈ㆍ델리',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=Bread.svg"},
    {title:'건강식품',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=Health.svg"},
    {title:'와인',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=Wine.svg"},
    {title:'전통주',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=_Traditional Liquor.svg"},
    {title:'생활용품ㆍ리빙ㆍ캠핑',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=_Detergent.svg"},
    {title:'스킨케어ㆍ메이크업',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=_Cosmetics.svg"},
    {title:'헤어ㆍ바디ㆍ구강',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=shampoo.svg"},
    {title:'주방용품',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=Food.svg"},
    {title:'가전제품',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=HomeAppliances.svg"},
    {title:'반려동물',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=Dog.svg"},
    {title:'베이비ㆍ키즈ㆍ완구',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=Baby.svg"},
    {title:'여행ㆍ티켓',
    imgSrc:"./assets/icons/Icon/mainHeaderIcon/Type=Travel.svg"},
    
  ]

  // 카테고리 관련 돔객체
  const categoty = document.querySelector('.header-container__category')
  const categotyList = document.querySelector('.header-container__category-list')

  // 스태틱 헤더 관련 돔객체
  const containerBottom = document.querySelector('.header-container--bottom')
  const searchForm = document.querySelector('.searchForm')
  const accountMenu = document.querySelector('.header-container__account-menu')
  const subInfo = document.querySelector('.header-container--bottom-last')
  const productItems = document.querySelectorAll('.header-container__product-item')
  const containerMid = document.querySelector('.header-container--mid')
  const header = document.querySelector('.header')
  const shadowLine = document.querySelector('.header__shadow-line')

  console.log(productItems);

  categotyData.map((data, index)=>{
    const categoryItem = document.createElement('li')
    // 이미지를 보내주는 것이 아니기 때문에 html 입장에서의 경로를 압력해야함
    categoryItem.innerHTML = 
    `<img src="${data.imgSrc}" alt="선물하기" width="24px" height="24px" class="header-container__category-img"/>${data.title}`
    // categoryItem.classList.add('')
    categotyList.insertAdjacentElement("beforeend", categoryItem)
  })


  categoty.addEventListener('mouseover', mouseoverHandler)
  categoty.addEventListener('mouseout', mouseoutHandler)
  categotyList.addEventListener('mouseover', mouseoutHandler)

  function mouseoverHandler() {
    categotyList.style.display = "block";
  }

  function mouseoutHandler() {
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
    productItems.forEach(item=>item.style.width = '125px')
    containerBottom.insertAdjacentElement("beforeend",searchForm)
    containerBottom.insertAdjacentElement("beforeend",accountMenu)
    containerBottom.classList.add('header-container--bottom-fixed')
    makeShadow()
  }

  function changeOriginHeader() {
    searchForm.classList.remove('searchForm-fixed')
    productItems.forEach(item=>item.style.width = '150px')
    containerBottom.insertAdjacentElement("beforeend",subInfo)
    containerMid.insertAdjacentElement("beforeend",searchForm)
    containerMid.insertAdjacentElement("beforeend",accountMenu)
    containerBottom.classList.remove('header-container--bottom-fixed')
    removeShadow()
  }

  function makeShadow() {
    shadowLine.style.display = 'block'
  }

  function removeShadow() {
    shadowLine.style.display = 'none'
  }

}



