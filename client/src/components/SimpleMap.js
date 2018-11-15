import React, { Component } from "react"
import {
 ComposableMap,
 ZoomableGroup,
 Geographies,
 Geography,
//  Markers,
//  Marker,
} from "react-simple-maps"
import { Motion, spring } from "react-motion"

let statistic = require("../static/world-110m.json");
let countriesJSON = require("../static/countries.json");


const wrapperStyles = {
 width: "100%",
//  maxWidth: 980,
 margin: "0 auto",
}


class AnimatedMap extends Component {
 constructor(props) {
  super(props)
  this.state = {
   center: [0, 20],
   zoom: 1,
  }
  // this.handleSearch = this.handleSearch.bind(this)
  // this.handleZoomIn = this.handleZoomIn.bind(this)
  // this.handleZoomOut = this.handleZoomOut.bind(this)
  // this.handleCityClick = this.handleCityClick.bind(this)
  // this.handleReset = this.handleReset.bind(this)
  this.handleInputCountry = this.handleInputCountry.bind(this)
 }
//  handleSearch(props){
//   const coordinates = props.coordinates.split(",");
//   console.log(coordinates);
//  }
//  handleZoomIn() {
//   this.setState({
//    zoom: this.state.zoom * 2,
//   })
//  }
//  handleZoomOut() {
//   this.setState({
//    zoom: this.state.zoom / 2,
//   })
//  }
//  handleCityClick(city) {
//   this.setState({
//    zoom: 2,
//    center: city.coordinates,
//   })
//  }
//  handleReset() {
//   this.setState({
//    center: [0, 20],
//    zoom: 1,
//   })
//  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.country !== prevProps.country) {
      this.handleInputCountry(this.props.country);
    }
  }

  handleInputCountry(country){
    for (var i = 0; i < countriesJSON.length; i++) {
      if (country === countriesJSON[i].name) {
        var latlng = countriesJSON[i].latlng;
        this.setState({ zoom: 2, center: latlng.slice().reverse() });
      }
    }
  }

 render() {
  return (
   <div style={wrapperStyles}>
    {/* <button onClick={this.handleZoomIn}>
     {"Zoom in"}
    </button>
    <button onClick={this.handleZoomOut}>
     {"Zoom out"}
    </button>
    <button onClick={this.handleReset}>
     {"Reset"}
    </button> */}
    <Motion
     defaultStyle={{
      zoom: 1,
      x: 0,
      y: 20,
     }}
     style={{
      zoom: spring(this.state.zoom, { stiffness: 210, damping: 20 }),
      x: spring(this.state.center[0], { stiffness: 210, damping: 20 }),
      y: spring(this.state.center[1], { stiffness: 210, damping: 20 }),
     }}
    >
     {({ zoom, x, y }) => (
      <ComposableMap
       projectionConfig={{ scale: 205 }}
       width={980}
       height={300}
       style={{
        width: "100%",
        height: "auto",
       }}
      >
       <ZoomableGroup center={[x, y]} zoom={zoom}>
        {/* <Geographies geography="./static/world-110m.json"> */}
        <Geographies geography={statistic}>

         {(geographies, projection) =>
          geographies.map((geography, i) => geography.id !== "010" && (
           <Geography
            key={i}
            geography={geography}
            projection={projection}
            style={{
             default: {
              fill: "#ECEFF1",
              stroke: "#607D8B",
              strokeWidth: 0.75,
              outline: "none",
             },
             hover: {
              fill: "#CFD8DC",
              stroke: "#607D8B",
              strokeWidth: 0.75,
              outline: "none",
             },
             pressed: {
              fill: "#FF5722",
              stroke: "#607D8B",
              strokeWidth: 0.75,
              outline: "none",
             },
            }}
           />
          ))}
        </Geographies>
        {/* <Markers>
         {cities.map((city, i) => (
          <Marker
           key={i}
           marker={city}
           onClick={this.handleCityClick}
          >
           <circle
            cx={0}
            cy={0}
            r={6}
            fill="#FF5722"
            stroke="#DF3702"
           />
          </Marker>
         ))}
        </Markers> */}
       </ZoomableGroup>
      </ComposableMap>
     )}
    </Motion>
   </div>
  )
 }
}

export default AnimatedMap
