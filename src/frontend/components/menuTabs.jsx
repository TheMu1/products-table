import React from "react";
import PropTypes from "prop-types";
import ProductForm from "./productForm/productForm";
import {Grid} from "semantic-ui-react";
import LineChart from "./parts/lineChart";

/*
   Product menu tabs component
   Returns product details menu tab, depending on the props activeTab param
 */
export default class MenuTabs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {activeTab, language, product} = this.props;  //activeTab represents active menu tab
        let detailsTabContent = '';
        //used for history charts x - categories and y - data axes;
        let categories = [], data = [];

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

        //product view details tab
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

        return (
            <>
                {detailsTabContent}
            </>
        )
    }
}

MenuTabs.propTypes = {
    language: PropTypes.object,
    activeTab: PropTypes.string,
    product: PropTypes.object
};