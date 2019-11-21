import React from 'react';
import Chart from 'chart.js';
// eslint-disable-next-line
import ChartDataLabels from 'chartjs-plugin-datalabels'

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
    Chart.defaults.global.defaultFontColor = 'white';
    Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif";
  }

  /** Sets up new line Chart (using chart.js lib) on component mount using set props */
  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'line',
      data: {
        labels: this.props.data.map(d => d.testStartTime),
        datasets: [{
          label: this.props.title1,
          backgroundColor: '#006064',
          borderColor: '#006064',
          data: this.props.data.map(d => d.reqTime),
          fill: false
        }, {
          label: this.props.title2,
          backgroundColor: '#00BCD4',
          borderColor: '#00BCD4',
          data: this.props.data.map(d => d.backendTime),
          fill: false
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          fontSize: 20,
          fontColor: 'white',
          text: this.props.chartTitle
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
        },
        plugins:{
          datalabels: {
            anchor: 'center',
            font: {
              size: 10,
              weight: 'bolder'
            },
            backgroundColor: function(context) {
              return context.dataset.backgroundColor
            },
            borderRadius: 10,
            color: 'white',
            clamp: 'true',
            display: 'auto'
          },
          generateLabels: function(myChart) {
            myChart.legend.afterFit = function() {
              this.height = this.height + 50;
            }
          },
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
