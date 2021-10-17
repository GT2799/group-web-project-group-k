import React, { Component, useState } from "react"
import { Map, GoogleApiWrapper, Marker } from "google-maps-react"
import axios from "axios"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import st from "./Map.module.css"
import { API } from "./API"
import Sideinfo from "./Sideinfo"


function MapCont(props) {
    const [result, setResult] = useState()
    const [suburb, setSuburb] = useState()
    const [addrs, setAddrs] = useState([])
    const [apiResponse, setApiResponse] = useState([])

    const baseURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
    const suffixURL = `&result_type=street_address&key=${API}`
    const init = {
        lat: -33.7736594370602,
        lng: 151.11362303011666,
    }

    //Marker location
    const[lat, setLat] = useState()
    const[lng, setLng] = useState()
    var latlng = {
        lat: lat,
        lng: lng,
    }


    const onMapClicked = (mapProps, map, clickEvent) => {
        console.log("lang and lat")
        const latLngArr = getLatLng(clickEvent) // array returned
        const latLngStr = latLngToString(latLngArr) // extract array and turn them into string
        //Marker location
        setLat(latLngArr[0].lat)
        setLng(latLngArr[1].lng)
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
                    setSuburb(suburb)

                    setResult(res.data)
                    let listOfAddr = []
                    res.data.results.forEach((el) => {
                        let temp = []
                        let num = el.address_components[0].long_name
                        let stName = el.address_components[1].short_name
                        temp.push(num)
                        temp.push(stName)
                        listOfAddr.push(temp)
                    })
                    setAddrs(listOfAddr)

                    axios
                        .post("http://localhost:5000/api", {
                            suburb: suburb,
                            addrs: addrs,
                        })
                        .then((res) => {
                            console.log(res.data)
                            setApiResponse(res.data)
                        })
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
    const containerStyle = {
        maxWidth: "1200px",
        height: "600px",
    }
      
    return (
        
        <div className={st.container}>
            <div className={st.side}>
                <p>{JSON.stringify(addrs)}</p>
                <div><Sideinfo api={apiResponse}/></div>
            </div>
            <div className={st.map}>
            <GooglePlacesAutocomplete apiKey = {API} />
                <Map
                    resetBoundsOnResize={true}
                    google={props.google}
                    zoom={13}
                    style={style}
                    containerStyle={containerStyle}
                    onClick={onMapClicked}
                    initialCenter={init}>
                    <Marker position={latlng}/>
                </Map>
            </div>
        </div>
    )
}
export default GoogleApiWrapper({
    apiKey: API,
})(MapCont)
