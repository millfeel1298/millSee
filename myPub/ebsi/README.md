ebsi 기술 상세서
===
## 01. HTML5
### @ Block
### @ Element
#### [ 재사용 ]
<img src="https://user-images.githubusercontent.com/61076742/140642304-bafa3288-211e-488f-9089-495b7eb93ce6.png" height="40">
회원가입 페이지에서 위와 같은 디자인을 만났습니다. <br>
<b>millSee는 어떤 방법으로 재사용을 할까요?</b>

<img scr="https://user-images.githubusercontent.com/61076742/140642569-772a4687-5a85-4b00-9876-d2ac0ceaed12.png" height="40">

index.html에서 GNB 영역에 있는 링크 





## 02. CSS3

## 03. JS
### 01-01. 스크롤 이벤트 - Current Scene 설정
<img src="https://user-images.githubusercontent.com/61076742/140637567-bae1b7e8-4e86-4251-b94f-c98dde086471.gif" height="400">

#### &#64; Scene의 높이 값 배열에 저장하기
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

#### &#64; Scene 높이 값을 활용해 Load시 Current Scene 찾기
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
    
#### &#64; Scene 높이 값을 활용해 Scroll했을  Current Scene 찾기
    
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
        if (curScene < 0) {
            return curScene = 0;
        }
            --curScene
    }

    document.body.removeAttribute('class');
    document.body.classList.add(`js_scene_${curScene}`);
}
```
Load에서는 위 -> 아래로 흐르는 일방통행었기 때문에 Scene의 높이 값을 축척해 scrollY와 비교해주면 비교적 쉽게 얻을 수 있었습니다.
하지만 scroll의 경우 양방향으로 움직일 수 있기 때문에 이전의 높이 값(prev_height)과 축척된 높이 값(total_height)값이 필요합니다.

prev_height < scrollY < total_height <br>
&nbsp;&nbsp;이전값 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  유지 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 다음값 <br>
    <br>
위의 비교식처럼 상태를 유지하면 curScene의 값이 유지되지만, scrollY의 값이 total_height보다 크면 curScene이 증가합니다.
반대로 scrollY 값이 prev_height 값보다 작으면 감소합니다. <br>
그리고 curScene이 0보다 작아질 경우 0으로 설정하는 이유는 스크롤 속도가 빠르거나, 모바일에서 상단에 도착했을 때 음수 값이 될 수 있으므로, 음수 방지차원차 사용했습니다.
<br>
<br>
    <br>
#### &#64; Scene 높이 값을 활용해 Scroll했을  Current Scene 찾기
    
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
        if (curScene < 0) {
            return curScene = 0;
        }
            --curScene
    }

    document.body.removeAttribute('class');
    document.body.classList.add(`js_scene_${curScene}`);
}
```
Load에서는 위 -> 아래로 흐르는 일방통행었기 때문에 Scene의 높이 값을 축척해 scrollY와 비교해주면 비교적 쉽게 얻을 수 있었습니다.
하지만 scroll의 경우 양방향으로 움직일 수 있기 때문에 이전의 높이 값(prev_height)과 축척된 높이 값(total_height)값이 필요합니다.

prev_height < scrollY < total_height <br>
&nbsp;&nbsp;이전값 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  유지 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 다음값 <br>
    <br>
위의 비교식처럼 상태를 유지하면 curScene의 값이 유지되지만, scrollY의 값이 total_height보다 크면 curScene이 증가합니다.
반대로 scrollY 값이 prev_height 값보다 작으면 감소합니다. <br>
그리고 curScene이 0보다 작아질 경우 0으로 설정하는 이유는 스크롤 속도가 빠르거나, 모바일에서 상단에 도착했을 때 음수 값이 될 수 있으므로, 음수 방지차원차 사용했습니다.
<br>
<br>

-----------------------
<br>
    
### 01-02. 스크롤 이벤트 - Pagenation 설정
    
<img src="https://user-images.githubusercontent.com/61076742/140640759-c4cad147-4ac4-4add-a5f1-03dafa7647f9.gif" height="400">
#### &#64; Scene의 갯수에 따라 Pagenation Dot 자동 생성
    
```javascript
function creation_pagenationDot() {
    // pagenation dot 자동 생성 & .bl_scene의 height 값을 배열에 저장
    for (let i = 0; i < scene_totals.length; i++) {
          const addElem = `<button class="bl_pagenation_dot" role="tab" aria-label="${i + 1} of ${scene_totals.length}" tabindex="" type="button"><span class="hp_a11y"></span></button>`;
          $bl_pagenation.insertAdjacentHTML('beforeend', addElem);
        }
    }
}
```
Load에서는 위 -> 아래로 흐르는 일방통행었기 때문에 Scene의 높이 값을 축척해 scrollY와 비교해주면 비교적 쉽게 얻을 수 있었습니다.
하지만 scroll의 경우 양방향으로 움직일 수 있기 때문에 이전의 높이 값(prev_height)과 축척된 높이 값(total_height)값이 필요합니다.

prev_height < scrollY < total_height <br>
&nbsp;&nbsp;이전값 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  유지 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 다음값 <br>
    <br>
위의 비교식처럼 상태를 유지하면 curScene의 값이 유지되지만, scrollY의 값이 total_height보다 크면 curScene이 증가합니다.
반대로 scrollY 값이 prev_height 값보다 작으면 감소합니다. <br>
그리고 curScene이 0보다 작아질 경우 0으로 설정하는 이유는 스크롤 속도가 빠르거나, 모바일에서 상단에 도착했을 때 음수 값이 될 수 있으므로, 음수 방지차원차 사용했습니다.
<br>
<br>
    
    
<br>
<br>
<br>
<br>


