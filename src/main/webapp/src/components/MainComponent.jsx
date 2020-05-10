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
     * componentDidMount()
     * 컴포넌트가 마운트된 직후, 즉 트리에 삽입된 직후에 호출
     * DOM 노드가 있어야 하는 초기화 작업은 이 메서드에서 이루어지면 됨
     * 외부에서 데이터를 불러와야 한다면, 네트워크 요청을 보내기 적절한 위치
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