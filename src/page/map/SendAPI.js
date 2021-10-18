import { API } from "./API"
import React, { Component, useState } from "react"
import axios from "axios"

//Function sends API response to backend and returns the result of the response
//Params: Latitude/Longitude array 
//Return: JSON String
const SendAPI = (latlngarr) => {
    const latLngStr = latLngToString(latlngarr)
    const [addrs, setAddrs] = useState([])
    const [apiResponse, setApiResponse] = useState([])
    const baseURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
    const suffixURL = `&result_type=street_address&key=${API}`
    const finalURL = `${baseURL}${latLngStr}${suffixURL}`
    axios
    .get(finalURL)
    .then((res) => {
        const { plus_code, results, status } = res.data
        if (status == "OK") {
            const suburb = res.data.results[0].address_components[2].long_name
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
    return(
        apiResponse
    )
}

const latLngToString = (arr) => {
    let finalString = ""
    let latStr = arr[0].lat.toString()
    let lngStr = arr[1].lng.toString()
    finalString = `${latStr},${lngStr}`
    console.log(finalString)
    return finalString
}

export default SendAPI