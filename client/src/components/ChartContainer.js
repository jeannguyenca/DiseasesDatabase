import React, { Component } from "react";
import SimpleLineChart from './LineChart';
import DiseaseSuggestions from "./DiseaseSuggestions";
import "whatwg-fetch";
import Buttons from './Buttons';
import { Row, Col } from "reactstrap";

class ChartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption:""
    }

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
          //diseases info
          this.setState({ diseases: res.data[res.data.length-1]});

          //disease values
          let isDefault = true;
          for (let i = 0; i < res.data.length-1; i++) {
            const newState = { ...this.state };
            if (res.data[i].length > 1){
              newState[res.data[i][0].name] = res.data[i].slice(1);
              this.setState(newState);
            }
            
            if (isDefault) {
              this.setState({
                selectedOption: res.data[i][0].name
              });
              isDefault = false;
            }
          }
        }
      });
  };

  render() {
    return <React.Fragment>
        {this.state.selectedOption !== "" && <React.Fragment>
            <Row className="chartContainter">
              <Col xs="12">
                {" "}
                <h2>Did you know?</h2>{" "}
              </Col>
              <Col xs="12" className="chartDisplay">
                <SimpleLineChart data={this.state[this.state.selectedOption]} />
              </Col>
              <Col xs={{ size: 10, offset: 1 }}>
                <form>
                  <h3>Click to see these diseases's trends</h3>
                  <Buttons diseases={this.state.diseases} buttonHandle={this.buttonHandle} selectedOption={this.state.selectedOption} />
                </form>
              </Col>
            </Row>
            <Row>
              <DiseaseSuggestions info={this.state.diseases[this.state.selectedOption]} />
            </Row>
          </React.Fragment>}
      </React.Fragment>;
  }
}

export default ChartContainer;