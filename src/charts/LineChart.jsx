import React from "react";
import Chart from "chart.js";
// eslint-disable-next-line
import ChartDataLabels from "chartjs-plugin-datalabels";

/** Graphs a chart using connected points
 * Available props:
 * - data (Datasets to plot)
 * - chartTitle (Chart title)
 * - title1 (1st dataset title)
 * - title2 (2nd dataset title)
 * - xlabel (X axis label)
 * - ylabel (Y axis label)
 * - textColor (Font color)
 */
class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    Chart.defaults.global.defaultFontColor = this.props.textColor;
    Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif";
  }

  /** Sets up new line Chart (using chart.js lib) on component mount using set props */
  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: "line",
      data: {
        labels: this.props.data.map(d => d.testStartTime),
        datasets: [
          {
            label: this.props.title1,
            backgroundColor: "#006064",
            borderColor: "#006064",
            data: this.props.data.map(d => d.reqTime),
            fill: false
          },
          {
            label: this.props.title2,
            backgroundColor: "#00BCD4",
            borderColor: "#00BCD4",
            data: this.props.data.map(d => d.backendTime),
            fill: false
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          fontSize: 20,
          text: this.props.chartTitle,
          fontColor: this.props.textColor
        },
        hover: {
          mode: "nearest",
          intersect: true
        },
        tooltips: {
          mode: "index",
          intersect: false
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: this.props.xlabel
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: this.props.ylabel
              }
            }
          ]
        },
        plugins: {
          datalabels: {
            anchor: "center",
            font: {
              size: 8,
              weight: "bolder"
            },
            backgroundColor: function(context) {
              return context.dataset.backgroundColor;
            },
            borderRadius: 10,
            color: this.props.textColor,
            clamp: "true",
            display: "auto"
          }
        }
      }
    });
  }

  /** Refresh chart properties on every component update */
  componentDidUpdate(prevProps) {
    // TODO: https://pl.reactjs.org/docs/react-component.html#componentdidupdate
    this.myChart.data.labels = this.props.data.map(d => d.testStartTime);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.reqTime);
    this.myChart.data.datasets[1].data = this.props.data.map(
      d => d.backendTime
    );
    if (this.props.textColor !== prevProps.textColor) {
      this.myChart.options.title.fontColor = this.props.textColor;
    }
    this.myChart.update();
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default LineChart;
