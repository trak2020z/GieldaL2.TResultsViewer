import React from 'react';
import './App.css';
import LineChart from './charts/LineChart';
import DataService from './common/services/DataServices';

/** Main application class */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  /** This is called as soon as component mounts (insterted into DOM) */
  componentDidMount() {
    DataService.getChartData("").then((data) => {
      console.log(data);
      this.setState({ data : data })
    });
  }

  componentDidUpdate() {
    /** Show/hide JSON data on button click */
    document.getElementById("display-button").onclick = function() {
      var x = document.getElementById("raw-data");
      if (x.style.display === "none") {
        x.style.display = "block";
      }
      else {
        x.style.display = "none";
      }
    }
    /** Toggle light/dark mode */
    document.getElementById("checkDark").onclick = function() {
      if (document.getElementById("checkDark").checked === true) {
        // TOGGLE LIGHT MODE
      }
      else {
        // TOGGLE DARK MODE
      }
    }
  }

  /** Render to app window */
  render() {
    if (this.state.data == null)
      return <span> Data not available </span>
    return (
      <div className="App">
        <ul class="sidenav">
          <li>
            <button id="display-button">
              Wyświetl dane z API
            </button>
          </li>
          <li>
            <span id="emoji" role="img" aria-label="moon">
              🌜
            </span>
            <label class="switch">
              <input type="checkbox" id="checkDark"/>
              <span class="slider round"></span>
            </label>
            <span id="emoji" role="img" aria-label="sun">
              🌞
            </span>
          </li>
        </ul>
        <div class="content">
          <div className="main chart-wrapper">
            <LineChart
              data={this.state.data.graphs}
              chartTitle="Czas przetwarzania żądania"
              title1="Całkowity"
              title2="W kontrolerze backendu"
              xlabel="Data"
              ylabel="Czas trwania"
            />
          </div>
          <div id="raw-data">
            <span>
              {JSON.stringify(this.state.data)}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
