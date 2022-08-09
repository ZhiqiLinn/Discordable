//-------------------------action creator-------------------------

const GET_ALL_JOINED_SERVERS = "server/GET_ALL_JOINED_SERVER"
const JOIN_A_SERVER = "server/JOIN_A_SERVER"

const getAUser = (user) => {
    return{
        type: GET_ALL_JOINED_SERVERS,
        user
    }
}

const joinAServer = (joinInfo) => {
    return{
        type: JOIN_A_SERVER,
        joinInfo
    }
}


// -------------------------THUNK----------------------------------

export const GetAllJoinedServerThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/join-server/${userId}`)
    if (response.ok) {
        const newMember = await response.json();
        // console.log("ADDSERVERTHUNK",newServer)

        dispatch(getAUser(newMember))
        console.log("THIS IS NEW MEMBER", newMember)
        return newMember;
    }
}

export const joinAServerThunk = (joinPayload) => async (dispatch) => {
    const response = await fetch(`/api/join-server`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(joinPayload),
    });
    if (response.ok) {
        const newMember = await response.json();
        // console.log("ADDSERVERTHUNK",newServer)

        dispatch(joinAServer(newMember));
        return newMember;
    }
}


//-------------------------reducer--------------------------------
const initialState = {user:{}};

const joinedServerReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case GET_ALL_JOINED_SERVERS:
            newState = {...state, user:{[action.user.id]: action.user}}
            return newState;
        case JOIN_A_SERVER:
            newState = {
                ...state, 
                    [action.joinInfo.id]: action.joinInfo
            }
    
            return newState
        default:
            return state;
    }
}

export default joinedServerReducer;