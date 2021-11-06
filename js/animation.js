(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
	let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
	let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
	let enterNewScene = false; // 새로운 scene이 시작된 순간 true
	let acc = 0.2;
	let delayedYOffset = 0;
	let rafId;
	let rafState;

  const sceneInfo = [{
    // scene_0
    type: 'sticky',
    heightNum: 1.5,
    scrollHeight: 0,
    objs: {
      container: document.querySelector('.js_scene_0'),
      aniElem_A: document.querySelector('.js_scene_0 .js_aniElem.a'),
      aniElem_B: document.querySelector('.js_scene_0 .js_aniElem.b'),
      aniElem_C: document.querySelector('.js_scene_0 .js_aniElem.c'),
    },
    values: {
      aniElem_A_opacity_out: [1, 0, { start: 0.1, end: 0.2 }],
      aniElem_B_opacity_out: [1, 0, { start: 0.2, end: 0.3 }],
      aniElem_C_opacity_out: [1, 0, { start: 0.3, end: 0.4 }],
      aniElem_A_translateY_out: [0, -20, { start: 0.1, end: 0.2 }],
      aniElem_B_translateY_out: [0, -60, { start: 0.2, end: 0.3 }],
      aniElem_C_translateY_out: [0, -20, { start: 0.3, end: 0.4 }],
    }
  },{
    // scene_1
    type: 'normal',
    scrollHeight: 0,
    objs: {
      container: document.querySelector('.js_scene_1'),
      aniElem_A: document.querySelector('.js_scene_1 .js_aniElem.a'),
      // aniElem_B: document.querySelector('.js_scene_1 .js_aniElem.b'),
      aniElem_C: document.querySelector('.js_scene_1 .js_aniElem.c'),
    },
    values: {
      aniElem_A_opacity_in: [0, 1, { start: 0, end: 0.04 }],
      aniElem_A_opacity_out: [1, 0, { start: 0.35, end: 0.5 }],

      aniElem_C_opacity_in: [0, 1, { start: 0, end: 0.04 }],
      aniElem_C_opacity_out: [1, 0, { start: 0.35, end: 0.5 }],
    }
  },{
    // scene_1
    type: 'normal',
    scrollHeight: 0,
    objs: {
      container: document.querySelector('.js_scene_2'),
    },
    values: {
    }
  },{
    // scene_2
    type: 'normal',
    scrollHeight: 0,
    objs: {
      container: document.querySelector('.js_scene_3'),
    },
    values: {
    }
  }];

  function setLayout() {
    // scene의 타입별 높이 sceneInfo.scrollHeight 할당
    // HTML scene에 높이 셋팅
    for (let i = 0; i < sceneInfo.length; i++) {
        if (sceneInfo[i].type === 'sticky') {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
        } else if (sceneInfo[i].type === 'normal')  {
            sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
        }
        sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset; 

    // load시 currentScene 설정
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
        totalScrollHeight += sceneInfo[i].scrollHeight;
        if (totalScrollHeight >= yOffset) {
            currentScene = i;
            break;
        }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);
}

  function playAnimation() {
		const objs = sceneInfo[currentScene].objs;
		const values = sceneInfo[currentScene].values;
		const currentYOffset = yOffset - prevScrollHeight;
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / scrollHeight;

    console.log(scrollRatio, currentScene)

		switch (currentScene) {
			case 0:
					// out
          objs.aniElem_A.style.opacity = calcValues(values.aniElem_A_opacity_out, currentYOffset);
					objs.aniElem_A.style.transform = `translate3d(0, ${calcValues(values.aniElem_A_translateY_out, currentYOffset)}%, 0)`;
          objs.aniElem_B.style.opacity = calcValues(values.aniElem_B_opacity_out, currentYOffset);
					objs.aniElem_B.style.transform = `translate3d(0, ${calcValues(values.aniElem_B_translateY_out, currentYOffset)}%, 0)`;
          objs.aniElem_C.style.opacity = calcValues(values.aniElem_C_opacity_out, currentYOffset);
					objs.aniElem_C.style.transform = `translate3d(0, ${calcValues(values.aniElem_C_translateY_out, currentYOffset)}%, 0)`;
				break;

        // case 1:
				// if (scrollRatio <= 0.1) {
				// 	// in
        //   objs.aniElem_A.style.opacity = calcValues(values.aniElem_A_opacity_in, currentYOffset);
				// 	// objs.aniElem_A.style.transform = `scale(${calcValues(values.aniElem_A_scale_in, currentYOffset)})`;
        //   objs.aniElem_C.style.opacity = calcValues(values.aniElem_C_opacity_in, currentYOffset);
				// 	// objs.aniElem_C.style.transform = `scale(${calcValues(values.aniElem_C_scale_in, currentYOffset)})`;
				// } else {
        //   // out
        //   objs.aniElem_A.style.opacity = calcValues(values.aniElem_A_opacity_out, currentYOffset);
        //   // objs.aniElem_B.style.opacity = calcValues(values.aniElem_B_opacity_out, currentYOffset);
        //   objs.aniElem_C.style.opacity = calcValues(values.aniElem_C_opacity_out, currentYOffset);
        // }
				// break;
		}
	}

	function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      document.querySelector('body').setAttribute('id', `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      enterNewScene = true;
      if (currentScene === 0) return;
      currentScene--;
      document.querySelector('body').setAttribute('id', `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;

    playAnimation();
  }

  function calcValues(values, currentYOffset) {
    let rv;
    // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;
  
    if (values.length === 3) {
      // start ~ end 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;
  
      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }
  
    return rv;
  }

  window.addEventListener('load', () => {
		setLayout(); // 중간에 새로고침 시, 콘텐츠 양에 따라 높이 계산에 오차가 발생하는 경우를 방지하기 위해 before-load 클래스 제거 전에도 확실하게 높이를 세팅하도록 한번 더 실행
    scrollLoop();  
    document.body.classList.remove('before-load');
      // setLayout();
      // sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);

  // 중간에서 새로고침 했을 경우 자동 스크롤로 제대로 그려주기
    //   let tempYOffset = yOffset;
    //   let tempScrollCount = 0;
    //   if (tempYOffset > 0) {
    //       let siId = setInterval(() => {
    //           scrollTo(0, tempYOffset);
    //           tempYOffset += 5;

    //           if (tempScrollCount > 20) {
    //               clearInterval(siId);
    //           }
    //           tempScrollCount++;
    //       }, 20);
    //   }

      window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
        // checkMenu();

        // if (!rafState) {
        //   rafId = requestAnimationFrame(loop);
        //   rafState = true;
        // }
      });

      // window.addEventListener('resize', () => {
      //   if (window.innerWidth > 900) {
      //   window.location.reload();
      // }
      // });

      // window.addEventListener('orientationchange', () => {
      // scrollTo(0, 0);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 500);
      // });

    //   document.querySelector('.loading').addEventListener('transitionend', (e) => {
    //     document.body.removeChild(e.currentTarget);
    // });

	});


})();