millSee 기술 상세서
===
## 01. JS
### 01-01. 스크롤 이벤트
#### &#64; Current Scene 설정 - Scene의 높이 값 배열에 저장하기
<img src="https://user-images.githubusercontent.com/61076742/140637567-bae1b7e8-4e86-4251-b94f-c98dde086471.gif" height="400">

```javascript
const scene_totals = document.querySelectorAll('.bl_scene');

function set_sceneHeight() {
    scene_heights = [];
    for (let i = 0; i < scene_totals.length; i++) {
      scene_heights.push(scene_totals[i].clientHeight);
    }
    return scene_heights;
}
```
문서에서 .bl_scene 요소를 모두 찾아 높이 값을 scene_heights 배열에 저장하고, set_sceneHeight 함수를 호출시 배열을 반환합니다.   
<br>
<br>

#### &#64; Current Scene 설정 - Scene 높이 값을 활용해 Load시 Current Scene 찾기
```javascript
function set_curScene_idx() {
    const scene_heights = set_sceneHeight();
    let total_height = 0;

    for (let i = 0; i < scene_totals.length; i++) {
        total_height += scene_heights[i];
        if (window.scrollY > total_height) {
            curScene++;
        } else {
            break;
        }
    }
    document.body.classList.add(`js_scene_${curScene}`);
}
```
위에서 얻은 전체 .bl_scene의 높이의 배열 값을 활용해서 load시 현재의 scrollY의 값과 scene의 높이 값을 for문을 통해 비교합니다.
scrollY의 값이 크면 Current Scene의 값이 증가하고, 값이 작으면 for문이 종료됩니다.
<body> class에 Current Scene 값을 넣어 "선택된 Scene이면 실행된다.(또는 실행되지 않는다.)"로 활용할 수 있습니다.
<br>
<br>
<br>
    
#### &#64; Current Scene 설정 - Scene 높이 값을 활용해 Scroll했을  Current Scene 찾기
    
```javascript
function set_scroll_curScene() {
    const scene_heights = set_sceneHeight();
    let prev_height = 0;
    let total_height = 0;

    for (let i = 0; i <= curScene; i++) {
        total_height += scene_heights[i];
        prev_height = total_height - scene_heights[i];
    }

    if (window.scrollY > total_height) {
          curScene++
    }

    if (window.scrollY < prev_height) {
        if (curScene === 0) {
            return curScene = 0;
        }
            --curScene
    }

    document.body.removeAttribute('class');
    document.body.classList.add(`js_scene_${curScene}`);
}
```
Load에서는 위 -> 아래로 흐르는 일방통행이기 때문에 Scene의 높이 값을 축척해서 scrollY과 비교해주면 비교적 쉽게 얻을 수 있었습니다.
하지만 scroll의 경우 양방향으로 움직일 수 있기 때문에 이전의 높이 값(prev_height)과 축척된 높이 값(total_height)값이 필요합니다.

prev_height < scrollY < total_height <br>
이전값          유지      다음값
<br>
<br>
    
    
    
    
<br>
<br>
<br>
<br>
02. HTML5
---------
03. CSS3
---------

