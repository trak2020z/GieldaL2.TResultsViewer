import React from 'react';
import './App.css';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import DoughnutChart from './charts/DoughnutChart';
import { getData } from './common/helpers'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: getData()
    };
  }

  componentDidMount() {
    window.setInterval(() => {
      this.setState({
        data: getData()
      })
    }, 5000)
  }

  render() {
    return (
      <div className="App">
        <div className="main chart-wrapper">
          <LineChart
            data={this.state.data[0].data}
            title={this.state.data[0].title}
            color="#3E517A"
          />
        </div>
        <div className="sub chart-wrapper">
          <BarChart
            data={this.state.data[1].data}
            title={this.state.data[1].title}
            color="#70CAD1"
          />
        </div>
        <div className="sub chart-wrapper">
          <BarChart
            data={this.state.data[2].data}
            title={this.state.data[2].title}
            color="#B08EA2"
          />
        </div>
        <div className="sub chart-wrapper">
          <DoughnutChart
            data={this.state.data[3].data}
            title={this.state.data[3].title}
            colors={['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF']}
          />
        </div>
      </div>
    );
  }
}

export default App;
