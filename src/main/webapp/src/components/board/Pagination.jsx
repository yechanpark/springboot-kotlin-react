import React, {Component} from "react";

const propTypes = {
    onClickPagingButton: React.PropTypes.func.isRequired,
    totalElements: React.PropTypes.number.isRequired,
    pageOfItems: React.PropTypes.number.isRequired,
    totalPages: React.PropTypes.number.isRequired,
    initialPage: React.PropTypes.number
}

const defaultProps = {
    initialPage: 1
}

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pager: {}
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.totalElements !== this.props.totalElements)
            this.setPage(this.props.currentPage);
    }

    setPage = (currentPage) => {
        const {totalElements, totalPages} = this.props

        // call change page function in parent component
        this.props.onClickPagingButton(currentPage)

        // update state
        this.setState({pager: this.getPager(totalElements, currentPage, totalPages)});
    }

    // 하단 페이징 인터페이스 정의
    getPager(totalElements, currentPage, totalPages, pageSize) {
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
                        <a onClick={() => this.setPage(page)}>
                            {page}
                        </a>
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

    componentDidMount() {
        this.setPage(this.props.initialPage);
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination