import React from "react";
import "./App.css";
import DataService from "./common/services/DataServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Chart from "chart.js";
import Chart2 from "./charts/Chart2";
import Chart4 from "./charts/Chart4";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {debounce} from "./common/helpers.js"

/** Main application class */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      graphTextColor: "white",
      isCheckboxChecked: false,
      dateFrom: new Date("2019/11/01"),
      dateTo: new Date()
    };
    this.onCheckboxChanged = this.onCheckboxChanged.bind(this);
    this.onShowDataClicked = this.onShowDataClicked.bind(this);
    this.showDataRef = React.createRef();
    this.getDataFromAPI = debounce(this.getDataFromAPI, 1000);
  }

  /** This is called as soon as component mounts (insterted into DOM) */
  componentDidMount() {
    this.getDataFromAPI();
    Chart.plugins.unregister(ChartDataLabels);
  }

  componentDidUpdate(prevProps, prevState) {
    this.getDataFromAPI();
    console.log(this.state.data);
  }

  /** Loads data from API using DataService */
  getDataFromAPI() {
    DataService.getChartData(this.state.dateFrom, this.state.dateTo).then(data => {
      this.setState({ data: data });
    });
  }

  onFilterDataClicked() {
  }

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
          <li>
            Date From <br/>
            <DatePicker 
              selected={this.state.dateFrom}
              onChange={date => this.setState({ dateFrom: date })}
              selectsStart
              startDate={this.state.dateFrom}
              endDate={this.state.dateTo}
              dateFormat="dd/MM/yyyy"
            />
          </li>
          <li>
            Date To <br/>
            <DatePicker 
              selected={this.state.dateTo}
              onChange={date => this.setState({ dateTo: date })}
              selectsEnd
              startDate={this.state.dateFrom}
              endDate={this.state.dateTo}
              dateFormat="dd/MM/yyyy"
            />
          </li>
          <li>
            <button id="filterDataButton" onClick={this.getDataFromAPI}>
              Filtruj
            </button>
          </li>
        </ul>
        <div className="content">
          <div className="main chart-wrapper">
            <Chart2
              chartType="line"
              datasetLabels={this.state.data.graphs.map(d => d.testStartTime)}
              data1={this.state.data.graphs.map(d => d.reqTime)}
              data2={this.state.data.graphs.map(d => d.backendTime)}
              chartTitle="Czas przetwarzania żądania"
              title1="Całkowity"
              title2="W kontrolerze backendu"
              xlabel="Data"
              ylabel="Czas trwania"
              textColor={graphTextColor}
            />
          </div>
          <div className="main chart-wrapper">
            <Chart4
              chartType="line"
              datasetLabels={this.state.data.graphs.map(d => d.testStartTime)}
              data1={this.state.data.graphs.map(d => d.dbSelectsTime)}
              data2={this.state.data.graphs.map(d => d.dbUpdatesTime)}
              data3={this.state.data.graphs.map(d => d.dbInsertsTime)}
              data4={this.state.data.graphs.map(d => d.dbDeletesTime)}
              chartTitle="Czasy przetwarzania żądania na bazie danych"
              title1="Selects"
              title2="Updates"
              title3="Inserts"
              title4="Deletes"
              xlabel="Data"
              ylabel="Czas trwania"
              textColor={graphTextColor}
            />
          </div>
          <div className="main chart-wrapper">
            <Chart4
              chartType="line"
              datasetLabels={this.state.data.graphs.map(d => d.testStartTime)}
              data1={this.state.data.graphs.map(d => d.dbSelectsQuantity)}
              data2={this.state.data.graphs.map(d => d.dbUpdatesQuantity)}
              data3={this.state.data.graphs.map(d => d.dbInsertsQuantity)}
              data4={this.state.data.graphs.map(d => d.dbDeletesQuantity)}
              chartTitle="Ilość żądań"
              title1="Selects"
              title2="Updates"
              title3="Inserts"
              title4="Deletes"
              xlabel="Data"
              ylabel="Czas trwania"
              textColor={graphTextColor}
            />
          </div>
          <div>
            <center>Ilość wpisów: {this.state.data.graphs.length}</center>
          </div>
          <div id="rawData" ref={this.showDataRef}>
            <code>{JSON.stringify(this.state.data)}</code>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
