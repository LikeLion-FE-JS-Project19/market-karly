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