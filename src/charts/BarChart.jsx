import React from "react";
import Chart from "chart.js";

/** Graphs a chart using vertical bars
 * Available props:
 * - data (Datasets to plot)
 * - chartTitle (Chart title)
 * - title1 (1st dataset title)
 * - title2 (2nd dataset title)
 * - xlabel (X axis label)
 * - ylabel (Y axis label)
 * - textColor (Font color)
 */
class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    Chart.defaults.global.defaultFontColor = this.props.textColor;
    Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif";
  }

  /** Sets up new bar Chart (using chart.js lib) on component mount*/
  componentDidMount() {
    this.myBarChart = new Chart(this.canvasRef.current, {
      type: "bar",
      data: {
        labels: this.props.datasetLabels,
        datasets: [
          {
            label: this.props.title1,
            backgroundColor: "#006064",
            borderColor: "#006064",
            data: this.props.data1
          },
          {
            label: this.props.title2,
            backgroundColor: "#640300",
            borderColor: "#640300",
            data: this.props.data2
          },
          {
            label: this.props.title3,
            backgroundColor: "#00BCD4",
            borderColor: "#00BCD4",
            data: this.props.data3
          },
          {
            label: this.props.title4,
            backgroundColor: "#8F3014",
            borderColor: "#8F3014",
            data: this.props.data4
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
              },
              stacked: true
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: this.props.ylabel
              },
              stacked: true
            }
          ]
        }
      }
    });
  }

  /** Refresh data and label on every component update */
  componentDidUpdate(prevProps) {
    // TODO: https://pl.reactjs.org/docs/react-component.html#componentdidupdate
    this.myBarChart.data.labels = this.props.datasetLabels;
    this.myBarChart.data.datasets[0].data = this.props.data1;
    this.myBarChart.data.datasets[1].data = this.props.data2;
    this.myBarChart.data.datasets[2].data = this.props.data3;
    this.myBarChart.data.datasets[3].data = this.props.data4;
    if (this.props.textColor !== prevProps.textColor) {
      this.myBarChart.options.title.fontColor = this.props.textColor;
    }
    this.myBarChart.update();
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default BarChart;
