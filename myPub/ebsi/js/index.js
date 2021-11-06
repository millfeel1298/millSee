(() => {
  const breakPC = 1024;
  const breakTA = 720;
  const $bl_gnb = document.querySelector('.bl_gnb');
  const $ly_nav_body = document.querySelector('.ly_nav_body');
  const $bl_gnbDepth2s = document.querySelectorAll('.bl_gnbDepth2');
  const $bl_gnb_bg = document.querySelector('.bl_gnb_bg');
  const $bl_hamburgeMenu = document.querySelector('.bl_hamburgeMenu');
  const $bl_hamburgeTabList = document.querySelector('.bl_hamburgeTabList');
  const $bl_search_wrap = document.querySelector('.bl_search_wrap');
  const $bl_search_input = document.querySelector('.bl_search_input');
  const $un_danchoo_btn = document.querySelector('.un_danchoo_btn');
  const $bl_popBanner_close = document.querySelector('.bl_popBanner_close');


  // 배열요소 중에서 가장 높은 값을 찾아서 반환
  function arrEl_Find_maxHeight(arr) {
    let maxHeight = 0;
    for (let i = 0; i < arr.length; i++) {
      maxHeight = Math.max(maxHeight, arr[i].offsetHeight);
    }
    return maxHeight;
  }

  // gnb hover event
  $ly_nav_body.addEventListener('mouseover', function (e) {
    this.classList.add('is_show');
    $bl_gnb_bg.style.top = `${$ly_nav_body.offsetHeight - 1}px`;
    $bl_gnb_bg.style.height = `${arrEl_Find_maxHeight($bl_gnbDepth2s)}px`;
    $bl_gnb_bg.style.borderWidth = '1px';
  })
  $ly_nav_body.addEventListener('mouseleave', function (e) {
    this.classList.remove('is_show');
    $bl_gnb_bg.style.height = '0';
    $bl_gnb_bg.style.borderWidth = '0';
  })

  // Gnb menu click event
  $bl_gnb.addEventListener('click', function (e) {
    const arr = this.children;
    const target = e.target;
    const parentElem = target.closest('.bl_gnb_item');
    for (let i = 0; i < arr.length; i++) {
      arr[i].classList.remove('is_active');
    }

    if (!parentElem) return;
    parentElem.classList.add('is_active');
    console.log(target)
  });

  // 햄버거 버튼을 클릭하면 모바일 메뉴가 나타난다.
  document.querySelector('.bl_hamburgerBtn').onclick = function () {
    document.querySelector('.el_dim').classList.add('is_active');
    let left = -100;
    let value = setInterval(count,1);

    function count() {
      if (left === 0) {
        clearInterval(value);
      } else {
        $bl_hamburgeMenu.style.left = `${++left}%`;
      }
    }
  }

  // 모바일 메뉴의 닫기 버튼을 누르면 모바일 메뉴가 닫힌다.
  document.querySelector('.bl_hamburgeMenu_closeBtn').onclick = function () {
    document.querySelector('.el_dim').classList.remove('is_active');
    let left = 0;
    let value = setInterval(count, 1);

    function count() {
      if (left === -100) {
        clearInterval(value);
      } else {
        $bl_hamburgeMenu.style.left = `${--left}%`;
      }
    }
  }

  // 검색 input 클릭시 자동완성 박스가 열리고
  // 박스 외의 공간을 클릭하면 닫힌다.
  function bl_search_wrap_autoComplete(e) {
    const $bl_search_wrap = document.querySelector('.bl_search_wrap');
    const target = e.target;
    const parentElem = target.closest('.bl_search_wrap');

    if (target.classList.contains('bl_search_input')) {
      $bl_search_wrap.classList.toggle('is_active');
    }
    if (target.classList.contains('bl_search_wrap_autoComplete')) return;
    if (!parentElem) {
      $bl_search_wrap.classList.remove('is_active');
    }
  }

  // 햄버거 메뉴 tap 기능
  $bl_hamburgeTabList.addEventListener('click', function (e) {
    const arr = this.children;
    const target = e.target;
    const parentElem = target.closest('.bl_hamburgeTabList_item');
    for (let i = 0; i < arr.length; i++) {
      arr[i].classList.remove('is_active');
    }

    if (!parentElem) return;
    parentElem.classList.add('is_active');
  });

  // 단추 버튼: 클릭시 is_active 추가 / 삭제
  $un_danchoo_btn.addEventListener('click', function (e) {
    const target = e.target;
    const parentElem = target.closest('.un_danchoo');
    parentElem.classList.toggle('is_active')
  })

  // popBanner click시 display: none
  $bl_popBanner_close.addEventListener('click', function (e) {
    e.preventDefault();
    this.closest('.bl_popBanner').style.display = 'none';
  })

  window.addEventListener('click', function (e) {
    bl_search_wrap_autoComplete(e);
  });
})();