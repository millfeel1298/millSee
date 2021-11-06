$(function () {
  const breakPC = 1024;
  const breakTA = 720;
  const $bl_bestReview_pagination = $('.bl_bestReview_pagination');
  const $bl_bestReviewUnit = $('.bl_bestReviewUnit.slick');
  const $bl_profileUnit = $('.bl_profileUnit.slick');
  let slidesToScroll_value = 3;


  // Main Visual 페이지 번호 설정
  $('.bl_MV').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    const i = (currentSlide ? currentSlide : 0) + 1;
    $('.bl_MV_pagination').text(i + ' / ' + slick.slideCount);
  });


  // Main Visual slick 설정
  $('.bl_MV').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    dotsClass: 'bl_MV_dotWrap',
    prevArrow: "<button type='button' class='bl_MV_btn bl_MV_btn__prev slick-prev'><span class='hp_a11y'>이전</span></button>",
    nextArrow: "<button type='button' class='bl_MV_btn bl_MV_btn__next slick-next'><span class='hp_a11y'>다음</span></button>",
    autoplay: true,
    pauseOnHover: false,
    pauseOnDotsHover: true,
    responsive: [{
      breakpoint: breakPC,
      settings: {
        arrows: false,
      }
    }]
  });


  // Main Visual 정지 버튼
  $('.bl_MV_custBtn__pause').on('click', function () {
    $('.bl_MV').slick('slickPause');
    $(this).removeClass('is_on');
    $(this).next().addClass('is_on');
  });


  // Main Visual 재생 버튼
  $('.bl_MV_custBtn__play').on('click', function () {
    $('.bl_MV').slick('slickPlay');
    $(this).removeClass('is_on');
    $(this).prev().addClass('is_on');
  });


  // 이벤트 배너
  $('.bl_eveBnr').slick({
    dots: true,
    dotsClass: 'bl_eveBnr_dotWrap',
    arrows: false,
    autoplay: true,
  })
  
  
  // 베스트 수강후기
  $bl_bestReviewUnit.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    const i = (currentSlide ? (currentSlide / slidesToScroll_value) + 1 : 1);
    $bl_bestReview_pagination.text(i + ' / ' + slick.slideCount / slidesToScroll_value);
  });

  $bl_bestReviewUnit.slick({
    slidesToShow: slidesToScroll_value,
    slidesToScroll: slidesToScroll_value,
    dots: true,
    prevArrow: "<button type='button' class='bl_bestReview_btn bl_bestReview_btn_prev slick-prev'><span class='hp_a11y'>이전</span></button>", // 이전 화살표 모양 설정
    nextArrow: "<button type='button' class='bl_bestReview_btn bl_bestReview_btn_next slick-next'><span class='hp_a11y'>다음</span></button>", // 다음 화살표 모양 설정

    responsive: [{
        breakpoint: breakPC,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        }
      },
      {
        breakpoint: breakTA,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        }
      }
    ]
  });


  // 강좌의 핵심, EBS 선생님
  const $bl_profileUnit_slickOptions = {
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: false,
    arrows: false,

    responsive: [{
      breakpoint: breakTA,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
      }
    }]
  }

  // 대상의 위치 값을 찾아서 요소에 top, left값 적용하는 함수
  function setElePosition(ele, target, nthChild, property) { // ele: 값을 적용할 요소, target: 대상의 position 값, nthChild: 몇번째 자식, property: css 속성
    const target_top = target.css('top');
    let target_gap, target_left;

    if (!(nthChild === undefined)) {
      target_gap = target.children().eq(nthChild).css(property).replace(/[^-\d\.]/g, ''); // 간격
      target_left = target.offset().left + target.width() + Number(target_gap); // left
    } else {
      target_left = target.offset().left + target.width(); // left
    }

    ele.css({
      top: target_top,
      left: target_left
    });
  }
  
  $(window).on('load resize', function () {
    setElePosition($('.bl_MV_custBtnUnit'), $('.bl_MV_dotWrap'), 0, 'margin-right');
    
    if ($(window).width() >= breakPC) {
      $bl_profileUnit.filter('.slick-initialized').slick('unslick');
    } else {
      $bl_profileUnit.not('.slick-initialized').slick($bl_profileUnit_slickOptions);
    }
  });

  setElePosition($('.bl_MV_custBtnUnit'), $('.bl_MV_dotWrap'), 0, 'margin-right');
})