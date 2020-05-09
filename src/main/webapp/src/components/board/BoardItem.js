import React, {Component} from "react";
import BoardButton from "./BoardButton";

class BoardItem extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.row.id}</td>
                <td>{this.props.row.title}</td>
                <td>{this.props.row.contents}</td>
                <td>{this.props.row.date}</td>
                <BoardButton id={this.props.row.id}/>
            </tr>
        );
    }
}

export default BoardItem