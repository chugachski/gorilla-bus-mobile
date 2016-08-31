import React, { Component } from 'react';
import {
   MapView,
   StyleSheet,
   View
} from 'react-native';

class Map extends Component {

  constructor(){
    console.log('were here');
    super()
    this.state = {
      mapRegion: {
        latitude: 60.965727,
        longitude: -149.136103,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      },
      annotations: [{
        latitude: 60.965727,
        longitude: -149.136103,
      }],
    }
  };

  handleResponse(data){
    console.log(data)
    const newLoc = [{latitude: data.lat, longitude: data.lng}]
    this.setState({
      annotations: newLoc
    })
  }

  componentDidMount(){
    const derp = this
    const handleResponse = this.handleResponse;
    window.setInterval(function(){
      const fetchSettings = {
        method: 'GET',
        headers: { "Content-Type" : "applications/json" }
      }

      return fetch('http://localhost:3000/shuttles/666', fetchSettings)
        .then((response) => {
        return response.json().then(function(res){
          // handleResponse(res);
          const newLoc = [{latitude: res[0].lat, longitude: res[0].lng}]
          derp.setState({
            annotations: newLoc
          })
        });
      });
    }, 3000)
  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF'}}>
       	<MapView style={} region={this.state.mapRegion} annotations={this.state.annotations} />
      </View>
    );
  }
}
export default Map
