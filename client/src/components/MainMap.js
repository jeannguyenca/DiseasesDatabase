import React from 'react';
import mapData from '../static/data';

class MainMap extends React.Component {
  state = {
    currentLocation: {
      latitude: this.props.latitude,
      longitude: this.props.longitude
    },
  }

  componentDidMount () {
    this.renderMap()
  }

  componentDidUpdate (prevProps) {
    if (this.props.latitude !== prevProps.latitude || this.props.longitude !== prevProps.longitude) {
      navigator.geolocation.getCurrentPosition(() => {
        this.setState({ currentLocation: { latitude: this.props.latitude, longitude: this.props.longitude }, loading: false }, () => {
          let userLocation = {lat: this.props.latitude, lng: this.props.longitude}
          let map = new window.google.maps.Map(document.getElementById('map'), {
            center: userLocation,
            zoom: 4,
            mapTypeId: 'roadmap',
            disableDefaultUI: true,

            styles: [
              {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
              {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
              },
              {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
              },
              {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
              }
            ]
          });
          const getCircle = (disease) => {
            let lowerCaseDisease = disease.toLowerCase();
            return {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: lowerCaseDisease === "triclosan" ? 'black' : 'red',
              fillOpacity: .6,
              scale: 10,
              strokeColor: 'white',
              strokeWeight: .5
            }
          }
          let myPositionMarker = new window.google.maps.Marker({
            position: userLocation,
          })
  
          myPositionMarker.setMap(map)
  
          mapData.map(location => {
            const { longitude, latitude, disease, country } = location;
            let userLocation = { lat: parseInt(latitude, 10), lng: parseInt(longitude, 10) };
            let marker = new window.google.maps.Marker({
              position: userLocation,
              icon: getCircle(disease),
              map,
              title: `${disease}, ${country}`
            })
          })
        })
      }, () => {
        this.setState({ loading: false })
      })
    }
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAw1zriz4pPpa2YVpyr9tAhomDohpi2FBg&callback=initMap")
    window.initMap = this.initMap;
  }

  initMap = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.setState({ currentLocation: { latitude, longitude }, loading: false }, () => {
        let userLocation = {lat: this.state.currentLocation.latitude, lng: this.state.currentLocation.longitude}
        let map = new window.google.maps.Map(document.getElementById('map'), {
          center: userLocation,
          zoom: 3,
          mapTypeId: 'roadmap',
          disableDefaultUI: true,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]

          });
        const getCircle = () => {
          return {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: 'red',
            fillOpacity: .6,
            scale: 10,
            strokeColor: 'white',
            strokeWeight: .5
          }
        }
        let myPositionMarker = new window.google.maps.Marker({
          position: userLocation,
        })

        myPositionMarker.setMap(map)

        mapData.map(location => {
          const { longitude, latitude, disease, country } = location;
          let userLocation = { lat: parseInt(latitude, 10), lng: parseInt(longitude, 10) };
          let marker = new window.google.maps.Marker({
            position: userLocation,
            icon: getCircle(),
            map,
            title: `${disease}, ${country}`
          })
        })
      })
    }, () => {
      this.setState({ loading: false })
    })
    
  }

  render () {
    return (
      <div id="map"></div>
    );
  }
}

const loadScript = (url) => {
  let index = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index)
}

export default MainMap;
