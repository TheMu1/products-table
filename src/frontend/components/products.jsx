import React from "react";
import PropTypes from "prop-types";
import {Responsive, Grid, Button, Icon} from "semantic-ui-react";
import CustomTable from "./parts/table/productsTable";
import DropDown from "./parts/dropdown";
import CustomModal from "./parts/modal";
import sortData from "./actions/sort";
import {getProducts} from "./actions/fetcingActions";
import {deleteProduct, changeProductStatus} from "./actions/productsActions";

//Main view (products table)  component: manages table data and table click events
export default class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            showModal: false,
            eanToDelete: '',
            sortColumn: '',
            sortDirection: 'descending'
        };
    }

    componentDidMount() {
        let products = getProducts();
        this.setState({
            products: products ? products : [],
        });
    }

    onCreateNewClick = () => {
        this.props.history.push("/products/create");
    };

    onViewClick = (e, ean) => {
        this.props.history.push(`/products/${ean}`);
    };

    onEditClick = (e, ean) => {
        this.props.history.push(`/products/${ean}/edit`);
    };

    onDeleteClick = (e, ean) => {
        this.setState({
            showModal: true,
            eanToDelete: ean

        });
    };

    deleteProduct = () => {
        //update products array with removed product and hide modal
        this.setState({
            products: deleteProduct(this.state.products, this.state.eanToDelete),
            showModal: false,
            eanToDelete: ''

        });
    };

    //handle product active field select(checkbox)
    onCheckBoxClick = (e, ean) => {
        this.setState({
            products: changeProductStatus(this.state.products, ean)
        });
    };

    hideModal = () => {
        this.setState({
            showModal: false,
            eanToDelete: ''

        })
    };

    //handles table price/quantity column input changes depending on the rowIndex
    handleInputChange = (rowIndex, column, e) => {
        if (e.target.validity.valid) {
            let val = e.target.value.length > 0 ? e.target.value : '0';
            let products = [...this.state.products];
            products[rowIndex][column] = val;
            localStorage.setItem('products', JSON.stringify(products));
            this.setState({products});
            //timeout is needed not to spam into quantity/price history arrays while we still editing field
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                //truncate leading zeroes for pretty looking
                products[rowIndex][column] = Number(val).toString();
                if (column === 'price') {
                    products[rowIndex].priceHistory.push({
                        timestamp: Date.now(),
                        value: val
                    });
                }
                if (column === 'quantity') {
                    products[rowIndex].quantityHistory.push({
                        timestamp: Date.now(),
                        value: val
                    });
                }
                this.setState({products});
                localStorage.setItem('products', JSON.stringify(products));
            }, 1000);
        }
    };

    //sort data in the table by given column
    sort = (column) => {
        let result = sortData(column, this.state.products, this.state.sortDirection);
        this.setState({
            products: result.data,
            sortColumn: result.sortColumn,
            sortDirection: result.sortDirection
        })
    };

    render() {
        const language = this.props.language;
        return (
            <Responsive style={{height: '100%'}} className="custom-grid">
                <Grid stackable verticalAlign="middle">
                    <Grid.Row centered>
                        <h2 className="custom-header">{language.productTablePage.pageHeader}</h2>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={7} floated="left">
                            <Button animated='fade' primary onClick={this.onCreateNewClick}>
                                <Button.Content floated='left' visible>
                                    {language.buttons.create}
                                </Button.Content>
                                <Button.Content hidden> <Icon name='plus'/> </Button.Content>
                            </Button>
                        </Grid.Column>
                        <Grid.Column tablet={3} computer={2}>
                            <label className="custom-label">{language.buttons.language}</label>
                            <DropDown
                                onChange={() => {
                                    this.props.history.go(0)
                                }}
                                noResults={language.select.noResults}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <CustomTable
                                sort={this.sort}
                                sortDirection={this.state.sortDirection}
                                sortColumn={this.state.sortColumn}
                                data={this.state.products}
                                onCheckBoxClick={this.onCheckBoxClick}
                                onEditClick={this.onEditClick}
                                onDeleteClick={this.onDeleteClick}
                                onViewClick={this.onViewClick}
                                language={language}
                                handleInputChange={this.handleInputChange}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <CustomModal
                    show={this.state.showModal}
                    positiveAction={this.deleteProduct}
                    negativeAction={this.hideModal}
                    language={language.modal}
                />
            </Responsive>
        )
    }
}
Products.propTypes = {
    language: PropTypes.object,
};