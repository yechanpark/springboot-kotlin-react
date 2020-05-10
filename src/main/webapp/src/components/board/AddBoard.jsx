import React, {Component} from "react";
import axios from "axios";

class AddBoard extends Component {
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
        const { title, contents } = this.state
        axios.post("/api/board", {
            title: title,
            contents: contents
        }).then(() => {
            this.props.history.push('/main');
        }).catch(res => console.log(res))
    }

    render() {
        const { title, contents } = this.state
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    AddBoard 페이지
                    title : <input type="text" name="title" onChange={this.handleChange} value={title}/>
                    contents : <input type="text" name="contents" onChange={this.handleChange} value={contents}/>
                    <button type="submit">추가</button>
                </form>
            </div>
        )
    }
}

export default AddBoard