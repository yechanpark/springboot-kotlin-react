import React, {Component} from "react";
import {Link} from 'react-router-dom'
import BoardItem from "./board/BoardItem";
import axios from "axios";

class MainComponent extends Component {
    /**
     * React (v16.3) Component LifeCycle
     *
     * < 객체 생성 시 - Mount>
     * 컴포넌트가 생성되고 DOM에 삽입되는 과정
     *
     * (Render Phase)
     * 1. constructor
     * 생성자. 컴포넌트가 생성될 때 단 한번만 실행
     * 주로 state선언 및 초기화에 사용
     *
     * 2. static {@link getDerivedStateFromProps} (v17 이후 {@link componentWillMount} 사용 불가)
     * React 엘리먼트를 실제 DOM 노드에 추가하기 직전에 호출
     * DOM이 생성되지 않아 DOM을 조작할 수 없음
     * render가 호출되기 전이기 때문에 setState()를 사용해 state값을 변경해도 render가 호출되지 않는다.
     * 주로 props 값을 state값에 저장할 때 사용
     * 컴포넌트가 업데이트될 때도 수행됨
     *
     * 3. {@link render}
     * 컴포넌트 UI를 렌더링
     * 컴포넌트 단위에서 반드시 사용되어야 함
     * state 또는 DOM 정보 변경 시, 컴포넌트가 반복해서 렌더링되는 문제가 발생하기 때문에 state, DOM 정보를 변경하지 않도록 작성
     *
     * (Commit Phase)
     * 4. {@link componentDidMount}
     * 컴포넌트가 마운트된 직후. 즉, render()가 호출된 후 트리에 삽입된 직후에 호출
     * 브라우저 상에 컴포넌트를 나타낸 후 호출
     * DOM 노드가 생긴 후의 초기화 작업은 이 메서드에서 진행해야 함
     * 외부에서 데이터(AJAX)를 불러와야 하거나 타이머를 작성하기에 적절한 위치
     *
     *
     * < 객체 업데이트 시 - Upodate >
     * 1. props 또는 state가 변경되는 경우
     * 2. 부모 컴포넌트가 리렌더링될 때
     * 3. this.forceUpdate로 강제 렌더링할 때
     * 컴포넌트의 기존 정보가 변경되는 경우 새로운 정보를 기반으로 리렌더링
     *
     * (Render Phase)
     * 1. static {@link getDerivedStateFromProps} (v17 이후 {@link componentWillReceiveProps} 사용 불가)
     * nextPorps : 새롭게 받은 props 값
     * prevState : 기존에 있던 state 값
     * 인자로 넘어온 값을 사용해 기존의 값을 대체하는 작업 수행 가능
     *
     * 2. {@link shouldComponentUpdate} (v17 이후 {@link componentWillUpdate} 사용 불가)
     * 컴포넌트 업데이트 직전에 호출
     * props 또는 state가 변경되었을 때, 리랜더링을 여부를 return 값으로 결정
     * true  : 리렌더링을 수행해야 하므로, 이후의 업데이트 라이프사이클 메서드 수행
     * false : 리렌더링 하지 않아야 하므로, 이후의 업데이트 라이프사이클 메서드 수행되지 않음
     * 성능 개선 포인트
     *    -> 리액트는 부모 컴포넌트가 리렌더링된 경우, 해당 부모 컴포넌트 내부의 자식 컴포넌트들도 업데이트되지 않더라도 전부 리렌더링을 시도
     *    -> 부모 컴포넌트가 리렌더링됐을 때를 대비해 현재 컴포넌트의 리렌더링 조건을 작성하는 것이 좋음
     *
     * 3. {@link render}
     *
     * (Pre-Commit Phase)
     * 4. {@link getSnapshotBeforeUpdate}
     * 업데이트된 정보가 DOM에 반영되기 전에 실행
     * 기존의 state, props 참조 가능
     * 이 메서드에서 리턴한 값은 componentDidUpdate의 snapshot에서 받을 수 있음
     *
     * (Commit Phase)
     * 5. {@link componentDidUpdate}
     * 리렌더링 완료 후 실행 (업데이트가 끝난 상태)
     * 기존의 state, props 참조 가능
     * {@link getSnapshotBeforeUpdate}에서 넘긴 snapshot 참조 가능
     *
     * < 객체 제거 시 - Unmount >
     * (Commit Phase)
     * 1. {@link componentWillUnmount}
     * 컴포넌트가 소멸된 시점에(DOM에서 삭제된 후) 실행
     * 컴포넌트 내부에서 타이머나 비동기 API를 사용하고 있을 때, 이를 제거하기에 유용
     *
     * < 에러 핸들링 >
     * 1. {@link componentDidCatch}
     */

    constructor(props) {
        super(props)
        this.state = {
            boards: []
        }
    }

    render() {
        const {boards} = this.state;

        // boards 배열을 map 함수를 사용하여 BoardItem으로 구성된 컴포넌트 배열인 boardItemList로 변환
        const boardItemList = boards.map(
            row => (
                <BoardItem key={row.id} row={row}/>
            )
        );

        return (
            <div>
                Main 페이지
                {"\n"}
                {/*
                    Link : 클릭하면 다른 주소로 이동
                     - <a> 태그와 다른 점
                     <a> 태그는 페이지 전환 과정 중 페이지를 새롭게 로드함
                     따라서 애플리케이션이 들고 있던 상태들을 모두 날려버림.
                     렌더링된 컴포넌트들 모두 사라지고 다시 처음부터 렌더링함

                     Link를 사용하면 애플리케이션은 유지하며 HTML5 History API를 사용해 페이지 주소만 변경함
                     Link도 결국 a태그로 변경되지만 페이지 전환을 방지하는 기능이 내장됨

                     Link는 Spring Controller에 @RequestMapping으로 매핑되어 있지 않아도 사용이 가능 (새로운 Request가 전송되지 않음)
                     <a> 태그는 Spring Controller에 @RequestMapping으로 매핑되어 있지 않으면 404 에러가 발생 (새로운 Request가 전송됨)
                  */
                }
                <Link to="/board/add">추가</Link>
                <table border="1">
                    <tbody>
                    <tr align="center">
                        <td width="50">No.</td>
                        <td width="100">Title</td>
                        <td width="200">Contents</td>
                        <td width="300">Date</td>
                        <td width="100">ETC</td>
                    </tr>
                        {boardItemList}
                    </tbody>
                </table>
            </div>
        )
    }

    componentDidMount() {
        axios.get("/api/boards").then(res => {
            console.log("get /api/boards")
            this.setState({
                boards: res.data
            });
        }).catch(res => console.log(res))
    }
}


export default MainComponent