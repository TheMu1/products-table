import React from "react";
import PropTypes from "prop-types";
import {Table, Button, Checkbox, Popup} from 'semantic-ui-react';
import CustomInput from '../input';
import TableFooter from "./tableFooter";

export default class ProductsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowsPerPage: 5,
            page: 0,
        }
    }

    //set how many rows will be displayed in the table
    onChangePerPage = (e, {value}) => {
        this.setState({
            rowsPerPage: value
        });
    };

    //sets next or previous table page
    setPage = (page) => {
        //check if current page is not outbound pagination indexes
        if (page < 0 || page > this.props.data.length / this.state.rowsPerPage) {
            return;
        } else {
            this.setState({
                page: page
            })
        }
    };

    render() {
        let language = this.props.language;
        let tableCol = language.table.columns;
        let page = this.state.page;
        let rowsPerPage = this.state.rowsPerPage;
        let tableHeader = [];
        let tableData = [];
        const columns = [
            {
                label: tableCol.ean,
                index: 'ean'
            },
            {
                label: tableCol.name,
                index: 'name'
            },
            {
                label: tableCol.type,
                index: 'type'
            },
            {
                label: tableCol.weight,
                index: 'weight'
            },
            {
                label: tableCol.flavour,
                index: 'flavour'
            },
            {
                label: tableCol.quantity,
                index: 'quantity'
            },
            {
                label: tableCol.price,
                index: 'price'
            },
            {
                label: tableCol.active,
                index: 'active'
            },
            {
                label: tableCol.controls,
                index: 'controls'
            }
        ];
        columns.forEach(column => {
            tableHeader.push(
                <Table.HeaderCell className="custom-table-header" key={column.index}
                                  sorted={this.props.sortColumn === column.index ? this.props.sortDirection : null}
                                  onClick={this.props.sort.bind(this, column.index)}
                >
                    {column.label}
                </Table.HeaderCell>
            );
        });
        if (this.props.data.length > 0) {
            //slice data into pages
            this.props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    tableData.push(
                        <Table.Row key={row.ean} negative={row.quantity == 0}>
                            <Table.Cell width={2} text-th={columns[0].label}>{row.ean}</Table.Cell>
                            <Table.Cell width={2} text-th={columns[1].label}>{row.name}</Table.Cell>
                            <Table.Cell width={2} text-th={columns[2].label}>{row.type}</Table.Cell>
                            <Table.Cell width={1} text-th={columns[3].label}>{row.weight}</Table.Cell>
                            <Table.Cell width={2} text-th={columns[4].label}>{row.flavour}</Table.Cell>
                            <Table.Cell width={2} text-th={columns[5].label}>
                                <CustomInput
                                    className="custom-input custom-input-tbl-inpt"
                                    name="quantity"
                                    error={row.quantity === 0}
                                    pattern="^\d+$"
                                    type="number"
                                    minValue="0"
                                    editable={true}
                                    onChange={e => {
                                        this.props.handleInputChange(index, 'quantity', e)
                                    }}
                                    value={row.quantity}
                                />
                            </Table.Cell>
                            <Table.Cell width={2} text-th={columns[6].label}>
                                <CustomInput
                                    className="custom-input custom-input-tbl-inpt"
                                    name="price"
                                    error={row.quantity === 0}
                                    pattern="^\d*([\.]\d{0,2})?$"
                                    type="text"
                                    minValue="0"
                                    editable={true}
                                    onChange={e => {
                                        this.props.handleInputChange(index, 'price', e)
                                    }}
                                    value={row.price}
                                />
                            </Table.Cell>
                            <Table.Cell width={1} text-th={columns[7].label}>
                                <Checkbox style={{marginTop: "3px", marginLeft: "5px"}}
                                    defaultChecked={row.active ? true : false}
                                    onClick={e => this.props.onCheckBoxClick(e, row.ean)}
                                />
                            </Table.Cell>
                            <Table.Cell width={3} text-th={columns[8].label}>
                                <Popup content={language.buttons.view} trigger={
                                    <Button circular size='small' className="view-btn table-btn"
                                            onClick={e => this.props.onViewClick(e, row.ean)}
                                            icon='eye'/>}
                                />
                                <Popup content={language.buttons.edit} trigger={
                                    <Button circular size='small' className="edit-btn table-btn"
                                            onClick={e => this.props.onEditClick(e, row.ean)}
                                            icon='edit outline' primary/>}
                                />
                                <Popup content={language.buttons.delete} trigger={
                                    <Button circular size='small' className="del-btn table-btn"
                                            onClick={e => this.props.onDeleteClick(e, row.ean)}
                                            icon='remove' color='red'/>}
                                />
                            </Table.Cell>
                        </Table.Row>
                    )
                });
        } else {
            tableData.push(
                <Table.Row key="warning">
                    <Table.Cell colSpan="9" style={{padding: '25px'}}>
                        {language.table.noDataText}
                    </Table.Cell>
                </Table.Row>
            );
        }

        return (
            <Table sortable className="custom-table" style={{width: '100%'}}>
                <Table.Header>
                    <Table.Row>
                        {tableHeader}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tableData}
                </Table.Body>
                <TableFooter
                    rowsPerPage={rowsPerPage}
                    onPageSelect={this.setPage}
                    onChangePerPage={this.onChangePerPage}
                    page={page}
                    totalRows={this.props.data.length}
                    translation={language.table}
                />
            </Table>
        );
    }
}

ProductsTable.propTypes = {
    sort: PropTypes.func,
    data: PropTypes.array,
    language: PropTypes.object,
    handleInputChange: PropTypes.func,
    onCheckBoxClick: PropTypes.func,
    onViewClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    OnEditCLick: PropTypes.func
};