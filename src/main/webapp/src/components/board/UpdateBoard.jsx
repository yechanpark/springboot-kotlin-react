import React, {useEffect, useState} from "react";
/* AJAX Call을 위한 axios 모듈 */
import axios from "axios";

/**
 * React Hooks (v16.8 이상)
 *
 * 1. useState()
 * 함수형 컴포넌트에서 가변적인 상태를 지녀야 하는 경우 사용
 * 하나의 useState() 함수는 하나의 상태 값만 관리 가능
 *
 * 2. useEffect()
 * 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정하는 경우 사용
 * 클래스형 컴포넌트 라이프사이클 메서드의 {@link componentDidMount}, {@link componentDidUpdate}, {@link componentWillUnmount}를 합친 것과 동일하므로 주의
 *  - 마운트될 때 ({@link componentDidMount})만 수행하고 싶을 때
 *    useEffect()의 두 번째 인자를 '[]' 와 같이 공백 배열로 설정
 *  - 특정 값이 업데이트될 때만 실행하고 싶을 때
 *    useEffect()의 두 번째 인자를 '[property]'와 같이 특정 프로퍼티 값 기준으로 변경될 때만 바뀌도록 설정
 *  - 언마운트될 때 혹은 업데이트 직전에 ({@link componentWillUnmount}) 작업 수행
 *    effect 함수(useEffect()의 첫 번째 function 파라미터)의 return값이 있는 경우, hook의 cleanup 함수로 인식하고 다음 effect가 실행되기 전에 실행
 *
 * 3. useReducer()
 *
 * 4. useMemo()
 *
 * 5. useCallback()
 *
 * 6. useRef()
 *
 * */
const UpdateBoard = (props) => {
    // 1. 렌더링 이후 AJAX로 DB에 저장된 값을 가져올 때
    // 2. 웹 브라우저에서 input 박스를 수정할 때
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');

    // 렌더링 이후 수행
    useEffect(() => {
        const { boardId } = props.match.params
        axios.get("/api/board" + "/" + boardId).then(res => {
            setTitle(res.data.title);
            setContents(res.data.contents);
        }).catch(res => console.log(res))
    }, []); // '[]' : 마운트 될 때 1회만 수정

    // 첫 마운트 이후 title, cotents에 변화가 생기는 경우, useEffect()가 아닌 아래 함수들로 처리됨
    const handleTitleChange     = (e) => setTitle(e.target.value);
    const handleContentsChange  = (e) => setContents(e.target.value);

    const handleSubmit = (e) => {
        // 기존 기능 비활성화
        e.preventDefault();
        // boardId는 URI Path에서 얻어온 값
        const { boardId } = props.match.params

        // @PutMapping("/api/board/1") 로 매핑된 컨트롤러에 AJAX 요청
        // axios.put()의 두 번째 인자는 Request Body Parameter를 넣음
        axios.put("/api/board" + "/" + boardId, {
            title: title,
            contents: contents
        }).then(() => {
            /* Route via React */
            props.history.push('/');
        }).catch(res => console.log(res))
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                UpdateBoard 페이지
                {"\n"}
                title : <input type="text" name="title" onChange={handleTitleChange} value={title}/>
                contents : <input type="text" name="contents" onChange={handleContentsChange} value={contents}/>
                <button type="submit">수정</button>
            </form>
        </div>
    );
}

export default UpdateBoard