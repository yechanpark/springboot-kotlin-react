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
        const {value, name} = e.target;
        this.setState({
            ...this.state,
            // Computed property names
            // input 태그의 name 값을 배열의 key 값으로 사용
            [name]: value
        });

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { title, contents } = this.state
        const { history }         = this.props
        axios.post("/api/board", {
            title: title,
            contents: contents
        }).then(() => {
            history.push('/');
        }).catch(res => console.log(res))
    }

    render() {
        const { title, contents } = this.state
        const { handleSubmit, handleChange } = this
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    AddBoard 페이지
                    {"\n"}
                    title : <input type="text" name="title" onChange={handleChange} value={title}/>
                    contents : <input type="text" name="contents" onChange={handleChange} value={contents}/>
                    <button type="submit">추가</button>
                </form>
            </div>
        )
    }
}

export default AddBoard