export function swiper2() {
  const swiper = new Swiper('.swiper2', {

	slidesPerView : 4, 
	spaceBetween : 18, 
	slidesPerGroup : 4,

	loopFillGroupWithBlank : true,
  
	pagination : {
		el : '.swiper-pagination',
		clickable : true, 
	},

	navigation : { 
		nextEl : '.swiper-button-next', 
		prevEl : '.swiper-button-prev', 
	},
});
}

export function swiper3() {
  const swiper = new Swiper('.swiper3', {

	slidesPerView : 4, 
	spaceBetween : 18, 
	slidesPerGroup : 4,

	loopFillGroupWithBlank : true,
  
	pagination : {
		el : '.swiper-pagination',
		clickable : true, 
	},

	navigation : { 
		nextEl : '.swiper-button-next', 
		prevEl : '.swiper-button-prev', 
	},
});
}

export function getNodes(node){
  if(typeof node !== 'string'){
    throw new Error('getNode 함수의 인자는 문자 타입 이여야 합니다.');
  }
  return document.querySelectorAll(node)
}

export function onClickAddCartHandler(e){
  e.preventDefault();
	console.log('장바구니 담기 완료~')
}