import React, { Component } from "react";
import AnimatedMap from "./components/SimpleMap";
import ChartContainer from "./ChartContainer";
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
    return <div className="container">
    <div className="form">
        <form onSubmit={this.handleSubmit}>
          <input ref={this.inputRef} type="text" onChange={this.onChangeText} />
          <button>Submit</button>
        </form>
    </div>
    <div className="map">
        <AnimatedMap country={this.state.value}></AnimatedMap>
    </div>
      {this.state.showData ? <ChartContainer show={this.state.showData} country={this.state.value}></ChartContainer>: ''}
      
      </div>;
  }
}

export default Planner;