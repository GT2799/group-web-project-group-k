import React, { Component, useState } from "react"
import { Map, GoogleApiWrapper, Marker } from "google-maps-react"
import axios from "axios"
import Autocomplete from "react-google-autocomplete";
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

import st from "./Map.module.css"
import { API } from "./API"
import Sideinfo from "./Sideinfo"

import { compose } from 'redux'
import { connect } from 'react-redux'

//Map function should take in: Props param: Latitude/Longitude <= search function
//Map function should take in: Marker params to display marker
//Map function outputs: Apiresponse -> redux store



function MapCont(props) {
    const [addrs, setAddrs] = useState([])

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
                    props.setSuburb(suburb)
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
                    props.setAddress(listOfAddr[0])
                    axios
                        .post("http://localhost:5000/api", {
                            suburb: suburb,
                            addrs: addrs,
                        })
                        .then((res) => {
                            //console.log(res.data)
                            //setApiResponse(res.data)
                            //mapDispatchToProps(res.data)
                            props.setApiResponse(res.data)
                        })
                } else if (status == "ZERO_RESULTS") {
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

    const[opacityState, setOpacity] = useState("80%")

    const noOpacityonClick = (clickEvent) =>{
        setOpacity("100%")
    }

    const opacityOnScroll = (scrollEvent) => {
        setOpacity("80%")
    }

    const style = {
        maxWidth: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "hidden",
        backgroundColor: "black",
    }

    const containerStyle = {
        position: "relative",
        maxWidth: "100%",
        height: "80vh",
        opacity: opacityState,
    }
    const divcontainer = {
        opacity: opacityState,
    }
    document.addEventListener("scroll", opacityOnScroll)
    return (
        
        <div className={st.container}>
            {/*<div className={st.side}>
                <p>{JSON.stringify(addrs)}</p>
                <div><Sideinfo api={apiResponse}/></div>
            </div> 
    */}
            <div className={st.map} onClick={noOpacityonClick}>
                <div style={divcontainer}>
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
        </div>
    )
}
const mapStateToProps = (state) => {
    return{
        apiResponse: state.apiResponse
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setApiResponse: (apiResponse) => { dispatch({type: 'SET_API_RES', apiResponse: apiResponse})},
        setSuburb: (suburb) => { dispatch({type: 'SET_SUBURB', suburb: suburb})},
        setAddress: (address) => { dispatch({type: 'SET_ADDRESS', address: address})},
        setLatLng: (latlngarr) => { dispatch({type: 'SET_LATLNG', latlngarr: latlngarr})}
    }
}

const enhanced = compose(
    connect(mapStateToProps,mapDispatchToProps),
    GoogleApiWrapper({
        apiKey: API,
    })
)



export default enhanced(MapCont)
