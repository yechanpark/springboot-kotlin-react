import React, {Component} from "react";
import {Link} from 'react-router-dom'
import BoardItem from "./board/BoardItem";
import axios from "axios";

class MainComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            boards: []
        }
    }

    /**
     * React (v16.3) LifeCycle
     * < 객체 생성 시 >
     *
     * (Render Phase)
     * 1. constructor()
     * 생성자. 컴포넌트가 생성될 때 단 한번만 실행
     * 생성자에서만 state를 설정할 수 있음
     *
     * 2. getDerivedStateFromProps() (v17 이후 componentWillMount() 사용 불가)
     * React 엘리먼트를 실제 DOM 노드에 추가하기 직전에 호출
     * DOM이 생성되지 않아 DOM을 조작할 수 없음
     * render가 호출되기 전이기 때문에 setState()를 사용해 state값을 변경해도 render가 호출되지 않는다.
     *
     * 3. render()
     * 컴포넌트 렌더링
     *
     * (Commit Phase)
     * 4. componentDidMount()
     * 컴포넌트가 마운트된 직후. 즉, render()가 호출된 후 트리에 삽입된 직후에 호출
     * DOM 노드가 생긴 후의 초기화 작업은 이 메서드에서 진행해야 함
     * 외부에서 데이터(AJAX)를 불러와야 하거나 타이머를 작성하기에 적절한 위치
     *
     *
     * < 객체 업데이트 시 >
     * (Render Phase)
     * 1. getDerivedStateFromProps() (v17 이후 componentWillReceiveProps() 사용 불가)
     *
     *
     * 2. shouldComponentUpdate() (v17 이후 componentWillUpdate() 사용 불가)
     * 컴포넌트 업데이트 직전에 호출
     * props 또는 state가 변경되었을 때, 재랜더링을 여부를 return 값으로 결정
     *
     * 3. render()
     *
     * (Pre-Commit Phase)
     * 4. getSnapshotBeforeUpdate()
     *
     * (Commit Phase)
     * 5. componentDidUpdate()
     *
     *
     * < 객체 제거 시 >
     * (Commit Phase)
     * componentWillUnmount()
     * 컴포넌트가 소멸된 시점에(DOM에서 삭제된 후) 실행
     * 컴포넌트 내부에서 타이머나 비동기 API를 사용하고 있을 때, 이를 제거하기에 유용
     *
     * < 에러 핸들링 >
     * componentDidCatch()
     */
    componentDidMount() {
        axios.get("api/boards").then(res => {
            this.setState({
                boards: res.data
            });
        }).catch(res => console.log(res))
    }

    render() {
        const {boards} = this.state;

        // boards 배열을 map 함수를 사용하여 ItemList으로 구성된 컴포넌트 배열인 boardItemList로 변환
        const boardItemList = boards.map(
            row => (
                <BoardItem key={row.id} row={row}/>
            )
        );

        return (
            <div>
                Main 페이지
                {/*링크*/}
                <Link to="/board/add">추가</Link>
                <table border="1">
                    <tbody>
                    <tr align="center">
                        <td width="50">No.</td>
                        <td width="100">Title</td>
                        <td width="300">Contents</td>
                        <td width="100">Date</td>
                        <td width="100">ETC</td>
                    </tr>
                        {boardItemList}
                    </tbody>
                </table>
            </div>
        )
    }
}


export default MainComponent