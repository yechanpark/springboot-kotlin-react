import React, {Component} from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom'

class BoardButton extends Component {

    constructor(props) {
        super(props);
    }

    handleUpdate = () => {
        const { id, history } = this.props;
        history.push('/board/update/' + id);
    }


    handleDelete = () => {
        const { id, history, onDeleteUpdateButton } = this.props;
        axios.delete("/api/board" + "/" + id)
            .then(
                () => {
                    onDeleteUpdateButton()
                }
            )
            .catch(
                (res) => console.log(res)
            )
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
// 상위 컴포넌트의 기준은 라우트로 사용된 컴포넌트임
export default withRouter(BoardButton)