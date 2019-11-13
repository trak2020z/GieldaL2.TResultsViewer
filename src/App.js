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

  /** Render to app window */
  render() {
    if (this.state.data == null)
      return <span> Data not available </span>
    return (
      <div className="App">
        <div className="main chart-wrapper">
          <LineChart
            data={this.state.data.graphs}
            title1="reqTime"
            title2="backendTime"
            xlabel="Data"
            ylabel="Czas trwania"
          />
        </div>
        <h3> raw data: </h3>
        <span> {JSON.stringify(this.state.data)} </span>
      </div>
    );
  }
}

export default App;
