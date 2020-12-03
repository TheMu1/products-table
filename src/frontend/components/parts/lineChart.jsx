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
        const chartOptions = {
            title: {
                text: this.props.title ? this.props.title : ''
            },
            yAxis: {
                title: {
                    text: this.props.valuesName
                }
            },
            xAxis: {
                categories: this.props.categories ? this.props.categories : [],
            },
            series: [{
                data: this.props.data ? this.props.data : [],
                name: this.props.seriesName
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