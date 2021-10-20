const initState = {
    apiResponse: []
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
    return state
}

export default rootReducer