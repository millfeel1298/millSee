millSee 기술 상세서
===
01. JS
---
# 스크롤 이벤트 - Current Scene 
![img_curScene](https://user-images.githubusercontent.com/61076742/140637567-bae1b7e8-4e86-4251-b94f-c98dde086471.gif)
```javascript
import React, {Component} from 'react';
import './Movie.css';

class Movie extends Component{  
    render() {
        return (     
                <tr  className = "Movie" >
                    <th><MovieRank rank={this.props.rank}/></th>
                    <th>{this.props.title}</th>
                </tr>
        )
    }
}
```

02. HTML5
---------
03. CSS3
---------

