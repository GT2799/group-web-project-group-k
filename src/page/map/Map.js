import React, { Component, useState } from "react"
import { Map, GoogleApiWrapper, Marker } from "google-maps-react"
import axios from "axios"

import st from "./Map.module.css"
import { API } from "./API"

const coords = { lat: -21.805149, lng: -49.0921657 }

function MapCont(props) {
    const [result, setResult] = useState()
    const [suburb, setSuburb] = useState()
    const [addrs, setAddrs] = useState([])

    const baseURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
    const suffixURL = `&result_type=street_address&key=${API}`
    const init = {
        lat: -33.7736594370602,
        lng: 151.11362303011666,
    }

    const onMapClicked = (mapProps, map, clickEvent) => {
        console.log("lang and lat")
        const latLngArr = getLatLng(clickEvent) // array returned
        const latLngStr = latLngToString(latLngArr) // extract array and turn them into string
        let suburb = ""
        let addressesFound = []
        // construct URL
        const finalURL = `${baseURL}${latLngStr}${suffixURL}`
        console.log(finalURL)
        axios
            .get(finalURL)
            .then((res) => {
                const { plus_code, results, status } = res.data
                if (status == "OK") {
                    const suburb =
                        res.data.results[0].address_components[2].long_name

                    setResult(res.data)
                    setSuburb(suburb)
                    let listOfAddr = []
                    res.data.results.map((el) => {
                        let temp = []
                        let num = el.address_components[0].long_name
                        let stName = el.address_components[1].long_name
                        temp.push(num)
                        temp.push(stName)
                        listOfAddr.push(temp)
                    })
                    setAddrs(listOfAddr)
                } else if (status == "ZERO_RESULTS") {
                    alert("No result")
                }
            })
            .catch((e) => {
                throw e
            })
    }

    const latLngToString = (arr) => {
        let finalString = ""
        let latStr = arr[0].lat.toString()
        let lngStr = arr[1].lng.toString()
        finalString = `${latStr},${lngStr}`
        console.log(finalString)
        return finalString
    }

    // get latlng from clickEvent
    const getLatLng = (clickEvent) => {
        let pos = []
        const lat = clickEvent.latLng.lat()
        const lng = clickEvent.latLng.lng()
        pos.push({ lat: lat })
        pos.push({ lng: lng })
        return pos
    }

    const style = {
        maxWidth: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "hidden",
    }
    return (
        <div className={st.container}>
            <div className={st.side}>
                <p>{result ? `lol` : "no target selected"}</p>
            </div>
            <div className={st.map}>
                <Map
                    resetBoundsOnResize={true}
                    google={props.google}
                    zoom={18}
                    style={style}
                    onClick={onMapClicked}
                    initialCenter={init}
                >
                    <Marker position={coords} />
                </Map>
            </div>
        </div>
    )
}
export default GoogleApiWrapper({
    apiKey: API,
})(MapCont)
