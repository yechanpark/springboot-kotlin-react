import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component{
    constructor(props) {
        super(props)
        this.state = {message: ""}
    }

    /**
     * componentDidMount()
     * 컴포넌트가 마운트된 직후, 즉 트리에 삽입된 직후에 호출
     * DOM 노드가 있어야 하는 초기화 작업은 이 메서드에서 이루어지면 됨
     * 외부에서 데이터를 불러와야 한다면, 네트워크 요청을 보내기 적절한 위치
     */
    componentDidMount() {
        this.getApi();
    }


    getApi = () => {
        axios.get("/api/hello")
            .then(res => {
                console.log(res)
                console.log(res.data.message)
                this.setState({
                    message: res.data.message
                });
            })
            .catch(res => console.log(res))
    }

    render() {
        const {message} = this.state;

        return (
            <div>
                Main 페이지
                <div>
                    {message}
                </div>
            </div>
        )
    }
}

export default App;
