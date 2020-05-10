import React, {Component} from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom'

class BoardButton extends Component {

    handleUpdate = () => {
        const { id } = this.props
        console.log("update boardId: " + id)
        this.props.history.push('/board/update/' + id);
    }

    handleDelete = () => {
        const { id } = this.props
        console.log("delete boardId:" + id)
        axios
            .delete("/api/board" + "/" + id)
            .then(() => {
                this.props.history.push('/main');
            }).catch(res => console.log(res))
    }

    render() {
        const { handleUpdate, handleDelete } = this
        return (
            <td>
                <button onClick={handleUpdate}>수정</button>
                <button onClick={handleDelete}>삭제</button>
            </td>
        );
    }
}

// 하위 컴포넌트는 history에 접근할 수 없기 때문에 상위 컴포넌트의 Router의 history 객체와 연결시킴
export default withRouter(BoardButton)