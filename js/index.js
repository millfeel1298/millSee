(() => {
  const brakePC = 1200;
  const brakeTablet = 600;
  const $el_dim = document.querySelector('.el_dim');
  const $bl_nav = document.querySelector('.bl_nav');
  const $bl_nav_links = document.querySelectorAll('.bl_nav_link');
  const $bl_moNav = document.querySelector('.bl_moNav');
  const $bl_textSlide = document.querySelector('.bl_textSlide');
  const scene_totals = document.querySelectorAll('.bl_scene');
  let curIdx = 0;
  let curScene = 0;
  let prevScroll = 0;
  let scene_heights = null;

  // .bl_burgerBtn 유무에 따라 실행 여부가 달라진다.
  if (document.querySelector('.bl_burgerBtn')) {
    const $bl_burgerBtn = document.querySelector('.bl_burgerBtn')

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
  }

  // .un_topBtn 유무에 따라 실행 여부가 달라진다.
  if (document.querySelector('.un_topBtn')) {
    const $un_topBtn = document.querySelector('.un_topBtn')
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
  }

  // 문서에 선택한 요소가 있으면 실행하고, 없으면 실행하지 않는다. - addEventListener은 제외, 함수만 사용 가능
  function set_eleUseCheck(ele, func) {
    if (document.querySelector(ele)) {
      const $ele = document.querySelector(ele);
      func($ele);
    }
  }

  // 텍스트 슬라이드 - 첫번째 요소 복제 삽입
  function textSlide_eleCreation(ele) {
    const firstChild = $bl_textSlide.firstElementChild.cloneNode(true);
    $bl_textSlide.append(firstChild)

    // 슬라이드 아이템 갯수 재정의
    children = $bl_textSlide.children;

    // 슬라이드 아이템 높이값 할당
    for (let i = 0; i < children.length; i++) {
      children[i].style.transform = `translate3d(0, ${i * 100}%, 0)`;
    }

    textSlide_timer(children);
  }

  // 텍스트 슬라이드 타이머
  function textSlide_timer() {
    const $bl_textSlide_spped = 1000;

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

    // 메인 텍스트 슬라이드 - 클릭시 멈춤
    $bl_textSlide.addEventListener('click', function (e) {
      clearInterval(setTextSlide_timer);
    })
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
  function creation_pagenationDot(ele) {
    // pagenation dot 자동 생성 & .bl_scene의 height 값을 배열에 저장
    for (let i = 0; i < scene_totals.length; i++) {
      const addElem = `<button class="bl_pagenation_dot" role="tab" aria-label="${i + 1} of ${scene_totals.length}" tabindex="" type="button">
                      <span class="hp_a11y"></span>
                    </button>`;
      ele.insertAdjacentHTML('beforeend', addElem);
    }
  }

  // Pagenation curScene 업데이트, 웹 접근성 준수 
  function set_curPagenation(ele) {
    for (let i = 0; i < ele.children.length; i++) {
      ele.children[i].setAttribute('tabindex', -1);
      ele.children[i].classList.remove('is_active');
    }
    ele.children[curScene].classList.add('is_active');
    ele.children[curScene].setAttribute('tabindex', '0');
  }

  // 네비게이션 curScene 업데이트
  // function set_curNav() {
  //   const $bl_moManu_links = document.querySelectorAll('.bl_moManu_link');

  //   for (let i = 0; i < $bl_pagenation.children.length - 1; i++) {
  //     $bl_moManu_links[i].classList.remove('is_active');
  //   }

  //   if (curScene !== 0) {
  //     $bl_moManu_links[curScene - 1].classList.add('is_active');
  //   } else {
  //     return;
  //   }
  // }

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
    set_eleUseCheck('.bl_pagenation', set_curPagenation);
    // set_curNav();
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
    set_eleUseCheck('.bl_pagenation', set_curPagenation);
    // set_curNav();
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
      ele.classList.add('is_hide');
    } else {
      ele.classList.remove('is_hide');
    }
  }

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
    set_eleUseCheck('.bl_textSlide_wrap', textSlide_eleCreation);
    set_eleUseCheck('.bl_pagenation', creation_pagenationDot);
    set_sceneHeight();
    set_curScene_idx();
    set_scroll_curScene();
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
    set_eleUseCheck('.el_scroll_induce', scroll_induce_hide);
    scroll_topBtn_show();
    scroll_nav_show();
    set_scroll_curScene();
    ani_scroll_winCoor();

    if (window.outerWidth > brakePC) {
      ani_scroll_curScene();
    } else {
      scroll_header_show();
    }
  });
})();