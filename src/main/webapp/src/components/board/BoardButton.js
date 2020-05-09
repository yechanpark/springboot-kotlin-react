import React, {Component} from "react";
import axios from "axios";

class BoardButton extends Component {

    handleUpdate = () => {
        console.log("update boardId: " + this.props.id)
    }

    handleDelete = () => {
        console.log("delete boardId:" + this.props.id)
        axios
            .delete("/api/board" + "/" + this.props.id)
            .then(() => {
                window.location = "/main"
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

export default BoardButton