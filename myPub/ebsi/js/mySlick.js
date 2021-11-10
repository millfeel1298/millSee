$(function () {
  const breakPC = 1024;
  const breakTA = 720;
  
  // 듀나 TV - 서브페이지
  $('.bl_ebskTvSlide_slide').slick({
    infinite: true, //무한 반복 옵션	 
    slidesToShow: 1, // 한 화면에 보여질 컨텐츠 개수
    slidesToScroll: 1, //스크롤 한번에 움직일 컨텐츠 개수
    arrows: true, // 옆으로 이동하는 화살표 표시 여부 (기본값: true)
    prevArrow: "<button type='button' class='bl_ebskTvSlide_prev'><span class='hp_a11y'>Previous</span></button>", // 이전 화살표 모양 설정
    nextArrow: "<button type='button' class='bl_ebskTvSlide_next'><span class='hp_a11y'>Next</span></button>", // 다음 화살표 모양 설정
    draggable: true, //드래그 가능 여부 
  });
})