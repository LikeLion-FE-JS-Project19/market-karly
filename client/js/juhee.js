export function swiper2() {
  const swiper = new Swiper('.swiper-2', {

	slidesPerView : 4, 
	spaceBetween : 18, 
	slidesPerGroup : 4,

	loopFillGroupWithBlank : true,

	navigation : { 
		nextEl : '.swiper-button-next', 
		prevEl : '.swiper-button-prev', 
	},
});
}

export function swiper3() {
  const swiper = new Swiper('.swiper-3', {

	slidesPerView : 4, 
	spaceBetween : 18, 
	slidesPerGroup : 4,

	loopFillGroupWithBlank : true,

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

export function closeReviewModalButton() {
	const closeTopButton = document.querySelector('.modal-review__close-button');
	const closeBottomButton = document.querySelector('.modal-review-button--cancel');
	const reviewModal = document.querySelector('.modal-review-background');

	closeBottomButton.addEventListener('click',closeReviewModal);
	closeTopButton.addEventListener('click',closeReviewModal);

	function closeReviewModal() {
		const modal = reviewModal;
		modal.remove()
	}
}