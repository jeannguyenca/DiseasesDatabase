import React, { Component } from "react";
// import AnimatedMap from "./components/SimpleMap";
import ChartContainer from "./components/ChartContainer";
import MapHandle from "./components/MapHandle";
import Weather from "./components/Weather";
import AirQuality from "./components/AirQuality";
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
    return <div className="container-fluid">
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <input ref={this.inputRef} type="text" onChange={this.onChangeText} />
            <button>Submit</button>
          </form>
        </div>
        {/* <AnimatedMap country={this.state.value} /> */}
        {/* Map component */}
        <MapHandle country={this.state.value} />
        {/* Chart component */}
        {this.state.showData ? <ChartContainer show={this.state.showData} country={this.state.value} /> : ""}
        {/* Air Quality */}
        {this.state.showData ? <AirQuality show={this.state.showData} country={this.state.value} /> : ""}
        {/* Weather component */}
        {this.state.showData ? <Weather show={this.state.showData} country={this.state.value} /> : ""}
      </div>;
  }
}

export default Planner;