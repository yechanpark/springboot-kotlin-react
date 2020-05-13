import React from "react";
import {BrowserRouter, Route} from "react-router-dom";

/* export한 컴포넌트들을 import하여 사용 */
import MainComponent from './MainComponent'
import AddBoard from './board/AddBoard'
import UpdateBoard from './board/UpdateBoard'

const TopMenuComponent = () => {

    return (
        <BrowserRouter>
            {/*
                REQUEST URI가 정확히 '/'일 때, MainComponent의 렌더링 결과를 리턴
                React Router는 REQUEST URI의 전체가 아닌 앞부분만 일치하더라도 매치된다고 판단
                아래의 경우 exact를 빼면 '/'에 모두 매치되어 모든 요청에 MainComponent + @ 로 여러 개의 컴포넌트가 렌더링 됨
            */}
            <Route exact path="/" component={MainComponent}/>
            <Route path="/board/add" component={AddBoard}/>
            {/**
                @PathVariable 사용 시 - boardId는 UpdateBoard의 this.props.match.params.boardId로 바인딩

                Route에서 Component로 넘기는 객체
                 - history
                    - 브라우저의 window.history와 비슷
                    - 주소를 임의로 변경하거나 되돌아갈 수 있도록 조작할 수 있는 객체를 제공
                    - 주소를 변경하더라도 페이지 전체를 리로드하지 않고 페이지 일부만 리로드 (SPA)
                 - location
                    - 부라우저의 window.location과 비슷
                    - 현재 페이지에 대한 정보를 가지고 있음
                    - URL을 쪼개서 가지고 있음
                    - URL의 Query String 정보를 가지고 있음
                 - match
                    - Route의 path에 정의한 것과 매치되는 정보를 가지고 있음
            */}
            <Route path="/board/update/:boardId" component={UpdateBoard}/>
        </BrowserRouter>
    );

}

export default TopMenuComponent;