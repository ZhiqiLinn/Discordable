// import { csrfFetch } from "./csrf";

const ADD_SERVER = "server/ADD_SERVER"
const GET_SERVER = "server/GET_SERVER"
const GET_ALL_SERVERS = "server/GET_ALL_SERVERS"
const EDIT_SERVER = "server/EDIT_SERVER"
const DELETE_SERVER = "server/DELETE_SERVER"


//-------------------------action creator-------------------------
const addServer = (addedServer) => {
    return {
        type: ADD_SERVER,
        addedServer
    }
}


const getServer = (server) => {
    return {
        type: GET_SERVER,
        server
    }
}

const getAllServers = (allServers) => {
    return {
        type: GET_ALL_SERVERS,
        allServers
    }
}

const editServer = (editedServer) => {
    return {
        type: EDIT_SERVER,
        editedServer
    }
}

const deleteServer = (deletedServerId) => {
    return {
        type: DELETE_SERVER,
        deletedServerId
    }
}

//-------------------------THUNK----------------------------------
export const getAllServersThunk = () => async (dispatch) => {
    const response = await fetch(`/api/servers`);
    if (response.ok) {
        const servers = await response.json();
        // console.log("GETALLSERVERSTHUNK",servers)
        dispatch(getAllServers(servers));
    }
}

export const addServerThunk = (server) => async (dispatch) => {
    // const { user_id, name, description, category_id, address, city, state, zip_code, phone, website, price_range, server_hours, latitude, longitude } = server;
    const response = await fetch(`/api/servers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(server),
    });

    if (response.ok) {
        const newServer = await response.json();
        // console.log("ADDSERVERTHUNK",newServer)

        dispatch(addServer(newServer));
        return newServer;
    }
}




export const getServerThunk = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}`);

    if (response.ok) {
        const server = await response.json();
        // console.log("GETSERVERTHUNK",server)

        dispatch(getServer(server));
    }
}


export const editServerThunk = (server) => async (dispatch) => {
    const response = await fetch(`/api/servers/${server.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(server)
    })
    if (response.ok) {
        const newServer = await response.json();
        // console.log("EDITEDSERVERTHUNK",newServer)
        dispatch(editServer(newServer));
        return newServer;
    }
}


export const deleteServerThunk = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteServer(serverId));
    }
}


//-------------------------reducer--------------------------------

const initialState = {};

const serverReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){

        case GET_SERVER:
            newState = { ...state,};
            newState[action.server.id] = action.server;
            return newState;
        case GET_ALL_SERVERS:
            newState = {...state};
            action.allServers.Server.forEach(ser => {
                newState[ser.id] = ser;
            });
            return newState;
        case ADD_SERVER:
            return {
                ...state,
                [action.addedServer.id]: action.addedServer
            };
        case EDIT_SERVER:
            return {
                ...state,
                [action.editedServer.id]: action.editedServer
            };
        case DELETE_SERVER:
            newState = { ...state }
            delete newState[action.deletedServerId];
            return newState;
        default:
            return state;
    }
}

export default serverReducer;