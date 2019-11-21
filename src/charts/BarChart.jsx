import React from 'react';
import Chart from 'chart.js';

/** Class used to show data using vertical bar chart */
class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    /** Sets up new bar Chart (using chart.js lib) on component mount*/
    componentDidMount() {
        this.myChart = new Chart(this.canvasRef.current, {
            type: 'bar',
            options: {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                min: 0,
                                max: 100
                            }
                        }
                    ]
                }
            },
            data: {
                labels: this.props.data.map(d => d.label),
                datasets: [{
                    label: this.props.title,
                    data: this.props.data.map(d => d.value),
                    backgroundColor: this.props.color
                }]
            }
        });
    }

    /** Refresh data and label on every component update */
    componentDidUpdate() {
        this.myChart.data.labels = this.props.data.map(d => d.label);
        this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
        this.myChart.update();
    }

    render() {
        return (
            <canvas ref={this.canvasRef} />
        );
    }
}

export default BarChart;
