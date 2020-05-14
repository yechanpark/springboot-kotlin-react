import React, {Component} from "react";
import axios from 'axios';

const propTypes = {
    onChangePage: React.PropTypes.func.isRequired,
    getURL: React.PropTypes.string.isRequired,
    initialPage: React.PropTypes.number,
    sort: React.PropTypes.array,
    query: React.PropTypes.string
}

const defaultProps = {
    initialPage: 1,
}

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pager: {},
            pageOfItems: [],
            totalElements: 0,
            totalPages: 0
        };
    }

    componentDidMount() {
        console.log("Pagination# componentDidMount()")
        this.setPage(this.props.initialPage);
    }

    getData = async (getURL, $sortQueryString, size, page) => {
        console.log("Pagination# getData()");
        // 소팅 쿼리 스트링
        let sortQueryString = $sortQueryString.join('&sort=');

        // page는 0부터 시작하므로 -1 처리해야 함
        console.log("Pagination# axios start");

        let res = await axios.get(`${getURL}?sort=${sortQueryString}&size=${size}&page=${page-1}`)
            .then( (res) => { return res; }
        )
        .catch(() => console.log("error"));
        console.log("Pagination# axios end");
        return res.data;


    };

    setPage = async (currentPage) => {
        console.log("Pagination# setPage()");
        const {getURL, sort, size} = this.props

        // 데이터 로드
        await this.getData(getURL, sort, size, currentPage).then(data => {
            this.setState({
                pageOfItems:    data.content,
                totalElements : data.totalElements,
                totalPages :    data.totalPages
            })
            console.log("Pagination# axios setState done");
        });

        console.log("Pagination# currentPage : " + currentPage);
        console.log("Pagination# totalElements : " +this.state.totalElements );
        console.log("Pagination# totalPages : " + this.state.totalPages);
        console.log("Pagination# pageOfItems : " + this.state.pageOfItems);

        // call change page function in parent component
        this.props.onChangePage(this.state.pageOfItems)

        // update state
        this.setState({pager: this.getPager(this.state.totalElements, currentPage, this.state.totalPages)});
    }

    // 하단 페이징 인터페이스 정의
    getPager(totalElements, currentPage, totalPages, pageSize) {
        console.log("Pagination# getPager()");
        console.log("totalElements : " + totalElements);
        console.log("currentPage : " + currentPage);
        console.log("totalPages : " + totalPages);
        console.log("pageSize : " + pageSize);
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        let startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages

            // 현재 페이지 기준 앞에 6개 유지
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            }

            // 뒤쪽 페이지에서 10개 이하가 남은 경우
            else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            }

            // 중간 페이지는 적절하게 갯수를 조절
            else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalElements - 1);

        // create an array of pages to ng-repeat in the pager control
        console.log("startPage : " + startPage);
        console.log("endPage : " + endPage);
        let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalElements,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        let pager = this.state.pager;

        if (!pager.pages) {
            // don't display pager if there isn't page
            return null;
        }

        return (
            <ul className="pagination">
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(1)}>First</a>
                </li>
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => {
                        this.setPage(pager.currentPage > 1 ? pager.currentPage - 1 : 1);
                    }}>Previous</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                        <a onClick={() => this.setPage(page)}>{page}</a>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => {
                        this.setPage(pager.totalPages > pager.currentPage ? pager.currentPage + 1 : pager.totalPages);
                    }}>Next</a>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
                </li>
            </ul>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination