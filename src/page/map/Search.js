import Autocomplete from "react-google-autocomplete";
import st from "./Map.module.css"
import { API } from "./API"

const Search = (props) =>{


    const searchStyle = {
        width: "40vw",
        height: "5vh",
        position: "absolute",
        top: "25vh",
        zIndex: "3",
        marginLeft:"30vw",
        marginRight:"30vw",
        fontSize:"2vh",
    }

    return(
        <div>
            <div className={st.searchContainer}>
                <p className={st.searchContainerText}>Search Properties</p>
            <div className={st.searchContainerActiveState}>
                <text className={st.activeStateText}>NSW</text>
            </div>
            </div>
            <Autocomplete
                apiKey={API}
                style={searchStyle}
                placeholder= "Search by Address"
                onPlaceSelected={(place) => {
                    //placeSelected (place)
                }}
                options={{
                    types: ["address"],
                    componentRestrictions: { country: "au" },
                }}
            />;
    </div>
    )
}

export default Search;