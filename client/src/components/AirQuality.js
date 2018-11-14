import React from "react";
import axios from "axios";
import AirQualityPieChart from "./SimplePieChart";

// import SimplePieChart from "./SimplePieChart";


class AirQuality extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false
    };
    this.getAirQuality = this.getAirQuality.bind(this);
  }

  componentDidMount() {
    if (this.props.show) {
      this.getAirQuality(this.props.country);
      if (!this.pollInterval) {
        this.pollInterval = setInterval(
          this.getAirQuality(this.props.country),
          2000
        );
      }
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.country !== prevProps.country) {
      this.getAirQuality(this.props.country);
    }
  }

  getAirQuality = country => {
    axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${country}&inputtype=textquery&fields=geometry&key=AIzaSyAaW6aou2PiPHgD15WYQ32kWShG6V9dOcM`
      )
      .then(response => {
        // console.log('the response', response);
        this.setState({
          lat: response.data.candidates[0].geometry.location.lat,
          lon: response.data.candidates[0].geometry.location.lng
        });
        return axios.get(
          `https://api.airvisual.com/v2/nearest_city?lat=${
            this.state.lat
          }&lon=${this.state.lon}&key=eFTPQgYjY7EtnRLik`
        );
      })
      .then(response => {
        // aqius: response.data.current.pollution.aqius;
        this.setState({
          aqius: response.data.data.current.pollution.aqius,
          loaded: true
        });
      })
      .catch(function(error) {
        console.log("Request failed", error);
      });
  };

  render() {

   return <div className="pie" style={{ height: "300px" }}>
       {this.state.loaded 
       && <AirQualityPieChart aqius={this.state.aqius} />
          }
        </div>;
  }
}

export default AirQuality;