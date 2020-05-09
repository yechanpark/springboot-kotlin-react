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
        axios.post("/api/board", {
            title: this.state.title,
            contents: this.state.contents
        }).then(() => {
            window.location = "/main"
        }).catch(res => console.log(res))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    AddBoard 페이지
                    title : <input type="text" name="title" onChange={this.handleChange} value={this.state.title}/>
                    contents : <input type="text" name="contents" onChange={this.handleChange} value={this.state.contents}/>
                    <button type="submit"/>
                </form>
            </div>
        )
    }
}

export default AddBoard