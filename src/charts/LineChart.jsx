import React from 'react';
import Chart from 'chart.js';

// Class used to show data using line connecting data points
class LineChart extends React.Component {
    constructor(props) {
      super(props);
      this.canvasRef = React.createRef();
    }
  
    /** Sets up new bar Chart (using chart.js lib) on component mount*/
    componentDidMount() {
      this.myChart = new Chart(this.canvasRef.current, {
        type: 'line',
        options: {
                maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                type: 'time',
                time: {
                  unit: 'week'
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  min: 0
                }
              }
            ]
          }
        },
        data: {
          labels: this.props.data.map(d => d.time),
          datasets: [{
            label: this.props.title,
            data: this.props.data.map(d => d.value),
            fill: 'none',
            backgroundColor: this.props.color,
            pointRadius: 2,
            borderColor: this.props.color,
            borderWidth: 1,
            lineTension: 0
          }]
        }
      });
    }
  
    /** Refresh data and label on every component update */
    componentDidUpdate() {
      this.myChart.data.labels = this.props.data.map(d => d.time);
      this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
      this.myChart.update();
    }
  
    render() {
      return <canvas ref={this.canvasRef} />;
    }
  }
  
export default LineChart;
