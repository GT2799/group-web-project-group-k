
import React, {Component} from "react"
import { Map, GoogleApiWrapper, Marker } from "google-maps-react"
import "./Map.module.css"
import { API } from "./API"


const coords = { lat: -21.805149, lng: -49.0921657 };
  
class MapCont extends React.Component {
    
    onMapClicked(mapProps, map, clickEvent) {
        console.log("Below is the Lat and Long of the clicked point")
        let pos = []
        const lat = clickEvent.latLng.lat()
        const lng = clickEvent.latLng.lng()
        pos.push({ lat: lat })
        pos.push({ long: lng })
        console.log(pos)
    }
    render() {
      const style = {
        maxWidth: "450px",
        height: "350px",
        overflowX: "hidden",
        overflowY: "hidden"
       };
       const containerStyle = {
        maxWidth: "450px",
        height: "350px"
       };

        return (
          <div>
              <h3> Hello </h3>
                <Map
                    resetBoundsOnResize={true}
                    google={this.props.google}
                    zoom={18}
                    style={style} containerStyle={containerStyle}
                    size = { 500, 500 } // map size in px
                    onClick={this.onMapClicked}
                    initialCenter={{
                        lat: -33.7736594370602,
                        lng: 151.11362303011666,
                    }}
                >
                <Marker position={coords} />
                </Map>
          </div>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: API,
})(MapCont)
