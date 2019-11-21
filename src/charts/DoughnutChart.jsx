import React from 'react';
import Chart from 'chart.js';

// Class used to show data using pie chart with cutout in the center ("doughnut")
class DoughnutChart extends React.Component {
    constructor(props) {
      super(props);
      this.canvasRef = React.createRef();
    }
  
    /** Sets up new bar Chart (using chart.js lib) on component mount*/
    componentDidMount() {
      this.myChart = new Chart(this.canvasRef.current, {
        type: 'doughnut',
        options: {
            maintainAspectRatio: false
        },
        data: {
          labels: this.props.data.map(d => d.label),
          datasets: [{
            data: this.props.data.map(d => d.value),
            backgroundColor: this.props.colors
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
      return <canvas ref={this.canvasRef} />;
    }
  }
  
export default DoughnutChart;
  