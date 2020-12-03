import React from "react";
import PropTypes from "prop-types";
import ProductForm from "./productForm/productForm";
import {Responsive, Grid, Menu, Icon} from "semantic-ui-react";
import LineChart from "./parts/lineChart";
import CustomButton from "./parts/customButton";
/*
    Builds product form component depending on the  purpose: preview/edit/create new
 */
export default class BuildForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ean: this.props.match.params.id,
            activeTab: 'details'
        };
    }

    //set active tab menu
    onMenuClick(pane) {
        this.setState({activeTab: pane});
    }

    render() {
        let component, detailsTabContent = '';
        let products = JSON.parse(localStorage.getItem('products'));
        let product = {};
        let activeTab = this.state.activeTab; //active tab in product details view
        let categories = [], data = [];
        let language = this.props.language;
        if (products) {
            products.filter((p) => {
                if (p.ean === this.state.ean) {
                    product = p;
                }
            });
            let backButton =
                <Grid.Row centered>
                    <CustomButton
                        color="blue"
                        icon="arrow left"
                        btnText={language.buttons.back}
                        onClick={() => this.props.history.push('/')}
                    />
                </Grid.Row>
            // Product view quantity history tab
            if (activeTab === 'quantity') {
                if (product.quantityHistory.length > 0) {
                    product.quantityHistory.forEach((el) => {
                        data.push(Number(el.value));
                        categories.push(new Date(el.timestamp).toLocaleString());
                    });
                    detailsTabContent =
                        <Grid.Row centered>
                            <Grid.Column width={9}>
                                <LineChart
                                    title={language.charts.quantity.header}
                                    data={data}
                                    categories={categories}
                                    seriesName={language.charts.quantity.seriesName}
                                    valuesName={language.charts.quantity.valueName}
                                />
                            </Grid.Column>
                        </Grid.Row>
                } else {
                    detailsTabContent =
                        <Grid.Row centered>
                            <Grid.Column width={7} className="no-chart-text" textAlign="center">
                                <h2>{language.noQuantityChart.header}</h2> <br/>
                                <h3>{language.noQuantityChart.text}</h3>
                            </Grid.Column>
                        </Grid.Row>
                }
            }
            // Product view price history tab
            if (activeTab === 'price') {
                console.log(product.priceHistory.length);
                if (product.priceHistory.length > 0) {
                    product.priceHistory.forEach((el) => {
                        data.push(Number(el.value));
                        categories.push(new Date(el.timestamp).toLocaleString());
                    });
                    detailsTabContent =
                        <Grid.Row centered>
                            <Grid.Column width={9}>
                                <LineChart
                                    title={language.charts.price.header}
                                    data={data}
                                    categories={categories}
                                    seriesName={language.charts.price.seriesName}
                                    valuesName={language.charts.price.valueName}
                                />
                            </Grid.Column>
                        </Grid.Row>
                } else {
                    detailsTabContent =
                        <Grid.Row centered>
                            <Grid.Column width={7} className="no-chart-text" textAlign="center">
                                <h2>{language.noPriceChart.header}</h2> <br/>
                                <h3>{language.noPriceChart.text}</h3>
                            </Grid.Column>
                        </Grid.Row>
                }
            }
            if (activeTab === 'details') {
                detailsTabContent =
                    <Grid.Row centered>
                        <Grid.Column width={5}>
                            <ProductForm
                                product={product}
                                editable={false}
                                purpose={'view'}
                                language={language}
                            />
                        </Grid.Column>
                    </Grid.Row>
            }
            //Should we build product view/details page
            if (/^(\/products\/\d+$)$/.test(this.props.location.pathname)) {
                component =
                    <>
                    <Grid.Row centered>
                        <h2 className="custom-header">
                            <Icon.Group size='large'>
                                <Icon name='shopping cart'/>
                                <Icon corner name='info'/>
                            </Icon.Group>
                            {language.viewPage.header}
                        </h2>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column width={5}>
                            <Menu pointing secondary fluid widths={3} size='large'>
                                <Menu.Item
                                    className="underline"
                                    active={activeTab === 'details'}
                                    onClick={() => this.onMenuClick('details')}
                                >
                                    <Icon name='info'/> {language.buttons.view}
                                </Menu.Item>
                                <Menu.Item
                                    active={activeTab === 'price'}
                                    onClick={() => this.onMenuClick('price')}
                                >
                                    <Icon name='chart line'/> {language.buttons.priceHistory}
                                </Menu.Item>
                                <Menu.Item
                                    active={activeTab === 'quantity'}
                                    onClick={() => this.onMenuClick('quantity')}
                                >
                                    <Icon name='area chart'/> {language.buttons.quantityHistory}
                                </Menu.Item>
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>
                    {detailsTabContent}
                    {backButton}
                    </>
            }
        }
        //Should we build new product creation page
        if (/^(\/products\/create)$/.test(this.props.location.pathname)) {
            component =
                <>
                <Grid.Row centered>
                    <h2 className="custom-header">
                        <Icon.Group size='large'>
                            <Icon name='shopping cart'/>
                            <Icon corner name='add'/>
                        </Icon.Group>
                        {language.createPage.header}</h2>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={5}>
                        <ProductForm
                            editable={true}
                            purpose={'create'}
                            language={language}
                        />
                    </Grid.Column>
                </Grid.Row>
                </>
        }
        //Should we build existing product edition page
        if (/^(\/products\/\d+\/edit$)$/.test(this.props.location.pathname)) {
            component =
                <>
                <Grid.Row centered>
                    <h2 className="custom-header">
                        <Icon.Group size='large'>
                            <Icon name='shopping cart'/>
                            <Icon corner name='pencil alternate'/>
                        </Icon.Group>
                        {language.editPage.header}
                    </h2>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={5}>
                        <ProductForm
                            product={product}
                            editable={true}
                            purpose={'edit'}
                            language={language}
                        />
                    </Grid.Column>
                </Grid.Row>
                </>
        }
        return (
            <Responsive style={{height: '100%'}} className="custom-grid">
                <Grid stackable verticalAlign="middle">
                    {component}
                </Grid>
            </Responsive>
        )
    }
}

BuildForm.propTypes = {
    language: PropTypes.object,
};