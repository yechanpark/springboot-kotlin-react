import React, {Component} from "react";

/* AJAX Call을 위한 axios 모듈 */
import axios from "axios";

class UpdateBoard extends Component {
    constructor(props) {
        super(props);

        // 현재 클래스의 객체마다 하나 씩 가지고 있는 state 선언
        this.state = {
            title: 'default title',
            contents: 'default contents'
        };
    }

    // <input type='text'> 요소의 변경이 일어날 때 마다 변경 사항을 적용하여 리렌더링 시키는 함수
    handleChange = (e) => {
        // e.target.value, e.target.name을 value, name으로 줄여쓰기 위한 문장
        const {value, name} = e.target;

        /*
            state는 직접 접근하면 수정되지 않음.
            setState()를 통해 state를 조작해야만 리렌더링이 일어남
        */
        this.setState({
            // ... : 전개연산자. this.state의 모든 요소(title, contents)를 리턴)
            ...this.state,

            // e.target.name값과 state 내의 필드명과 일치하는 요소를 찾아 value로 값을 변경
            [name]: value
        });

    }

    handleSubmit = (e) => {
        // 기존 기능 비활성화
        e.preventDefault();
        const { title, contents } = this.state
        // boardId는 URI Path에서 얻어온 값
        const { boardId } = this.props.match.params

        // @PutMapping("/api/board/1") 로 매핑된 컨트롤러에 AJAX 요청
        // put()의 두 번째 인자는 Post Parameter를 넣음
        axios.put("/api/board" + "/" + boardId, {
            title: title,
            contents: contents
        }).then(() => {
            /* Redirect */
            this.props.history.push('/main');
        }).catch(res => console.log(res))
    }

    render() {
        const { title, contents } = this.state
        const { handleSubmit, handleChange } = this
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    UpdateBoard 페이지
                    title : <input type="text" name="title" onChange={handleChange} value={title}/>
                    contents : <input type="text" name="contents" onChange={handleChange} value={contents}/>
                    <button type="submit">수정</button>
                </form>
            </div>
        )
    }
}

export default UpdateBoard