import React from "react"
import { Map, GoogleApiWrapper } from "google-maps-react"
import styles from "./Map.module.css"
import { API } from "./API"
require("dotenv").config()

class MapCont extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div id="map">
                    <Map
                        google={this.props.google}
                        zoom={8}
                        style={mapStyle}
                        initialCenter={{ lat: 47.444, lng: -122.176 }}
                    />
                </div>
            </div>
        )
    }
}

const mapStyle = {
    width: "100%",
    height: "100%",
    position: "relative",
}
export default GoogleApiWrapper({
    apiKey: API,
})(MapCont)
