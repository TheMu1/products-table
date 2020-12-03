import React from "react";
import PropTypes from "prop-types";
import {Dropdown, Table, Button} from "semantic-ui-react";

//Table footer with pagination
export default class TableFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let showingRows;
        let {page, rowsPerPage, totalRows, translation} = this.props;
        const options = [
            {key: 1, text: '5', value: 5},
            {key: 2, text: '10', value: 10},
            {key: 3, text: '25', value: 25}
        ];
        let tmp = page * rowsPerPage + rowsPerPage;
        //check if currently showing rows in pagination footer not outbound totalRows count
        showingRows = (tmp > totalRows) ? totalRows : tmp;
        /*
            Table rows starts from 0 so we need to add +1 if totalRows > 0 for user representation from which row
            are showing i.e. rows showing: 1-3 of 3 instead of 0-3 of 3
         */
        let startShowingRows = page * rowsPerPage;
        if (totalRows > 0 && page === 0){
            startShowingRows += 1;
        }
        return (
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan="9" className="pagination" verticalAlign="middle">
                        {translation.rowsPerPage}:
                        <Dropdown className="pagination-select"
                                  value={rowsPerPage}
                                  options={options}
                                  onChange={this.props.onChangePerPage}/>
                        <span className="pagination-rowsInfo">
                            {translation.showing} {startShowingRows} - {showingRows} {translation.of} {totalRows}
                        </span>
                        <Button className="pagination-icon"
                                circular icon="angle left"
                                onClick={() => this.props.onPageSelect(page - 1)}
                                disabled={page === 0}
                        />
                        <Button className="pagination-icon"
                                circular icon="angle right"
                                onClick={() => this.props.onPageSelect(page + 1)}
                                disabled={page+2 > Math.ceil(totalRows/rowsPerPage)}
                        />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        )
    }
}

TableFooter.propTypes = {
    rowsPerPage: PropTypes.number,
    onPageSelect: PropTypes.func,
    onChangePerPage: PropTypes.func,
    totalRows: PropTypes.number,
    page: PropTypes.number,
    translation: PropTypes.object
};