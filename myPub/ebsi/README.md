ebsi 기술 상세서
===
## 01. HTML5
### @ Nameing 규칙
millSee는 PRECSS라는 네이밍 규칙을 사용하고 있습니다.
PRECSS란, 모든 Class에 이름에 역할을 의미하는 두글자의 Prefix(접두어)를 붙이는 것이 특징으로 OOCSS, SMACSS, BEM에 많은 영향을 받았다고 합니다. <br>

#### Q 어떤 장점이 있나요?
<img src="https://user-images.githubusercontent.com/61076742/140693138-d7cee9c0-1f4a-420d-96aa-5af2353bf335.png" height="500"/><br><br>
- 특성을 쉽게 파악할 수 있습니다. (ly_ 레이아웃, bl_ 블록, el_ 엘리먼트, un_ 유니크 등)
- 영향 범위를 지나치게 넓히지 않습니다. (CSS는 JS와 비교하면 전체가 전역 객체와도 같습니다. 원활한 관리를 위해선 사용 범위에 적당한 제한을 주고 있습니다.)
- 부모의 이름을 상속받아 사용 범위를 쉽게 파악할 수 있습니다.
- 형태, 기능, 역할을 쉽게 파악할 수 있습니다.
- 멀티 클래스를 채용해 확장하기 쉽습니다.

<br><br> 
---

### @ Block
Block이란, 특정한 콘텐츠에 의존하지 않으며 어디에서도 재사용할 수 있는 모듈입니다.

#### [ 확장 ]
<img src="https://user-images.githubusercontent.com/61076742/140684024-bc078e3b-ef82-46db-8fa0-ff441a3e3791.png" width="33.3%" /><img src="https://user-images.githubusercontent.com/61076742/140684035-47eadbb8-c4ca-45ce-8f26-0dba1742c5fe.png" width="33.3%" /><img src="https://user-images.githubusercontent.com/61076742/140684039-aeb8dec4-5670-489c-a82d-481851a451ef.png" width="33.3%" /><br><br>
확장에 대한 설명을 하기 위해서 위 3가지의 이미지의 공통점과 다른점을 살펴보고 진행하도록 하겠습니다.<br><br>
[공통점]
- title은 전체 Page에서 공통으로 사용하는 Style
- 모든 형태가 list를 이루고 있다.
- 컨텐츠 구조는 모두 동일하다.
<br><br>   

[다른점]
- 더보기가 on / off로 나누어져 있다.
- border는 on/off로 나누어져있다.
- 블릿의 유무
- 라벨의 유무
- 가로 정령 & 세로 정렬

<br>

```HTML
<div class="bl_board_wrap">
    <h2 class="el_pageLv2Ttl">알림방</h2>
    <ul class="bl_board bl_board__border_2pxSolid000">
      <li class="bl_board_item bl_board_item__lst_disc">
        <a class="bl_board_link bl_board__flex" href="">
          <div class="bl_board_label bl_board_label__notice">공지</div>
          <div class="bl_board_ttl hp_textOmit">[당첨자발표] 9월 학모평 풀채점 이벤트</div>
          <div class="bl_board_date">21.09.29</div>
        </a>
      </li>
    </ul>
    <a class="bl_board_more" href="">더보기</a>
</div>
```
[공통된 스타일에 다른점 보완하기]
- 더보기가 on / off로 나누어져 있다. -> <b>더보기는 컨텐츠이기 때문에 필요 없으면 삭제하면 됨.</b>
- border는 on/off로 나누어져있다. -> <b>.bl_board__border_2pxSolid000를 통해서 on / off 가능.</b>
- 블릿의 유무 -> <b>.bl_board_item__lst_disc를 사용해 on / off 가능.</b>
- 라벨의 유무 -> <b>.bl_board_label 사용해 on / off 가능, __notice로 상태를 추가해 아이콘 변경 가능.</b>
- 가로 정령 & 세로 정렬 -> <b>.bl_board__flex를 붙이면 가로 정렬, 삭제하면 세로 정렬이 됨.</b>

<br>

<b> 이러한 방법으로 하나의 공통 스타일을 설계해 확장하기 쉬운 코드를 설계하도록 millSee는 노력하고 있습니다.</b>

<br><br> 
---

### @ Element
Element란, 모듈의 최소 단위로 어디에나 삽입 가능한 모듈입니다.

#### [ 확장 ]
<img src="https://user-images.githubusercontent.com/61076742/140642304-bafa3288-211e-488f-9089-495b7eb93ce6.png" height="40">
회원가입 페이지에서 위와 같은 디자인을 만났습니다. <br>
<b>millSee는 어떤 방법으로 확장을 할까요?</b>

<br><br>

![이미지 4](https://user-images.githubusercontent.com/61076742/140642631-6b136175-4b5f-4621-bc15-0ab4f8ed02f1.png)
<br><br>
index.html에서 GNB 영역에 있는 링크를 확장하는 것을 보기 전에 확장할 코드부터 확인하고 넘어가겠습니다.

```HTML
<a class="el_leftIconBtn" href="">5분 개념</a>
```
위와 같이 PRECSS를 사용하면, Calss Name을 통해 확장 가능한 Element 요소이고, 아이콘이 왼쪽에 있으며 버튼 기능을 한다는 것을 알 수 있습니다.
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
확장을 하기 위해 기본 크기 값을 설정하지 않았습니다.
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
본격적으로 확장을 해 보겠습니다.

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
부모의 이름을 중접시켜서 사용에 제한을 주고, font-size, 크기, 이미지 설정을 해주었습니다.<br>
결과물은 아래와 같습니다.
<br><br>
![image](https://user-images.githubusercontent.com/61076742/140644008-89b185e1-17f9-454c-a90a-1201bc8a1cdf.png)

<br><br> 
---

### @ module 관리
<img src="https://user-images.githubusercontent.com/61076742/140695003-e1d76f3a-ed30-43ac-8818-37d15c37c97f.png" height="500" />
millSee는 확장이 필요한 요소들은 별도의 module 폴더에서 관리하고 있습니다. <br>
style, srcript는 같은 문서 안에 관리하고, 필요할 때 복사해서 사용합니다. <br>

<br> <br>

## 02. CSS3
### @ 그리드를 활용한 구현
<img src="https://user-images.githubusercontent.com/61076742/140700213-2cbd6f1d-cbbb-4d73-850e-66b1eccc37e3.png" height="500" /> <img src="https://user-images.githubusercontent.com/61076742/140700572-9b20711d-0588-4340-9134-ae9249301e31.png" height="500" />

<br>

디자인의 그리드를 체크한 뒤, 부트스트랩의 col을 채용해 반응형에 쉽게 대응하려고 노력했습니다.

### @ 반응형
ebsi 사이트는 모바일 퍼스트로 작업되었습니다.
- 모바일: 360 ~ 720
- 태블릿: 721 ~ 1024
- PC: 1024 ~

<br>
<img src="https://user-images.githubusercontent.com/61076742/140705755-20a6d895-6482-4973-bf23-bf28cd4b6b67.gif">

<br><br> 
---

### @ 애니메이션을 이용한 동작
<img src="https://user-images.githubusercontent.com/61076742/140702696-314f550f-59f6-4a94-87d7-85effa39438b.gif" height="200" /> <img src="https://user-images.githubusercontent.com/61076742/140702706-15e1bb35-9865-4741-97d6-0a2adb8c1bb6.gif" height="500" />

<br> <br>

## 03. JS
### 자바스크립트를 사용해서 구현한 메가 메뉴
![img_nav](https://user-images.githubusercontent.com/61076742/140704102-81a5cccc-9e8a-41f9-9c24-81a5c56244cb.gif)

<br><br> 
---

### 플러그인을 사용한 슬라이드 기능 
사용한 플러그인: slick, swiper
<br><br>

![img_slider](https://user-images.githubusercontent.com/61076742/140704014-0515a451-c79c-43df-be88-8422617ec863.gif)
![img_MV](https://user-images.githubusercontent.com/61076742/140704052-0a135ef7-6bf9-4823-b362-4dc3faa5a9fd.gif)


