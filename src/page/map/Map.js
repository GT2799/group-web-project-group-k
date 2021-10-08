import React from "react"
import { Map, GoogleApiWrapper } from "google-maps-react"
import styles from "./Map.module.css"
import { API } from "./API"

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
        return (
            <div className="container">
                <div className={styles.overlay}>
                    <div className={styles.overlayInner}>
                        <h3>hahaha</h3>
                        <button>hahahah</button>
                    </div>
                </div>
                <div id="map">
                    <Map
                        google={this.props.google}
                        zoom={18}
                        onClick={this.onMapClicked}
                        initialCenter={{
                            lat: -33.7736594370602,
                            lng: 151.11362303011666,
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: API,
})(MapCont)
