import React from "react";
import PropTypes from "prop-types";
import ProductForm from "./productForm/productForm";
import {Responsive, Grid, Icon} from "semantic-ui-react";
import {getProducts} from "./actions/fetcingActions";
import PageNotFound from "./pageNotFound";
import {findProduct} from "./actions/productsActions";

/*
    Builds product form view depending on the purpose: create or edit
 */
export default class BuildForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ean: this.props.match.params.id,
            product: {}
        };
    }

    //set initial state from localStorage to ensure proper React lifecycle
    componentDidMount() {
        let products = getProducts();
        if (products) {
            //search for given product details by product ean number
            this.setState({
                product: findProduct(products, this.state.ean)
            })
        }
    }

    render() {
        let component = '';
        let product = this.state.product;
        let {language, purpose} = this.props;
        //actual product form
        let form =
            <Grid.Row centered>
                <Grid.Column width={5}>
                    <ProductForm
                        product={product}
                        editable={true}
                        purpose={purpose}
                        language={language}
                    />
                </Grid.Column>
            </Grid.Row>

        //Should we build new product creation page
        if (purpose === 'create') {
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
                {form}
                </>
        }

        //Should we build existing product edition page
        if (purpose === 'edit') {
            //check if we have product with given ean if no show page not found
            if (product.ean) {
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
                    {form}
                    </>
            } else {
                component =
                    <Grid.Row centered>
                        <PageNotFound
                            language={language}
                        />
                    </Grid.Row>
            }
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
    purpose: PropTypes.string
};