(() => {
	const breakPC = 1024;
	const breakTA = 720;
	let mySwiperGnb, mySwiperProfile, mySwiperCardOfTheMonth, mySwiperCardEbskTv, mySwiperEveTable;


	// Swiper 초기화
	function initSwiper() {
		const screenWidth = window.innerWidth;

		// 이벤트 테이블
		if (screenWidth <= breakPC && mySwiperEveTable === undefined) {
			mySwiperEveTable = new Swiper(".bl_eveTable_wrap.swiper", {
				slidesPerView: 2.1,
				spaceBetween: 16,
				breakpoints: {
					720: {
						slidesPerView: 2.3,
					}
				}
			});
		} else if (screenWidth > breakPC && mySwiperEveTable !== undefined) {
			mySwiperEveTable.destroy();
			mySwiperEveTable = undefined;
			document.querySelector('.bl_eveTable_wrap > .swiper-wrapper').removeAttribute('style');
			document.querySelector('.bl_eveTable_wrap > ul > .swiper-slide').removeAttribute('style');
		}


		// GNB
		if (screenWidth <= breakPC && mySwiperGnb === undefined) {
			mySwiperGnb = new Swiper(".bl_navConts.swiper", {
				slidesPerView: 'auto',
				freeMode: true,
				slideToClickedSlide: true,
				navigation: false,
			});
		} else if (screenWidth > breakPC && mySwiperGnb !== undefined) {
			mySwiperGnb.destroy();
			mySwiperGnb = undefined;
			document.querySelector('.bl_navConts > .swiper-wrapper').removeAttribute('style');
			document.querySelector('.bl_navConts > ul > .swiper-slide').removeAttribute('style');
		}


		//이달의 교재·강좌·입시설명회
		if (screenWidth <= breakPC && mySwiperCardOfTheMonth === undefined) {
			mySwiperCardOfTheMonth = new Swiper(".bl_card_wrap_ofTheMonth .swiper", {
				loop: true,
				loopedSlides: 5,
				slidesPerView: 1.5,
				spaceBetween: 16,
				breakpoints: {
					720: {
						slidesPerView: 2.3,
					}
				}
			});
		} else if (screenWidth > breakPC && mySwiperCardOfTheMonth !== undefined) {
			mySwiperCardOfTheMonth.destroy();
			mySwiperCardOfTheMonth = undefined;
			document.querySelector('.bl_card_wrap_ofTheMonth .swiper-wrapper').removeAttribute('style');
			document.querySelector('.bl_card_wrap_ofTheMonth .swiper-slide').removeAttribute('style');
		}


		// 듀나TV
		if (screenWidth <= breakPC && mySwiperCardEbskTv === undefined) {
			mySwiperCardEbskTv = new Swiper(".bl_card_wrap_ebskTv .swiper", {
				loop: true,
				loopedSlides: 5,
				slidesPerView: 1.5,
				spaceBetween: 16,
				breakpoints: {
					720: {
						slidesPerView: 2.3,
					}
				}
			});
		} else if (screenWidth > breakPC && mySwiperCardEbskTv !== undefined) {
			mySwiperCardEbskTv.destroy();
			mySwiperCardEbskTv = undefined;
			document.querySelector('.bl_card_wrap_ebskTv .swiper-wrapper').removeAttribute('style');
			document.querySelector('.bl_card_wrap_ebskTv .swiper-slide').removeAttribute('style');
		}
	}


	// footer site family
	const mySwiper_siteFamily_wrap = new Swiper(".bl_siteFamily_wrap", {
		slidesPerView: 'auto',
		freeMode: true,
		slideToClickedSlide: true,
		navigation: {
				nextEl: ".bl_siteFamily_btn_next",
				prevEl: ".bl_siteFamily_btn_prev",
			},
	});

	window.addEventListener('load', () => {
		initSwiper();
	});
	window.addEventListener('resize', () => {
		initSwiper();
	});
})();