import React, { Component } from "react";
import weather from "npm-openweathermap";
import LiquidGauge from "./LiquidGauge";
import { Col } from "reactstrap";


class Weather extends Component {
 state = {
  loading: true,
  searchText: '',
  rain: 20,
  humidity: 20,
  temperature: 20,
  wind: 20,
  pressure: 20,
  description: '',
  cityName: ''
 }

 componentDidMount() {
  if (this.props.show) {
   this.getWeather(this.props.country);
   if (!this.pollInterval) {
    this.pollInterval = setInterval(this.getWeather(this.props.country), 2000);
   }
  }
 }

 componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.country !== prevProps.country) {
   this.getWeather(this.props.country);
  }
 }

 getWeather = (searchText) => {
  weather.api_key = '6c0a61ffaadf7eb42bd12639fe51b8c0';
  weather.get_weather_custom('city', searchText, 'weather')
   .then((response) => {
    const { main: { temp, pressure, humidity }, weather, wind } = response;
    const { description } = weather[0];

    this.setState({
     temperature: temp - 273.15,
     pressure,
     humidity,
     wind: wind.speed,
     description
    });

   }, (error) => {
    console.log(error);
   });

 }

 render(){
   return <Col sm="12" md="6" className="weatherContainer">

      <LiquidGauge 
        id={"temperature"} 
        percentage={(this.state.temperature / 40) * 100} 
        value={this.state.temperature} 
        unit={`\u00b0C`} 
        startColor={"#6495ed"}
        endColor={"#dc143c"}/>
      <LiquidGauge 
        id={"humidity"} 
        percentage={this.state.humidity} 
        value={this.state.humidity} 
        unit={"%"} 
        startColor={"#6495ed"}
        endColor={"#dc143c"}/>
      <LiquidGauge 
        id={"wind"} 
        percentage={(this.state.wind / 20) * 100} 
        value={this.state.wind} 
        unit={"m/s"} 
        startColor={"#6495ed"}
        endColor={"#dc143c"}/>
   </Col>
 }
}

export default Weather;
