import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

/* export한 컴포넌트들을 import하여 사용 */
import MainComponent from './MainComponent'
import AddBoard from './board/AddBoard'
import UpdateBoard from './board/UpdateBoard'

class TopMenuComponent extends Component {

    render() {
        return (
            /* react-router, react-router-dom 모듈 설치 후 사용 가능*/
            <Router>
                {/* REQUEST URI가 정확히 '/'일 때, MainComponent의 렌더링 결과를 리턴 */}
                <Route exact path="/" component={MainComponent}/>
                <Route path="/main" component={MainComponent}/>
                <Route path="/board/add" component={AddBoard}/>
                {/* Path Variable 사용 시 - boardId는 UpdateBoard의 this.props.match.params.boardId로 바인딩 */}
                <Route path="/board/update/:boardId" component={UpdateBoard}/>
            </Router>
        )
    }
}

export default TopMenuComponent;