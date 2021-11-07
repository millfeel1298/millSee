millSee 기술 상세서
===
## 01. JS
### 01-01. 스크롤 이벤트
#### &#64; Current Scene 설정
<img src="https://user-images.githubusercontent.com/61076742/140637567-bae1b7e8-4e86-4251-b94f-c98dde086471.gif" height="400">

```javascript
const scene_totals = document.querySelectorAll('.bl_scene');

// .bl_scene의 height 값을 배열에 저장
function set_sceneHeight() {
    scene_heights = [];
    for (let i = 0; i < scene_totals.length; i++) {
      scene_heights.push(scene_totals[i].clientHeight);
    }
    return scene_heights;
}
```


02. HTML5
---------
03. CSS3
---------

