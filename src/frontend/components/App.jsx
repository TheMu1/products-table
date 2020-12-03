import React from "react";
import PropTypes from "prop-types";
import {Responsive, Grid, Button, Icon} from "semantic-ui-react";
import CustomTable from "./parts/table/productsTable";
import DropDown from "./parts/dropdown";
import CustomModal from "./parts/modal";
import sortTable from "./actions/sort";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            languages: {
                values: [{flag: 'gb', text:'English'}, {flag: 'lt', text: 'Lietuvių'}],
                selected: ""
            },
            deleteAct: {
                modalShow: false,
                eanToDelete: ''
            },
            sort: {
                column: '',
                direction: 'descending',
            }
        };
    }

    componentDidMount() {
        let products = JSON.parse(localStorage.getItem('products'));
        let tmp = JSON.parse(localStorage.getItem('lang'));
        let languages = {...this.state.languages};
        languages.selected = tmp ? tmp : "English";
        this.setState({
            products: products ? products : [],
            languages
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
            deleteAct: {
                modalShow: true,
                eanToDelete: ean
            }
        });
    };

    deleteProduct = () => {
        let products = this.state.products;
        products.forEach((p, index) => {
                if (this.state.deleteAct.eanToDelete === p.ean) {
                    products.splice(index, 1);
                }
            }
        );
        localStorage.setItem('products', JSON.stringify(products));
        this.setState({
            products: products,
            deleteAct: {
                modalShow: false,
                eanToDelete: ''
            }
        });
    };

    onCheckBoxClick = (e, ean) => {
        let products = this.state.products;
        products.forEach((p) => {
                if (ean === p.ean) {
                    p.active = !p.active;
                }
            }
        );
        localStorage.setItem('products', JSON.stringify(products));
        this.setState({
            products: products
        });
    };

    handleSelect = (e, {value}) => {
        const languages = {...this.state.languages, selected: value};
        this.setState({languages}, () => {
            localStorage.setItem('lang', JSON.stringify(this.state.languages.selected))
        });
        this.props.history.go(0);
    };

    hideModal = () => {
        this.setState({
            deleteAct: {
                modalShow: false,
                eanToDelete: ''
            }
        })
    };

    handleInputChange = (rowIndex, column, e) => {
        if (e.target.validity.valid) {
            let val = e.target.value.length > 0 ? e.target.value : '0';
            let products = [...this.state.products];
            products[rowIndex][column] = val;
            localStorage.setItem('products', JSON.stringify(products));
            this.setState({products});
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
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

    sort = (column) => {
        let result = sortTable(column, this.state.sort.column, this.state.products, this.state.sort.direction);
        this.setState({
            data: result.data,
            sort: result.sort
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
                        <Grid.Column tablet={3} computer={2} floated="right">
                            <label className="custom-label">{language.buttons.language}</label>
                            <DropDown
                                values={this.state.languages.values}
                                value={this.state.languages.selected}
                                onChange={this.handleSelect}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <CustomTable
                                sort={this.sort}
                                sortDirection={this.state.sort.direction}
                                sortColumn={this.state.sort.column}
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
                    show={this.state.deleteAct.modalShow}
                    positiveAction={this.deleteProduct}
                    negativeAction={this.hideModal}
                    modalHeader={language.modal.header}
                    modalContent={language.modal.content}
                    positiveBtnText={language.modal.positiveBtn}
                    negativeBtnText={language.modal.negativeBtn}
                />
            </Responsive>
        )
    }
}

App.propTypes = {
    language: PropTypes.object,
};
