import Autocomplete from "react-google-autocomplete";
import st from "./Map.module.css"
import { API } from "./API"
import { Opacity } from "material-ui-icons";
import axios from "axios"

import { connect } from 'react-redux'
import { compose } from 'redux'

const Search = (props) =>{

    const SendAPI = (latlngarr, props) => {
        const latLngStr = latLngToString(latlngarr)
        const baseURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
        const suffixURL = `&result_type=street_address&key=${API}`
        const finalURL = `${baseURL}${latLngStr}${suffixURL}`
        axios
        .get(finalURL)
        .then((res) => {
            const { plus_code, results, status } = res.data
            if (status == "OK") {
                const suburb = res.data.results[0].address_components[2].long_name
                console.log(suburb)
                props.setSuburb(suburb) //REDUX SUBURB SET
                let listOfAddr = []
                res.data.results.forEach((el) => {
                    let temp = []
                    let num = el.address_components[0].long_name
                    let stName = el.address_components[1].short_name
                    temp.push(num)
                    temp.push(stName)
                    listOfAddr.push(temp)
                })
                props.setAddress(listOfAddr[0]) //REDUX ADDRESS SET
                axios
                    .post("http://localhost:5000/api", {
                        suburb: suburb,
                        addrs: listOfAddr, //if it breaks I suspect it is this line
                    })
                    .then((res) => {
                        console.log(res.data)
                        props.setApiResponse(res.data) //REDUX API RESPONSE SET
                    })
            } else if (status == "ZERO_RESULTS") {
                alert("No result")
            }
        })
        .catch((e) => {
            throw e
        })
    }

    const searchStyle = {
        width: "40vw",
        height: "5vh",
        position: "absolute",
        top: "-22vh",
        zIndex: 3,
        marginLeft:"30vw",
        marginRight:"30vw",
        fontSize:"2vh",
    }

    return(
        <div>
            <div className={st.searchContainer}>
                <p className={st.searchContainerText}>Search Properties</p>
            </div>
            <div className={st.searchContainerActiveState}>
                <text className={st.activeStateText}>NSW</text>
            </div>
            <Autocomplete
                apiKey={API}
                style={searchStyle}
                placeholder= "Search by Address"
                onPlaceSelected={(place) => {
                        let pos = []
                        var lat = place.geometry.location.lat()
                        var lng = place.geometry.location.lng()
                        pos.push({ lat: lat })
                        pos.push({ lng: lng })
                        console.log("API POST FROM SEARCH", pos)
                        SendAPI(pos)
                }}
                options={{
                    types: ["address"],
                    componentRestrictions: { country: "au" },
                }}
            />
    </div>
    )
}


const latLngToString = (arr) => {
    let finalString = ""
    let latStr = arr[0].lat.toString()
    let lngStr = arr[1].lng.toString()
    finalString = `${latStr},${lngStr}`
    return finalString
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
    connect(mapStateToProps,mapDispatchToProps)
)


export default enhanced(Search);