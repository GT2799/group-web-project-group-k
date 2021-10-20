const initState = {
    apiResponse: [], //array of entries in form of apiResponse.data = [[0],[1],[2]...]
    suburb: "No Data", //Current suburb selected
    address:["none", "none"] //address String[] array [HOUSE_NUM, STREET NAME]
}


const rootReducer = (state = initState, action) => {
    console.log("REDUCER CALLED")
    if(action.type === 'SET_API_RES') {
        console.log("REDUX SET_API CALL RECEIVED:", action.apiResponse)
        return{
            ...state,
            apiResponse: action.apiResponse
        }
    }
    if(action.type === 'SET_SUBURB'){
        console.log("REDUX SET_SUBURB CALL RECEIVED:", action.suburb)
        return{
            ...state,
            suburb: action.suburb
        }
    }
    if(action.type === 'SET_ADDRESS'){
        console.log("REDUX SET_ADDRESS CALL RECEIVED:",action.address)
        return{
            ...state,
            address: action.address
        }
    }
    return state
}

export default rootReducer