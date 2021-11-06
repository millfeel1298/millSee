"use strict";

(() => {
  // 요소
  const header = document.querySelector('.header');
  const headerContainer = document.querySelector('.header__container');
  const hamburgerMenuIco = document.querySelector('label[for="hamburger-menu-ico"]');
  const headerMobileNav = document.querySelector('.header__mobile-nav');
  const mobileMenuTits = document.querySelectorAll('.mobile-menu__tit');
  const mobileDownload = document.querySelector('.mobile-download');
  const mobileMenuIcos = document.querySelectorAll('.mobile-menu__ico');
  const mobileMenuDepth2 = document.querySelectorAll('.mobile-menu-depth2');
  const btnClose = document.querySelector('.btn--close');
  const tabMenu = document.querySelector('.tab-menu');
  const tabMenu_item = document.querySelectorAll('.tab-menu__item');
  const toTop = document.querySelector('.to-top');
  const inquiryBtn = document.querySelector('.content__inquiry .inquiry');
  const startBtn = document.querySelector('.content__start .start__btn');
  const siteMap = document.querySelector('.site-map');
  

  // 스타일 설정
  const headerHeight = '0.6rem';
  const aniTime_fast = 300;

  // 변수
  let didScroll = false;
  const delta = 5;
  let prevYOffset = 0;
  let currentYOffset = 0;
  const tabletSize = 1040;
  let browserWidth = 0;


  function setLayout(){
    browserWidth = innerWidth;
  }


  // 모바일 햄버거 버튼
  hamburgerMenuIco.addEventListener('click', () => {
    headerMobileNav.classList.toggle('show');

    // 모바일 메뉴 다운로드 위치 설정
    if (headerMobileNav.classList.contains('show')) {
      mobileDownload.style.left = '0';
    } else {
      mobileDownload.style.left = '100vw';
    }
  });

  // 모바일 메뉴 아코디언 
  mobileMenuTits.forEach(function (elem) {
    elem.addEventListener('click', toggleAccordion);
  });

  function toggleAccordion(event) {
    const currentTit = event.currentTarget;
    const currentIco = currentTit.lastElementChild;
    const currentContent = currentTit.nextElementSibling;

    // mobile-menu-depth2가 없을 경우
    if (!currentContent) return;

    // class 삭제
    if (currentContent.classList.contains('show')) {
      currentTit.classList.remove('active');
      currentIco.classList.remove('animated');
      currentContent.classList.remove('show');
    } else {
      mobileMenuTits.forEach(function (elem) {
        elem.classList.remove('active');
        elem.lastElementChild.classList.remove('animated');

        // mobile-menu-depth2가 없을 경우
        if (elem.nextElementSibling) {
          elem.nextElementSibling.classList.remove('show');
        } else {
          return;
        }
      });
      // class 추가
      currentTit.classList.add('active');
      currentIco.classList.add('animated');
      currentContent.classList.add('show');
    }
  }

  // header영역 스크롤 감지 이벤트
  window.addEventListener('scroll', () => {
    didScroll = true;

    toBottomHide();
  });

  // 스크롤 감지 
  setInterval(() => {
    // desktop 이벤트 방지
    if(browserWidth <= tabletSize) {
      if (didScroll) {
        hasScroll();
        didScroll = false;
      }
    }
    return;
  }, aniTime_fast)

  // 스크롤 감지 설정
  function hasScroll() {
    currentYOffset = window.pageYOffset;

    // 스크롤 delta이하 이벤트 방지 
    if (Math.abs(prevYOffset - currentYOffset) <= delta) {
      return;
    }

    // 스크롤 감지
    if (prevYOffset < currentYOffset && delta < currentYOffset) {
      header.classList.add('header--hide');
    } else if (currentYOffset < document.body.offsetHeight - window.innerHeight){
      header.classList.remove('header--hide');
    }
    
    prevYOffset = currentYOffset;
  }

  // 탭 슬라이드 메뉴 클릭시 active 생성
  tabMenu.addEventListener('click', (event) => {
    let target = event.target;
    const tabMenuItem = event.target.closest('.tab-menu__item');
    
    if(!tabMenu.contains(tabMenuItem)) return;
    if(!tabMenuItem) return;

    tabMenu_item.forEach((elem, index) => {
      tabMenu_item[index].classList.remove('active');
    });

    event.target.classList.add('active');
  });
  
  // 클릭시 엘리먼트 삭제하기
  btnClose.onclick = () => {
    const elem = btnClose.closest('.content__front-banner')
    if(elem) elem.remove();
  }

  // 상단으로 올라가는 버튼
  toTop.onclick = () => {
    let timer = setInterval(() => {
      window.scrollBy(0, -100);
      if(window.pageYOffset < 0){
        clearInterval(timer);
      }
    }, 20);
  }

  // 말풍선 클릭시 부모에게 active 붙고,
  inquiryBtn.addEventListener('click', (event) => {
    const elemParent = event.target.closest('.content__inquiry .inquiry');
    if(elemParent){
      elemParent.classList.toggle('active');
    }
  });

  // 일정 구간에서 엘리먼트 숨기기
  function toBottomHide(){
    const elemoffsetHeight = (toTop.offsetTop - window.innerHeight) + (toTop.offsetHeight * 3);
    if(elemoffsetHeight < window.pageYOffset){
      inquiryBtn.parentElement.style.display = 'none';
    } else {
      inquiryBtn.parentElement.style.display = 'block';
    }
  }

  siteMap.addEventListener('click', allAccordion);

  // footer 아코디언
  function allAccordion(event){
    const target = event.target;
    const elem = target.closest('li');
    const elems = elem.parentElement.children;

    if(elem.classList.contains('active')){
      console.log(elem)
      elem.classList.remove('active')
      return
    }
    for(let i = 0; i < elems.length; i++){
      elems[i].classList.remove('active');
    }
      
    elem.classList.add('active');
  }

  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout);
})();