import React from "react";
import PropTypes from "prop-types";
import ProductForm from "./productForm/productForm";
import {Responsive, Grid, Menu, Icon} from "semantic-ui-react";
import LineChart from "./parts/lineChart";
import CustomButton from "./parts/customButton";

export default class BuildForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ean: this.props.match.params.id,
            activeMenu: 'details'
        };
    }

    //set active tab menu
    onMenuClick(pane) {
        this.setState({activeMenu: pane});
    }

    render() {
        let component, detailsTabContent = '';
        let products = JSON.parse(localStorage.getItem('products'));
        let product = {};
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
            if (this.state.activeMenu === 'quantity') {
                product.quantityHistory.forEach((el) => {
                    data.push(Number(el.value));
                    categories.push(new Date(el.timestamp).toLocaleString());
                });
                detailsTabContent =
                    <>
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
                    {backButton}
                    </>
            }

            if (this.state.activeMenu === 'price') {
                product.priceHistory.forEach((el) => {
                    data.push(Number(el.value));
                    categories.push(new Date(el.timestamp).toLocaleString());
                });
                detailsTabContent =
                    <>
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
                    {backButton}
                    </>
            }

            if (this.state.activeMenu === 'details') {
                detailsTabContent =
                    <>
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
                    {backButton}
                    </>
            }

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
                                    active={this.state.activeMenu === 'details'}
                                    onClick={() => this.onMenuClick('details')}
                                >
                                    <Icon name='info'/> {language.buttons.view}
                                </Menu.Item>
                                <Menu.Item
                                    active={this.state.activeMenu === 'price'}
                                    onClick={() => this.onMenuClick('price')}
                                >
                                    <Icon name='chart line'/> {language.buttons.priceHistory}
                                </Menu.Item>
                                <Menu.Item
                                    active={this.state.activeMenu === 'quantity'}
                                    onClick={() => this.onMenuClick('quantity')}
                                >
                                    <Icon name='area chart'/> {language.buttons.quantityHistory}
                                </Menu.Item>
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>
                    {detailsTabContent}
                    </>
            }
        }
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