import React, { Component } from "react";
import SimpleLineChart from './components/LineChart';
import "whatwg-fetch";
import Buttons from './components/Buttons';

class ChartContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: "",
      default: [
        { year: "2016", cases: 0 },
        { year: "2017", cases: 0 },
        { year: "2018", cases: 0 }
      ]
    };

    this.dataHandle = this.dataHandle.bind(this);
    this.loadDataFromServer = this.loadDataFromServer.bind(this);
    this.buttonHandle = this.buttonHandle.bind(this);
  }

  componentDidMount() {
    if (this.props.show) {
      this.loadDataFromServer();
      if (!this.pollInterval) {
        this.pollInterval = setInterval(this.loadCommentsFromServer, 2000);
      }
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.country !== prevProps.country) {
      this.loadDataFromServer();
    }
  }

  dataHandle() {
    if (this.state.selectedOption !== "") {
      return <React.Fragment>
          <SimpleLineChart data={this.state[this.state.selectedOption]} />
          <form>
            <Buttons diseases={this.state.diseases} buttonHandle={this.buttonHandle} selectedOption={this.state.selectedOption} />
          </form>
        </React.Fragment>;
    } else return <SimpleLineChart data={this.state.default} />;

  }

  buttonHandle(selectedOption) {
    this.setState({ selectedOption:selectedOption });
  }

  loadDataFromServer = () => {
    fetch(`api/databases/${this.props.country}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(data => data.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error });
        else {
          this.setState({diseases: res.data[0]});
          for (let i = 1; i < res.data.length; i++) {
            const newState = { ...this.state };
            let isDefault = true;
            newState[res.data[i][0].name] = res.data[i].slice(1);
            this.setState(newState);

            if (isDefault) {
              if (this.state[res.data[i][0].name].length !== 0) {
                this.setState({
                  selectedOption: res.data[i][0].name
                });
                isDefault = false;
              }
            }
          }
        }
      });
  };

  render() {
    return <div className="chart" style={{ height: "300px" }}>
        {this.dataHandle()}
      </div>;
  }
}

export default ChartContainer;