import React, {Component} from "react";
import axios from "axios";

class UpdateBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'default title',
            contents: 'default contents'
        };
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        });

    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.put("/api/board" + "/" + this.props.match.params.boardId, {
            title: this.state.title,
            contents: this.state.contents
        }).then(() => {
            this.props.history.push('/main');
        }).catch(res => console.log(res))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    UpdateBoard 페이지
                    title : <input type="text" name="title" onChange={this.handleChange} value={this.state.title}/>
                    contents : <input type="text" name="contents" onChange={this.handleChange} value={this.state.contents}/>
                    <button type="submit">수정</button>
                </form>
            </div>
        )
    }
}

export default UpdateBoard