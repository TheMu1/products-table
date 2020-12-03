import React from "react";
import PropTypes from "prop-types";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";


export default class LineChart extends React.Component {
    constructor(props) {
        super(props);
    }

    setHoverData = (e) => {
        this.setState({hoverData: e.target.category})
    };


    render() {
        let {title, valuesName, categories, data, seriesName} = this.props;
        const chartOptions = {
            title: {
                text: title ? title : ''
            },
            yAxis: {
                title: {
                    text: valuesName
                }
            },
            xAxis: {
                categories: categories ? categories : [],
            },
            series: [{
                data: data ? data : [],
                name: seriesName
            }
            ],
            plotOptions: {
                series: {
                    point: {
                        events: {
                            mouseOver: this.setHoverData.bind(this)
                        }
                    }
                }
            }
        };

        return (
            <div>
                <HighchartsReact
                    containerProps={{ style: { width: "100%" } }}
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            </div>
        )
    }
}

LineChart.propTypes = {
    data: PropTypes.array,
    categories: PropTypes.array,
    title: PropTypes.string,
    seriesName: PropTypes.string,
    valuesName: PropTypes.string
};