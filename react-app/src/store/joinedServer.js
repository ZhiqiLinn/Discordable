//-------------------------action creator-------------------------

const JOIN_A_SERVER = "server/JOIN_A_SERVER"
const QUIT_A_SERVER = "server/QUIT_A_SERVER"

const joinAServer = (joinInfo) => {
    return{
        type: JOIN_A_SERVER,
        joinInfo
    }
}

const quitAServer = (quitInfo) => {
    return{
        type: QUIT_A_SERVER,
        quitInfo
    }
}


// -------------------------THUNK----------------------------------


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

export const quitAServerThunk = (quitPayload) => async (dispatch) => {
    const response = await fetch(`/api/servers/${quitPayload.server_id}/delete`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }});
    if (response.ok) {
        const updateServer = await response.json();
        dispatch(quitAServer(updateServer));
    }
}

//-------------------------reducer--------------------------------
const initialState = {user:{}};

const joinedServerReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case JOIN_A_SERVER:
            newState = {
                ...state, 
                    [action.joinInfo.id]: action.joinInfo
            }
            return newState
        case QUIT_A_SERVER:
            newState = {
                ...state,
                [action.quitInfo.id]: action.quitInfo
            }
        default:
            return state;
    }
}

export default joinedServerReducer;