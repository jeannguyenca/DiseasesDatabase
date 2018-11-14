import React, { Component } from "react";
import axios from "axios";
import MainMap from "./MainMap";

class MapHandle extends Component {
 state = {
  currentLocation: {
   latitude: this.props.latitude,
   longitude: this.props.longitude
  },
  loading: true,
 }

 componentDidMount() {
  if (this.props.show) {
   this.searchPlaces(this.props.country);
   if (!this.pollInterval) {
     this.pollInterval = setInterval(this.searchPlaces(this.props.country), 2000);
   }
  }
 }

 componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.country !== prevProps.country) {
   this.searchPlaces(this.props.country);
  }
 }


 searchPlaces = (place) => {
  axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${place}&inputtype=textquery&fields=geometry&key=AIzaSyAaW6aou2PiPHgD15WYQ32kWShG6V9dOcM`)
   .then(response => {
    // console.log('the response', response)
    this.setState({ currentLocation: { latitude: response.data.candidates[0].geometry.location.lat, longitude: response.data.candidates[0].geometry.location.lng } })
   }).catch(error => {
    console.error('Error message', error)
   });
 }
  
  render(){
   
   return <MainMap latitude={this.state.currentLocation.latitude} longitude={this.state.currentLocation.longitude} />;
  }
}


export default MapHandle;