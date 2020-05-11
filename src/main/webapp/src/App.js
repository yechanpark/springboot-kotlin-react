/* {Component} from 'react' : React.Component를 줄여쓰기 위한 문장*/
import React, {Component} from 'react';

/* export한 컴포넌트를 import하여 사용 */
import TopMenuComponent from './components/TopMenuComponent'

/* 현재 클래스에서 렌더링한 결과에 대해 css를 적용할 때 */
import './App.css';

/**
 * 함수형 컴포넌트
 *  - props만 사용할 경우 더 간단하게 작성 가능
 *
 * 클래스형 컴포넌트
 *  - 라이프사이클 API사용 가능
 *  - State 사용 가능
 * */
class App extends Component{

    // Component를 상속하는 클래스는 render()를 구현해야 함
    render() {
        // 렌더링한 결과를 리턴
        return (
            /* 주석 */
            <TopMenuComponent/>
        )
    }
}

/* 외부에서 타입 참조가 가능하도록 export */
export default App;
