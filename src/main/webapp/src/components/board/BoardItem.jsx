import React, {Component} from "react";
import BoardButton from "./BoardButton";

class BoardItem extends Component {
    render() {
        const {id, title, contents, date} = this.props.row
        return (
            <tr>
                <td>{id}</td>
                <td>{title}</td>
                <td>{contents}</td>
                <td>{date}</td>
                <BoardButton id={id}/>
            </tr>
        );
    }
}

export default BoardItem