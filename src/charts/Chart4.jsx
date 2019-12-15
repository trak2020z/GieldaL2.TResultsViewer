import React from "react";
import Chart from "chart.js";
//eslint-disable-next-line
import ChartDataLabels from "chartjs-plugin-datalabels";

/** Graphs a chart using connected points
 * Available props:
 * - chartType ("line", "bar" etc.)
 * - datasetLabels (x axis points)
 * - data1 (y axis values of #1 dataset)
 * - data2 (y axis values of #2 dataset)
 * - data3 (y axis values of #3 dataset)
 * - data4 (y axis values of #4 dataset)
 * - chartTitle (Chart title)
 * - title1 (#1 dataset title)
 * - title2 (#2 dataset title)
 * - title3 (#3 dataset title)
 * - title4 (#4 dataset title)
 * - xlabel (X axis label)
 * - ylabel (Y axis label)
 * - textColor (Font color)
 */
class Chart4 extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    Chart.defaults.global.defaultFontColor = this.props.textColor;
    Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif";
  }

  /** Sets up new line Chart (using chart.js lib) on component mount using set props */
  componentDidMount() {
    this.myLineChart = new Chart(this.canvasRef.current, {
      type: this.props.chartType,
      data: {
        labels: this.props.datasetLabels,
        datasets: [
          {
            label: this.props.title1,
            backgroundColor: "#006064",
            borderColor: "#006064",
            data: this.props.data1,
            fill: false,
            steppedLine: true,
            showLine: false
          },
          {
            label: this.props.title2,
            backgroundColor: "#640300",
            borderColor: "#640300",
            data: this.props.data2,
            fill: false,
            steppedLine: true,
            showLine: false
          },
          {
            label: this.props.title3,
            backgroundColor: "#00BCD4",
            borderColor: "#00BCD4",
            data: this.props.data3,
            fill: false,
            steppedLine: true,
            showLine: false
          },
          {
            label: this.props.title4,
            backgroundColor: "#8F3014",
            borderColor: "#8F3014",
            data: this.props.data4,
            fill: false,
            steppedLine: true,
            showLine: false
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
          mode: "nearest",
          intersect: false
        },
        scales: {
          xAxes: [
            {
              display: true,
              type: "time",
              time: {
                unit: "second",
                displayFormats: {
                  second: "hh:mm:ss"
                }
              },
              distribution: "series",
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
              },
              stepSize: 1
            }
          ]
        },
        plugins: {
          datalabels: {
            anchor: "center",
            font: {
              size: 8,
              weight: "bold"
            },
            backgroundColor: function(context) {
              return context.dataset.backgroundColor;
            },
            borderRadius: 10,
            color: this.props.textColor,
            clamp: "true",
            display: "auto"
          },
          zoom: {
            pan: {
              enabled: true,
              mode: "x"
            },
            zoom: {
              enabled: true,
              mode: "x"
            }
          }
        }
      }
    });
  }

  /** Refresh chart properties on every component update */
  componentDidUpdate(prevProps) {
    // TODO: https://pl.reactjs.org/docs/react-component.html#componentdidupdate
    this.myLineChart.data.labels = this.props.datasetLabels;
    this.myLineChart.data.datasets[0].data = this.props.data1;
    this.myLineChart.data.datasets[1].data = this.props.data2;
    this.myLineChart.data.datasets[2].data = this.props.data3;
    this.myLineChart.data.datasets[3].data = this.props.data4;
    if (this.props.textColor !== prevProps.textColor) {
      this.myLineChart.options.title.fontColor = this.props.textColor;
    }
    this.myLineChart.update();
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default Chart4;
