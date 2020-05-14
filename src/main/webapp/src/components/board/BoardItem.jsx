import React, {Component} from "react";
import BoardButton from "./BoardButton";

class BoardItem extends Component {
    render() {
        const {id, title, contents, date} = this.props.row;
        const {onDeleteUpdateButton} = this.props;

        return (
            <tr>
                <td>{id}</td>
                <td>{title}</td>
                <td>{contents}</td>
                <td>{date}</td>
                <BoardButton onDeleteUpdateButton={onDeleteUpdateButton} id={id}/>
            </tr>
        );
    }
}

export default BoardItem