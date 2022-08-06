//-------------------------action creator-------------------------


const JOIN_A_SERVER = "server/JOIN_A_SERVER"


const joinAServer = (joinInfo) => {
    return{
        type: JOIN_A_SERVER,
        joinInfo
    }
}


//-------------------------THUNK----------------------------------

// export const getAlljoinedServerThunk = () => async (dispatch) => {
//     const response = await fetch(`/api/join-server`);
//     if (response.ok) {
//         const servers = await response.json();
//         // console.log("GETALLSERVERSTHUNK",servers)
//         dispatch(getAllServers(servers));
//     }
// }
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
const initialState = {joinedServers:{}};

const joinedServerReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        // case GET_ALL_SERVERS:
        //     newState = {...state, allServers:{}};
        //     action.allServers.Server.forEach(ser => {
        //         newState.allServers[ser.id] = ser;
        //     });
        //     return newState;
        case JOIN_A_SERVER:
            newState = {
                ...state, 
                joinedServer:{
                    ...state.joinedServers,
                    [action.joinInfo.id]: action.joinInfo
                }
            }
    
            return newState
        default:
            return state;
    }
}

export default joinedServerReducer;