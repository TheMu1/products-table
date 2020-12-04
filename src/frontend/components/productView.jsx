import React from "react";
import PropTypes from "prop-types";
import {Responsive, Grid, Menu, Icon} from "semantic-ui-react";
import CustomButton from "./parts/customButton";
import {getProducts} from "./actions/fetcingActions";
import PageNotFound from "./pageNotFound";
import MenuTabs from "./menuTabs";
import {findProduct} from "./actions/productsActions";

/*
    Builds product details view
 */
export default class ProductView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ean: this.props.match.params.id, //product id from url params
            activeTab: 'details', //active tab in product details view
            product: {}
        };
    }

    //set initial state from localStorage to ensure proper React lifecycle
    componentDidMount() {
        let products = getProducts();
        if (products) {
            //search in products to find given product details by product ean number
            this.setState({
                product: findProduct(products, this.state.ean)
            })
        }
    }

    //set active tab menu
    onMenuClick(pane) {
        this.setState({activeTab: pane});
    }

    render() {
        let product = this.state.product;
        let component = '';
        let activeTab = this.state.activeTab;
        let language = this.props.language;

        //check if we managed to find given product if no show product not found message
        if (product.ean) {
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
                <MenuTabs
                    language={language}
                    activeTab={this.state.activeTab}
                    product={product}
                />
                <Grid.Row centered>
                    <CustomButton
                        color="blue"
                        icon="arrow left"
                        btnText={language.buttons.back}
                        onClick={() => this.props.history.push('/')}
                    />
                </Grid.Row>
                </>
        } else {
            component =
                <Grid.Row centered>
                    <PageNotFound
                        language={language}
                    />
                </Grid.Row>
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

ProductView.propTypes = {
    language: PropTypes.object,
};