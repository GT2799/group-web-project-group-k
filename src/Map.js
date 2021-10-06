import React from "react"
import { Map, GoogleApiWrapper } from "google-maps-react"
import styles from "./Map.module.css"
import { API } from "./API"
require("dotenv").config()
class MapCont extends React.Component {
    render() {
        return (
            <div id="map">
                <Map
                    google={this.props.google}
                    zoom={8}
                    initialCenter={{ lat: 47.444, lng: -122.176 }}
                />
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: API,
})(MapCont)
