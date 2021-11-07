ebsi 기술 상세서
===
## 01. HTML5
### @ Block
### @ Element
#### [ 재사용 ]
<img src="https://user-images.githubusercontent.com/61076742/140642304-bafa3288-211e-488f-9089-495b7eb93ce6.png" height="40">
회원가입 페이지에서 위와 같은 디자인을 만났습니다. <br>
<b>millSee는 어떤 방법으로 재사용을 할까요?</b>

<br><br>

![이미지 4](https://user-images.githubusercontent.com/61076742/140642631-6b136175-4b5f-4621-bc15-0ab4f8ed02f1.png)
<br><br>
index.html에서 GNB 영역에 있는 링크를 재사용하는 것을 보기 전에 재사용할 코드부터 확인하고 넘어가겠습니다.

```HTML
<a class="el_leftIconBtn" href="">5분 개념</a>
```
위와 같이 PRECSS를 사용하면, Calss Name을 통해 재사용 가능한 Element 요소이고, 아이콘이 왼쪽에 있으며 버튼 기능을 한다는 것을 알 수 있습니다.
<br><br>

```CSS
.el_leftIconBtn {
    display: inline-flex;
    align-items: center;
    background: transparent;
}

.el_leftIconBtn::before {
    display: inline-block;
    background-repeat: no-repeat;
    content: '';
}
```
Point는 before에 크기를 설정하지 않는 것입니다. 그 이유는, 아이콘의 크기가 일정하지 않을 확률이 크기 때문에 (일정하다면, 설정하는게 편하겠죠?)
재사용성을 위해 기본 크기 값을 설정하지 않았습니다.
<br><br>

```HTML
<!-- 예시 -->
<div class="bl_test">
    <a class="el_leftIconBtn el_leftIconBtn__time" href="">5분 개념</a>
</div>
```
위의 예시처럼 .bl_test에 el_leftIconBtn이 상속 돼 있다면
<br><br>

```CSS
<!-- 예시 -->
.bl_test .el_leftIconBtn::before {
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.4rem;
}

.bl_navConts .el_leftIconBtn__time::before {
    background-image: url(/myPub/ebsi/image/common/ico_gnb_time.png);
}
```
부모에게 중첩시켜 크기 설정과 이미지를 설정합니다. 이렇게 사용하는 이유는 사용에 대한 제한을 하는 것입니다.
<br><br>


<br></br>
본격적으로 재사용을 해 보겠습니다.

```HTML
<div class="bl_signUpAnno">
    <a class="el_leftIconBtn el_leftIconBtn__iconSet" href="">이용약관 (필수)</a>
</div>
```
부모의 이름이 바뀌고, icon에 사용할 이름이 변경되었습니다.
<br><br>

```CSS
.bl_signUpAnno .el_leftIconBtn {
    font-size: 2rem;
}

.bl_signUpAnno .el_leftIconBtn::before {
    width: 1.2rem;
    height: 2.2rem;
    margin-right: 0.4rem;
}

.bl_signUpAnno .el_leftIconBtn__iconSet::before {
    background-image: url(/myPub/ebsi/image/common/icon_set.png);
    background-size: 60rem 60rem;
    background-position: -58.8rem -57.6rem;
}
```
부모의 이름을 중접시켜서 사용에 제한을 주고, font-size, 크기, 이미지 설정을 해주었습니다.
결과물은 아래와 같습니다.
<br>
![image](https://user-images.githubusercontent.com/61076742/140644008-89b185e1-17f9-454c-a90a-1201bc8a1cdf.png)


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


