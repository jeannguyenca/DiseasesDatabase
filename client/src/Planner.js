import React, { Component } from "react";
// import AnimatedMap from "./components/SimpleMap";
import ChartContainer from "./components/ChartContainer";
import MapHandle from "./components/MapHandle";
import Weather from "./components/Weather";
import AirQuality from "./components/AirQuality";
import { Container, Row, Col } from "reactstrap";
// import AutoSuggest from "./components/AutoSuggest";


class Planner extends Component {
  constructor() {
    super();
   this.myRef = React.createRef();
    this.state = {
     value: '',
     showData: false,
    };
    this.inputRef = React.createRef();

    // this.onChangeText = this.onChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

 handleSubmit = (e) => {
  e.preventDefault();
   this.setState({ value: this.inputRef.current.value, showData: true });
 }

  render() {
    return <div className="container-fluid planner">
          <Row className="mapContainer">
            {/* Map component */}
            <MapHandle country={this.state.value} />
                <form onSubmit={this.handleSubmit}>
                  <strong>Enter location name</strong><br/>
                  <input ref={this.inputRef} type="text" onChange={this.onChangeText} />
                  <button >Submit</button>
                </form>
          </Row>
      <Container>
            {/* Chart component */}
            {this.state.showData ? <ChartContainer show={this.state.showData} country={this.state.value} /> : ""}
          <Row className="airContainter">
            {/* Air Quality */}
            {/* {this.state.showData ? <AirQuality show={this.state.showData} country={this.state.value} /> : ""} */}
            {/* Weather component */}
              {/* {this.state.showData ? <Weather show={this.state.showData} country={this.state.value} /> : ""} */}
          </Row>
        </Container>
      </div>;
  }
}

export default Planner;