"use strict";

(() => {
  const commTabMenu_container = document.querySelector('.tab__communi .tab-menu__container');
  const commTabMenu_item = document.querySelectorAll('.tab__communi .tab-menu__item');
  const busiTabMenu_container = document.querySelector('.tab__business .tab-menu__container');
  const busiTabMenu_item = document.querySelectorAll('.tab__business .tab-menu__item');
  const tabletSize = 1040;
  let browserWidth = 0;

  function setLayout() {
    browserWidth = innerWidth;
  }

  // 탭 슬라이드
  $(document).ready(function () {
    // 메인 슬라이드
    var slide = new Swiper('.main-slide', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.main-slide__pagination',
        clickable: true,
      },
      autoplay: {
        delay: 10000,
      },
    });

    // 커뮤니케이션 탭
    const tabMenu_communi = new Swiper('.tab__communi .tab-menu', {
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.tab__communi .tab-menu--next',
        prevEl: '.tab__communi .tab-menu--prev',
      },
    })

    const tabContent_communi = new Swiper('.tab__communi .tab-content', {
      navigation: {
        nextEl: '.tab__communi .tab-content--next',
        prevEl: '.tab__communi .tab-content--prev',
      },
      effect: 'fade',
      pagination: {
        el: '.tab__communi .pagination--default',
        clickable: true,
      },
      fadeEffect: {
        crossFade: true
      },
      on: {
        progress: function (swiper, progress) {
          commTabMenu_item.forEach((elem, index) => {
            commTabMenu_item[index].classList.remove('active');
          });

          for (let i = 1; i <= commTabMenu_item.length; i++) {
            let slideWidth = 1 / commTabMenu_item.length;
            if (progress <= slideWidth * i) {
              commTabMenu_item[i - 1].classList.add('active');

              if (browserWidth <= tabletSize) {
                if (commTabMenu_item[i - 1].dataset.slideIndex === '0') {
                  commTabMenu_container.style.transform = `translate3d(0, 0, 0)`;
                } else if (commTabMenu_item[i - 1].dataset.slideIndex === '1') {
                  commTabMenu_container.style.transform = `translate3d(-100px, 0, 0)`;
                } else if (commTabMenu_item[i - 1].dataset.slideIndex === '2') {
                  commTabMenu_container.style.transform = `translate3d(-150px, 0, 0)`;
                }
              }
              return;
            }
          }
        }
      }
    })

    $('.tab__communi .swiper-slide').on('click', function (event) {
      const target = Number(event.target.dataset.slideIndex);
      tabContent_communi.slideTo($(this).data('slide-index'));
    })


    // 비즈니스 탭
    const tabMenu_business = new Swiper('.tab__business .tab-menu', {
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.tab__business .tab-menu--next',
        prevEl: '.tab__business .tab-menu--prev',
      },
    })

    const tabContent_business = new Swiper('.tab__business .tab-content', {
      navigation: {
        nextEl: '.tab__business .tab-content--next',
        prevEl: '.tab__business .tab-content--prev',
      },
      effect: 'fade',
      pagination: {
        el: '.tab__business .pagination--default',
        clickable: true,
      },
      fadeEffect: {
        crossFade: true
      },
      on: {
        progress: function (swiper, progress) {
          busiTabMenu_item.forEach((elem, index) => {
            busiTabMenu_item[index].classList.remove('active');
          });

          for (let i = 1; i <= busiTabMenu_item.length; i++) {
            let slideWidth = 1 / busiTabMenu_item.length;
            if (progress <= slideWidth * i) {
              busiTabMenu_item[i - 1].classList.add('active');

              if (browserWidth <= tabletSize) {
                if (busiTabMenu_item[i - 1].dataset.slideIndex === '0') {
                  busiTabMenu_container.style.transform = `translate3d(0, 0, 0)`;
                } else if (busiTabMenu_item[i - 1].dataset.slideIndex === '1') {
                  busiTabMenu_container.style.transform = `translate3d(-50px, 0, 0)`;
                } else if (busiTabMenu_item[i - 1].dataset.slideIndex === '2') {
                  busiTabMenu_container.style.transform = `translate3d(-100px, 0, 0)`;
                } else if (busiTabMenu_item[i - 1].dataset.slideIndex === '3') {
                  busiTabMenu_container.style.transform = `translate3d(-150px, 0, 0)`;
                } else if (busiTabMenu_item[i - 1].dataset.slideIndex === '6') {
                  busiTabMenu_container.style.transform = `translate3d(-110px, 0, 0)`;
                }
              }
              return;
            }
          }
        }
      }
    })

    $('.tab__business .swiper-slide').on('click', function (event) {
      const target = Number(event.target.dataset.slideIndex);
      tabContent_business.slideTo($(this).data('slide-index'));
    })

    // 슬라이드 Per View
    var clientSlide = new Swiper('.client-slide', {
      slidesPerView: 1.25,
      spaceBetween: 26,
      breakpoints: {
        600: {
          spaceBetween: 48,
        },
        1040: {
          touchRatio: 0,
          slidesPerView: 3,
        }
      },
      centeredSlides: true,
      loop: true,
      pagination: {
        el: '.client-pagination',
        clickable: true,
      },
    });
  })





  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout);
})()