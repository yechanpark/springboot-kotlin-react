import React from 'react';

/* from뒤의 경로에 있는, export한 Component를 import하여 사용할 수 있도록 선언 */
import TopMenuComponent from './components/TopMenuComponent'

/* 현재 클래스에서 렌더링한 결과에 대해 css를 적용할 때 */
import './App.css';

/**
 * 함수형 컴포넌트
 *  - props만 사용할 경우 더 간단하게 작성 가능
 *  - 클래스형 컴포넌트 보다 조금 더 빠름
 *  - 함수형 컴포넌트에서 상태를 관리해야하는 경우 Hook을 사용해야 함
 *    (클래스형 컴포넌트는 Component 클래스로부터 라이프사이클 메서드를 상속받아 사용)
 * */
const App = () => {
    return (
        <TopMenuComponent/>
    );
}

/* 외부에서 타입 참조가 가능하도록 export */
export default App;
