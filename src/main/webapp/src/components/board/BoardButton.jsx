import React, {Component} from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom'

class BoardButton extends Component {

    handleUpdate = () => {
        console.log("update boardId: " + this.props.id)
        this.props.history.push('/board/update/' + this.props.id);
    }

    handleDelete = () => {
        console.log("delete boardId:" + this.props.id)
        axios
            .delete("/api/board" + "/" + this.props.id)
            .then(() => {
                this.props.history.push('/main');
            }).catch(res => console.log(res))
    }

    render() {
        return (
            <td>
                <button onClick={this.handleUpdate}>수정</button>
                <button onClick={this.handleDelete}>삭제</button>
            </td>
        );
    }
}

// 하위 컴포넌트는 history에 접근할 수 없기 때문에 상위 컴포넌트의 Router의 history 객체와 연결시킴
export default withRouter(BoardButton)