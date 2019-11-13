import React from 'react';
import Chart from 'chart.js';

/** Graphs a chart using connected points  
 * Available props:
 * - data (Datasets to plot)
 * - title1 (1st dataset title)
 * - title2 (2nd dataset title)
 * - xlabel (X axis label)
 * - ylabel (Y axis label)
*/
class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  /** Sets up new line Chart (using chart.js lib) on component mount using set props */
  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'line',
      data: {
        labels: this.props.data.map(d => d.testStartTime),
        datasets: [{
          label: this.props.title1,
          backgroundColor: "#FF3333",
          borderColor: "#FF3333",
          data: this.props.data.map(d => d.reqTime),
          fill: false
        }, {
          label: this.props.title2,
          backgroundColor: "#33FF33",
          borderColor: "#33FF33",
          data: this.props.data.map(d => d.backendTime),
          fill: false
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: 'Placeholder title'
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: this.props.xlabel
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: this.props.ylabel
            }
          }]
        }
      }
    });
  }

  /** Refresh chart properties on every component update */
  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(d => d.testStartTime);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.reqTime);
    this.myChart.data.datasets[1].data = this.props.data.map(d => d.backendTime);
    this.myChart.update();
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default LineChart;
