import React from "react";
import "./App.css";
import LineChart from "./charts/LineChart";
import Chart from "chart.js";
import DataService from "./common/services/DataServices";

/** Main application class */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      graphTextColor: "white",
      isCheckboxChecked: false
    };
    this.onCheckboxChanged = this.onCheckboxChanged.bind(this);
    this.onShowDataClicked = this.onShowDataClicked.bind(this);
    this.showDataRef = React.createRef();
  }

  /** This is called as soon as component mounts (insterted into DOM) */
  componentDidMount() {
    DataService.getChartData("").then(data => {
      this.setState({ data: data });
    });
  }

  componentDidUpdate() {}

  /** Shows/hides JSON data using a button
   * Triggers on display-button click
  */
  onShowDataClicked() {
    const x = this.showDataRef.current;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  /** Toggles between dark/light color themes
   * Triggers on switch button click
   */
  onCheckboxChanged() {
    const newState = { isCheckboxChecked: !this.state.isCheckboxChecked };
    if (newState.isCheckboxChecked === true) {
      document.body.style.backgroundColor = "#ffffff";
      newState.graphTextColor = "black";
      Chart.defaults.global.defaultFontColor = newState.graphTextColor;
    } else {
      document.body.style.backgroundColor = "#282c34";
      newState.graphTextColor = "white";
      Chart.defaults.global.defaultFontColor = newState.graphTextColor;
    }
    this.setState(newState);
  }

  /** Render to app window */
  render() {
    const { graphTextColor } = this.state;
    if (this.state.data == null) return <center> Data not available </center>;
    return (
      <div className="App">
        <ul className="sidenav">
          <li>
            <button id="display-button" onClick={this.onShowDataClicked}>
              Wyświetl dane z API
            </button>
          </li>
          <li className="toggle">
            <span id="emoji" role="img" aria-label="moon">
              🌜
            </span>
            <label className="switch">
              <input
                type="checkbox"
                id="checkLightMode"
                onChange={this.onCheckboxChanged}
                value={this.state.isCheckboxChecked}
              />
              <span className="slider round"></span>
            </label>
            <span id="emoji" role="img" aria-label="sun">
              🌞
            </span>
          </li>
        </ul>
        <div className="content">
          <div className="main chart-wrapper">
            <LineChart
              data={this.state.data.graphs}
              chartTitle="Czas przetwarzania żądania"
              title1="Całkowity"
              title2="W kontrolerze backendu"
              xlabel="Data"
              ylabel="Czas trwania"
              textColor={graphTextColor}
            />
          </div>
          <div id="rawData" ref={this.showDataRef}>
            <span>{JSON.stringify(this.state.data)}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
