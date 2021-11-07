(() => {
  const brakePC = 1200;
  const brakeTablet = 600;
  const $bl_burgerBtn = document.querySelector('.bl_burgerBtn');
  const $el_dim = document.querySelector('.el_dim');
  const $bl_nav = document.querySelector('.bl_nav');
  const $bl_nav_links = document.querySelectorAll('.bl_nav_link');
  const $bl_pagenation = document.querySelector('.bl_pagenation');
  const $bl_moNav = document.querySelector('.bl_moNav');
  const $un_topBtn = document.querySelector('.un_topBtn');
  const scene_totals = document.querySelectorAll('.bl_scene');
  const $bl_textSlide = document.querySelector('.bl_textSlide');
  const $bl_textSlide_spped = 1000;
  let children = null;
  let curIdx = 0;
  let curScene = 0;
  let prevScroll = 0;
  let scene_heights = null;


  // 메인 텍스트 슬라이드 - 무한반복
  const setTextSlide_timer = setInterval(() => {
    $bl_textSlide.style.transition = `${$bl_textSlide_spped}ms transform`;
    $bl_textSlide.style.transform = `translate3d(0, ${curIdx * -100}%, 0)`;
    curIdx++;

    if (curIdx === children.length - 1) {
      setTimeout(() => {
        $bl_textSlide.style.transition = 'none';
        $bl_textSlide.style.transform = `translate3d(0, 0%, 0)`;
        curIdx = 1;
      }, $bl_textSlide_spped * 2);
    }
  }, $bl_textSlide_spped);

  // 메인 텍스트 슬라이드
  function slide_mvEle_creation() {
    // 요소 복제, 삽입
    const firstChild = $bl_textSlide.firstElementChild.cloneNode(true);
    $bl_textSlide.append(firstChild)

    // 슬라이드 아이템 갯수 재정의
    children = $bl_textSlide.children;

    // 슬라이드 아이템 높이값 할당
    for (let i = 0; i < children.length; i++) {
      children[i].style.transform = `translate3d(0, ${i * 100}%, 0)`;
    }
  }

  // .bl_scene의 height 값을 배열에 저장
  function set_sceneHeight() {
    scene_heights = [];
    for (let i = 0; i < scene_totals.length; i++) {
      scene_heights.push(scene_totals[i].clientHeight);
    }
    return scene_heights;
  }

  // pagenation dot 자동 생성
  function creation_pagenationDot() {
    // pagenation dot 자동 생성 & .bl_scene의 height 값을 배열에 저장
    for (let i = 0; i < scene_totals.length; i++) {
      const addElem = `<button class="bl_pagenation_dot" role="tab" aria-label="${i + 1} of ${scene_totals.length}" tabindex="" type="button">
                      <span class="hp_a11y"></span>
                    </button>`;
      $bl_pagenation.insertAdjacentHTML('beforeend', addElem);

    }
  }

  // Pagenation curScene 업데이트, 웹 접근성 준수 
  function set_curPagenation() {
    for (let i = 0; i < $bl_pagenation.children.length; i++) {
      $bl_pagenation.children[i].setAttribute('tabindex', -1);
      $bl_pagenation.children[i].classList.remove('is_active');
    }
    $bl_pagenation.children[curScene].classList.add('is_active');
    $bl_pagenation.children[curScene].setAttribute('tabindex', '0');
  }

  // 네비게이션 curScene 업데이트
  function set_curNav() {
    const $bl_moManu_links = document.querySelectorAll('.bl_moManu_link');

    for (let i = 0; i < $bl_pagenation.children.length - 1; i++) {
      $bl_moManu_links[i].classList.remove('is_active');
    }

    if (curScene !== 0) {
      $bl_moManu_links[curScene - 1].classList.add('is_active');
    } else {
      return;
    }

  }

  // load시 현재의 curScene 설정
  function set_curScene_idx() {
    const scrollY = window.scrollY;
    const scene_heights = set_sceneHeight();
    let total_height = 0;


    for (let i = 0; i < scene_totals.length; i++) {
      total_height += scene_heights[i];
      if (scrollY > total_height) {
        curScene++;
      } else {
        break;
      }
    }

    document.body.classList.add(`js_scene_${curScene}`);
    set_curPagenation();
    set_curNav();
  }

  // scroll시 curScene 업데이트
  function set_scroll_curScene() {
    const scrollY = window.scrollY;
    const scene_heights = set_sceneHeight();
    let prev_height = 0;
    let total_height = 0;


    for (let i = 0; i <= curScene; i++) {
      total_height += scene_heights[i];
      prev_height = total_height - scene_heights[i];
    }

    if (scrollY > total_height) {
      curScene++
    }

    if (scrollY < prev_height) {
      if (curScene === 0) {
        return curScene = 0;
      }
      --curScene
    }

    document.body.removeAttribute('class');
    document.body.classList.add(`js_scene_${curScene}`);
    set_curPagenation();
    set_curNav();
  }

  // 자손 선택자들에게 스타일을 한꺼번에 사용할 때 사용
  function set_descClass(eles, prop, value) {
    for (let i = 0; i < eles.length; i++) {
      eles[i].setAttribute(prop, value)
    }
  }

  // 모바일, 태블릿 위로 스크롤시 header가 보이고 내리면 hide
  function scroll_header_show() {
    const $ly_header = document.querySelector('.ly_header');
    let curScroll = window.scrollY;

    if (prevScroll < curScroll) {
      if (curScroll < window.innerHeight) {
        return;
      }
      $ly_header.style.transform = `translate3d(0, -100%, 0)`;
    } else {
      $ly_header.style.transform = `translate3d(0, 0, 0)`;
    }
    prevScroll = curScroll;
  }

  // 스크롤 값에 따른 nav 디자인 변경
  function scroll_nav_show() {
    const scene_heights = set_sceneHeight();

    // 일반 nav
    if (window.outerWidth < brakePC) {
      $bl_nav.classList.add('is_hide');
      $bl_moNav.classList.add('is_show');
    } else {
      if (window.scrollY > scene_heights[0] - 200) {
        $bl_nav.classList.add('is_hide');
        set_descClass($bl_nav_links, 'display', 'none')
        setTimeout(() => {
          set_descClass($bl_nav_links, 'opacity', 0.5)
        }, 100);

        // 햄버거 모양 nav
        $bl_moNav.classList.add('is_show');
      } else {
        // 일반 nav
        $bl_nav.classList.remove('is_hide');
        set_descClass($bl_nav_links, 'opacity', 0)
        setTimeout(() => {
          set_descClass($bl_nav_links, 'display', 'block')
        }, 500);

        // 햄버거 모양 nav
        $bl_moNav.classList.remove('is_show');
      }
    }

  }

  // Scene의 스크롤을 기준으로 동작
  function ani_scroll_curScene() {
    const scene_heights = set_sceneHeight();
    let prev_height = 0;
    let prev_heights = [];
    let total_height = 0;

    for (let i = 0; i <= scene_heights.length - 1; i++) {
      total_height += scene_heights[i];
      prev_height = total_height - scene_heights[i];
      prev_heights.push(prev_height);
    }

    const curScene_scrollY = window.scrollY - prev_heights[curScene]; // 현재 씬의 scrollY
    const ratio = 100 / scene_heights[curScene]; // scrollY 백분률 비율
    const scrollPercent = ratio * curScene_scrollY; // scrollY 퍼센트
    const scene_children = document.querySelectorAll(`.bl_scene:nth-of-type(${curScene + 1}) .js_scrollEle`);

    if (scrollPercent > 0) {
      set_descClass(scene_children, 'display', 'block');
    }

    switch (curScene) {
      case 0:
        const $bl_mv_body_ttl = document.querySelector('.bl_mv_body .el_page_ttl');
        const $bl_mv_list = document.querySelector('.bl_mv_list');
        const $bl_mv_imgWrap = document.querySelector('.bl_mv_imgWrap');

        if (scrollPercent > 5) {
          $bl_mv_body_ttl.style.opacity = '0';
          $bl_mv_body_ttl.style.transform = `translate3d(0, -50px, 0)`;
        } else {
          $bl_mv_body_ttl.style.opacity = '1';
          $bl_mv_body_ttl.style.transform = `translate3d(0, 0, 0)`;
        }

        if (scrollPercent > 15) {
          $bl_mv_list.style.opacity = '0';
          $bl_mv_list.style.transform = `translate3d(0, -50px, 0)`;
        } else {
          $bl_mv_list.style.opacity = '1';
          $bl_mv_list.style.transform = `translate3d(0, 0, 0)`;
        }

        if (scrollPercent > 25) {
          $bl_mv_imgWrap.style.opacity = '0';
          $bl_mv_imgWrap.style.transform = `translate3d(0, -50px, 0)`;
        } else {
          $bl_mv_imgWrap.style.opacity = '1';
          $bl_mv_imgWrap.style.transform = `translate3d(0, 0, 0)`;
        }

        if (scrollPercent > 50) {
          set_descClass(scene_children, 'display', 'none')
        } // 100으로 설정하면 씬이 안넘어간 애매한 위치에서 새로고침시 잔상이 남는 이슈가 있어서 별도 설정 필요

        break;
    }

    // console.log(scrollPercent)
  }

  // 요소의 좌표값을 커트라인과 비교해서 bool값을 반환
  function boo_slide_top(ele, cut) {
    const top = ele.getBoundingClientRect().top;
    return (window.innerHeight - top > cut) ? true : false;
  }

  // 요소의 브라우저 창의 좌표값을 기준으로 동작
  function ani_scroll_winCoor() {
    const $js_coorEles = document.querySelectorAll('.js_coorEle');

    for (let i = 0; i < $js_coorEles.length; i++) {
      if (boo_slide_top($js_coorEles[i], 40)) {
        $js_coorEles[i].style.opacity = '1';
        $js_coorEles[i].style.transform = `translate3d(0, 0px, 0)`;
      } else {
        $js_coorEles[i].style.opacity = '0';
        $js_coorEles[i].style.transform = `translate3d(0, 120px, 0)`;
      }
    }
  }

  // Top 버튼 스크롤 값에 따라 show 유무
  function scroll_topBtn_show() {
    if (window.scrollY > window.innerHeight) {
      $un_topBtn.classList.add('is_show');
    } else {
      $un_topBtn.classList.remove('is_show');
    }
  }

  // 스크롤 유도 아이콘 스크롤 값에 따라 hide
  function scroll_induce_hide() {
    const $el_scroll_induce = document.querySelector('.el_scroll_induce');
    const scene_heights = set_sceneHeight();
    let prev_height = 0;
    let prev_heights = [];
    let total_height = 0;

    for (let i = 0; i <= curScene; i++) {
      total_height += scene_heights[i];
      prev_height = total_height - scene_heights[i];
      prev_heights.push(prev_height);
    }

    const last_idx = prev_heights.length - 1;

    if (document.body.classList.contains('js_scene_4')) {
      $el_scroll_induce.classList.add('is_hide');
    } else {
      $el_scroll_induce.classList.remove('is_hide');
    }
  }

  // 메인 텍스트 슬라이드 - 클릭시 멈춤
  $bl_textSlide.addEventListener('click', function (e) {
    clearInterval(setTextSlide_timer);
  })

  // 햄버거 버튼 클릭시 동작하는 이벤트
  $bl_burgerBtn.addEventListener('click', function () {
    this.parentElement.classList.toggle('is_active');
    this.parentElement.parentElement.classList.toggle('is_active');

    if (!$el_dim.classList.contains('is_show')) {
      $el_dim.classList.add('is_show');
      document.body.classList.add('hp_scrollDisable');
      $el_dim.style.display = 'block';
      set_scroll_disable();
      setTimeout(() => {
        $el_dim.style.opacity = '0.5';
      }, 100);
    } else {
      $el_dim.classList.remove('is_show');
      document.body.classList.remove('hp_scrollDisable');
      $el_dim.style.opacity = '0';
      set_scroll_able();
      setTimeout(() => {
        $el_dim.style.display = 'none';
      }, 500);
    }
  })

  // 페이지네이션 클릭시 씬의 위치로 이동
  $bl_pagenation.addEventListener('click', function (e) {
    // 버튼 외의 클릭은 모두 무시
    if (!e.target.classList.contains('bl_pagenation_dot')) return;

    const attr = e.target.getAttribute('aria-label');
    const scrollY = window.scrollY;
    const idx = attr[0] - 1;
    let totalHeight = 0;
    let totalHeight_arr = [];
    let timer = null;

    // 씬의 구간의 값을 배열로 저장
    for (let i = 0; i < scene_heights.length; i++) {
      if (i !== 0) {
        totalHeight += scene_heights[i - 1];
        totalHeight_arr.push(totalHeight);
      } else {
        totalHeight_arr.push(0)
      }
    }

    // 위로 올라가는 경우 - 스크롤링
    if (scrollY < totalHeight_arr[idx]) {
      const speed = 10;
      let height = totalHeight_arr[idx] - scrollY;
      const num = 20;
      let value = (height + 50) / num; // 높이 값을 제대로 인식 못해서 +50
      let count = 0

      setInterval(() => {
        if (count < num) {
          count++;
          window.scrollBy(0, value);
        } else {
          clearInterval(timer)
        }
      }, speed);
    }

    // 아래로 내려가는 경우 - 스크롤링
    if (scrollY > totalHeight_arr[idx]) {
      const speed = 10;
      let height = scrollY - totalHeight_arr[idx];
      const num = 20;
      let value = (height - 50) / num; // 높이 값을 제대로 인식 못해서 +50
      let count = 0

      setInterval(() => {
        if (count < num) {
          count++;
          window.scrollBy(0, -value);
        } else {
          clearInterval(timer)
        }
      }, speed);
    }

    // set_curScene_idx();
  });

  // Top버튼 클릭시 상단으로 올라가는 이벤트
  $un_topBtn.addEventListener('click', () => {
    let timer = setInterval(() => {
      if (window.scrollY > 0) {
        window.scrollBy(0, -1000);
      } else {
        clearInterval(timer);
      }
    }, 50);
  });

  // IOS 스크롤 방지 
  function set_scroll_disable() {
    const $body = document.body;
    $body.addEventListener('scroll', (e) => {
      e.preventDefault()
    });
    $body.addEventListener('touchmove', (e) => {
      e.preventDefault()
    });
    $body.addEventListener('mousewheel', (e) => {
      e.preventDefault()
    });
    $body.classList.add('hp_scrollDisable');
  }

  // IOS 스크롤 방지 해제
  function set_scroll_able() {
    const $body = document.body;
    $body.removeEventListener('scroll', (e) => {
      e.preventDefault()
    });
    $body.removeEventListener('touchmove', (e) => {
      e.preventDefault()
    });
    $body.removeEventListener('mousewheel', (e) => {
      e.preventDefault()
    });
    $body.classList.remove('hp_scrollDisable');
  }

  window.addEventListener('DOMContentLoaded', () => {
    creation_pagenationDot();
    set_sceneHeight();
    set_curScene_idx();
    set_scroll_curScene();
    slide_mvEle_creation();
    scroll_nav_show();
  });

  window.addEventListener('resize', () => {
    set_sceneHeight();
    scroll_nav_show();
    set_sceneHeight();
    if (window.outerWidth > brakePC) {
      ani_scroll_curScene();
    }
  })

  window.addEventListener('scroll', () => {
    scroll_topBtn_show();
    scroll_nav_show();
    scroll_induce_hide();
    set_scroll_curScene();
    ani_scroll_winCoor();

    if (window.outerWidth > brakePC) {
      ani_scroll_curScene();
    } else {
      scroll_header_show();
    }
  });
})();
