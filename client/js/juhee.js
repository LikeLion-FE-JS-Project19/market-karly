export function swiperWrapper() {
  const swiper = new Swiper('.swiper-container', {

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